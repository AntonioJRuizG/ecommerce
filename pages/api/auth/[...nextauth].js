/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// ...add more providers here
	],
};

export default NextAuth(authOptions);
