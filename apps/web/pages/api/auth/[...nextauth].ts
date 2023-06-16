'server-only';

import { getBaseUrl } from '@/lib/trpc/trpc';
import NextAuth, { AuthOptions } from 'next-auth';

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
	session: { strategy: 'jwt', maxAge: 60 },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			let user;
			if (account) {
				console.log(account);

				const res = await fetch(`${getBaseUrl()}/trpc/auth.signin`, {
					method: 'POST',
					body: JSON.stringify({
						email: token.email,
						avatar: token.picture,
						fullname: token.name,
						scope: account.scope,
						expiresAt: account.expires_at,
						accessToken: account.id_token,
						provider: 'GOOGLE',
					}),
				});
				user = await res.json();
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			return { ...session, ...token };
		},
	},
};

export default NextAuth(authOptions);
