import jwt, { SignOptions } from 'jsonwebtoken';

import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { UserRequest } from './context';

type EncryptedJwtPayload = {
	accountId: string;
	email: string;
	fullname: string;
	role: string;
};

export const deserializeUser = ({ req }: CreateFastifyContextOptions): UserRequest | null => {
	try {
		const cookieArray = req.headers.cookie?.split(';');
		const accessTokenKeyValue = cookieArray?.find((el) => el.includes('accessToken'));
		const encryptedJwt = accessTokenKeyValue?.split('=')[1];
		console.log('accessTokenKeyValue', req.headers);

		const notAuthenticated = null;

		if (!encryptedJwt) {
			return notAuthenticated;
		}
		const decoded: any = verifyJwt(encryptedJwt, 'accessTokenPublicKey');
		const parsedRoles = JSON.parse((decoded?.role as string) ?? '');

		if (!decoded || !decoded.accountId || !decoded.email || !decoded.role || parsedRoles.length === 0) {
			return notAuthenticated;
		}

		return {
			accountId: decoded.accountId,
			email: decoded.email,
			fullname: decoded.fullname,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			role: parsedRoles,
		};
	} catch (e) {
		return null;
	}
};

export const generateEncryptedJwt = (ctx: any, payload: EncryptedJwtPayload, key: 'accessTokenPrivateKey', options: SignOptions = {}) => {
	ctx.systemLog.info(process.env.ACCESS_TOKEN_PRIVATE_KEY);
	const privateKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
	ctx.systemLog.info('privateKey');
	ctx.systemLog.info(privateKey);
	return jwt.sign(payload, privateKey, {
		...(options && options),
	});
};

const verifyJwt = <T>(token: string, key: 'accessTokenPublicKey'): T | null => {
	try {
		const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');

		return jwt.verify(token, publicKey) as T;
	} catch (error) {
		return null;
	}
};
