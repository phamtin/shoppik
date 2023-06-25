'server-only';

import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';

import { SigninMethodType } from '@shoppik/prisma/generated';
import dayjs from 'dayjs';
import { getBaseUrl } from '@/lib/trpc/trpc';

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

export const authOptions = (req: NextApiRequest, res: NextApiResponse): AuthOptions => {
	return {
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
		session: { strategy: 'jwt' as SessionStrategy, maxAge: 60 },
		secret: process.env.NEXTAUTH_SECRET,
		callbacks: {
			async signIn({ account, user }: any) {
				if (!account) return false;
				const response = await fetch(`${getBaseUrl()}/trpc/auth.signin`, {
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
				const accessToken = (await response.json()).result?.data?.encryptedJwt;

				// Setting http-only cookie
				setCookie('accessToken', accessToken, {
					req,
					res,
					path: '/',
					maxAge: 60,
					httpOnly: true,
					sameSite: 'strict',
					expires: dayjs().add(60, 'second').toDate(),
					secure: process.env.NODE_ENV !== 'development',
				});
				return true;
			},

			async session({ session, token }: any) {
				return { ...session, ...token };
			},
		},
	};
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, authOptions(req, res));
};

export default handler;
