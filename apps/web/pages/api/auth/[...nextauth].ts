'server-only';

import { SigninMethodType } from '@shoppik/prisma/generated';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getBaseUrl, setHeaderToken } from '@/lib/trpc/trpc';

// const verifyJwt = <T>(encryptedJwt: string): T | null => {
// 	console.log('token', encryptedJwt);

// 	try {
// 		const publicKey = Buffer.from(
// 			process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
// 			'base64',
// 		).toString('ascii');
// 		return jwt.verify(encryptedJwt, publicKey) as T;
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// };

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
		async signIn({ account, user }) {
			if (!account) return false;

			const res = await fetch(`${getBaseUrl()}/trpc/auth.signin`, {
				method: 'POST',
				body: JSON.stringify({
					email: user.email,
					avatar: user.image,
					fullname: user.name,
					scope: account.scope,
					expiresAt: account.expires_at,
					accessToken: account.id_token,
					provider: 'GOOGLE' as SigninMethodType,
				}),
			});

			const jsonRes = await res.json();

			setHeaderToken(jsonRes.result?.data?.encryptedJwt);

			return true;
		},
		async session({ session, token }) {
			return { ...session, ...token };
		},
	},
};

export default NextAuth(authOptions);
