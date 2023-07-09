'server-only';

import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import { getCookie, setCookie } from 'cookies-next';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';

import { SigninMethodSchema } from '@shoppik/schema';
import { getBaseUrl } from '@/lib/trpc/trpc';

export const authOptions = (req?: NextApiRequest, res?: NextApiResponse): AuthOptions => {
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
					credentials: 'include',
					body: JSON.stringify({
						email: user.email,
						avatar: user.image,
						fullname: user.name,
						scope: account.scope,
						expiresAt: account.expires_at,
						accessToken: account.id_token,
						provider: SigninMethodSchema.Enum.GOOGLE,
					}),
				});
				console.log(response.headers);
				const accessToken = (await response.json()).result?.data?.encryptedJwt;
				console.log('accessToken === ', accessToken);

				// Setting http-only cookie
				setCookie('accessToken', accessToken, {
					req,
					res,
					maxAge: 60,
					httpOnly: false,
					path: '/',
					sameSite: 'lax',
					expires: dayjs().add(60, 'second').toDate(),
					secure: false,
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
