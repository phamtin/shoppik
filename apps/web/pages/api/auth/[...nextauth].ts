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
			let cc;
			if (account) {
				const res = await fetch('http://localhost:9000/trpc/auth.signin', {
					method: 'POST',
					body: JSON.stringify({
						email: token.email,
						googleToken: account.access_token,
						provider: 'GOOGLE',
						fullname: token.name,
						avatar: token.picture,
					}),
				});
				cc = await res.json();
				console.log(cc);
			}

			// Persist the OAuth access_token to the token right after signin
			return { ...token, ...cc };
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			return { ...session, ...token };
		},
	},
};

export default NextAuth(authOptions);
