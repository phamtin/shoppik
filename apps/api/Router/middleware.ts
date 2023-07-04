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
		let encryptedJwt;
		if (req.headers?.authorization?.startsWith('API')) {
			encryptedJwt = req.headers.authorization.split(' ')[1];
		}
		console.log('req.headers.authorization: ', req.headers.authorization);

		const notAuthenticated = null;

		if (!encryptedJwt) {
			return notAuthenticated;
		}
		const decoded: any = verifyJwt(encryptedJwt, 'accessTokenPublicKey');
		console.log('decoded Jwt in header: ', decoded);

		if (!decoded || !decoded.id || !decoded.email || !decoded.lastname || !decoded.firstname || decoded.role.length === 0) {
			return notAuthenticated;
		}

		return {
			id: decoded.id,
			email: decoded.email,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			role: decoded.role,
		};
	} catch (e) {
		return null;
	}
};

export const generateEncryptedJwt = (payload: EncryptedJwtPayload, key: 'accessTokenPrivateKey', options: SignOptions = {}) => {
	const privateKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
	return jwt.sign(payload, privateKey, {
		...(options && options),
	});
};

const verifyJwt = <T>(token: string, key: 'accessTokenPublicKey'): T | null => {
	try {
		const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY as string, 'base64').toString('ascii');

		return jwt.verify(token, publicKey) as T;
	} catch (error) {
		return null;
	}
};
