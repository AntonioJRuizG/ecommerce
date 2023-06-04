/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import NextAuth, {getServerSession} from 'next-auth';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';

const adminEmails = [process.env.ADMIN_EMAIL_01, process.env.ADMIN_EMAIL_02];

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	authorization: {
		params: {
			prompt: 'consent',
			access_type: 'offline',
			response_type: 'code',
		},
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],

	callbacks: {
		session({session, token, user}) {
			if (adminEmails.includes(session?.user?.email)) {
				return session;
			}

			return false;
		},
		async redirect({url, baseUrl}) {
			return baseUrl;
		},
	},
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!adminEmails.includes(session?.user?.email)) {
		res.status(401).end();
	}
}
