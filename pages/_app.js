import '../styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

export default function App({Component, pageProps: {session, ...pageProps}}) {
	return (
		<>
			<Head>
				<title>Ecommerce</title>
				<meta
					name='description'
					content='Electronics products at the best price. Ecommerce'
				/>
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
