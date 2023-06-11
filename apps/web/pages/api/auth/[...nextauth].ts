import NextAuth, { AuthOptions } from 'next-auth';
import type { Adapter, AdapterUser } from 'next-auth/adapters';

import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			const res = await fetch('http://localhost:9000/trpc/auth/signin', {
				method: 'POST',
				body: JSON.stringify(account),
			});

			// Persist the OAuth access_token to the token right after signin
			return {
				...token,
				id_token: account?.id_token,
			};
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			return { ...session, id_token: token.id_token };
		},
	},
};

export default NextAuth(authOptions);
