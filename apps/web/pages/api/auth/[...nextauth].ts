'server-only';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, {
	Account,
	AuthOptions,
	Session,
	SessionStrategy,
	User,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { setCookie } from 'cookies-next';
import GoogleProvider from 'next-auth/providers/google';

import { SigninMethodSchema } from '@shoppik/schema';
import { AdapterUser } from 'next-auth/adapters';
import { getBaseUrl } from '@/lib/trpc/trpc';
import dayjs from 'dayjs';

interface SignInPayload {
	user: User | AdapterUser;
	account: Account | null;
}

interface SessionPayload {
	session: Session;
	token: JWT;
	user: AdapterUser;
}

export const authOptions = (req?: NextApiRequest, res?: NextApiResponse): AuthOptions => {
	const tokenLifeTimeEnv = +(process.env.ACCESS_TOKEN_LIVE_TIME ?? 60 * 60); // 1h

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
		session: {
			strategy: 'jwt' as SessionStrategy,
			maxAge: tokenLifeTimeEnv,
		},
		secret: process.env.NEXTAUTH_SECRET,
		callbacks: {
			async signIn({ account, user }: SignInPayload) {
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
				const accessToken = (await response.json()).result?.data.encryptedJwt;

				// Setting http-only cookie
				setCookie('accessToken', accessToken, {
					req,
					res,
					maxAge: tokenLifeTimeEnv,
					httpOnly: false,
					path: '/',
					sameSite: 'lax',
					expires: dayjs().add(tokenLifeTimeEnv, 'second').toDate(),
					secure: false,
				});
				return true;
			},

			session({ session, token }: SessionPayload) {
				return { ...session, ...token };
			},
		},
	};
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, authOptions(req, res));
};

export default handler;
