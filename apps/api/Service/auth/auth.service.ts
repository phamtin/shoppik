import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import jwt, { SignOptions } from 'jsonwebtoken';
import { SigninMethod } from '@prisma/client';

import { SigninRequest, SigninResponse } from '../../Router/routers/auth.route';
import { Context } from '../../Router/context';

type AppJwtPayload = {
	name: string;
	given_name: string;
	family_name: string;
	locale: string;
};

type EncryptedJwtPayload = {
	id: string;
	email: string;
	fullname: string;
	role: string;
};

const signinGoogle = async (ctx: Context, request: SigninRequest): Promise<SigninResponse> => {
	ctx.systemLog.info(`Signin Google email ${request.email} - START`);

	const authRepo = ctx.prisma.account;

	let res: SigninResponse = {
		id: '',
		fullname: '',
		firstname: '',
		lastname: '',
		email: '',
		isOwner: false,
		encryptedJwt: '',
	};

	//	Jwt payload returned from OAuth Provider
	const jwtPayload = jwt.decode(request.accessToken, {
		complete: true,
	});
	if (!jwtPayload || !jwtPayload.payload) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentails' });
	}

	let authenticatedUser = await authRepo.findFirst({ where: { email: request.email } });

	if (authenticatedUser?.id) {
		res = {
			id: authenticatedUser.id,
			fullname: authenticatedUser.fullname,
			firstname: authenticatedUser.firstname,
			lastname: authenticatedUser.lastname,
			email: authenticatedUser.email,
			isOwner: !!authenticatedUser.roleOwner?.storeId,
			encryptedJwt: '',
		};
	} else {
		const jwt = jwtPayload.payload as AppJwtPayload;
		authenticatedUser = await authRepo.create({
			data: {
				roleCustomer: {
					trustscore: 0,
					updatedAt: null,
				},
				email: request.email,
				fullname: jwt.name,
				firstname: jwt.given_name,
				lastname: jwt.family_name,
				locale: jwt.locale,
				phoneNumber: '',
				postalCode: '',
				birthday: '',
				avatar: request.avatar,
				signinMethod: SigninMethod.GOOGLE,
				isConfirm: false,
				createdAt: new Date(),
				isDeleted: false,
			},
		});
	}

	const encryptedJwt = generateEncryptedJwt(
		{
			id: authenticatedUser.id,
			email: authenticatedUser.email,
			fullname: authenticatedUser.fullname,
			role: JSON.stringify([authenticatedUser.roleCustomer, authenticatedUser.roleOwner]),
		},
		'accessTokenPrivateKey',
		{ expiresIn: 600 },
	);

	res = {
		encryptedJwt,
		id: authenticatedUser.id,
		email: authenticatedUser.email,
		fullname: authenticatedUser.fullname,
		firstname: authenticatedUser.firstname,
		lastname: authenticatedUser.lastname,
		isOwner: !!authenticatedUser.roleOwner?.storeId,
	};

	ctx.systemLog.info(`Signin Google email ${request.email} - END`);

	return res;
};

export const generateEncryptedJwt = (payload: EncryptedJwtPayload, key: 'accessTokenPrivateKey', options: SignOptions = {}) => {
	const privateKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
	const jwtStr = jwt.sign(payload, privateKey, {
		...(options && options),
	});
	const encryptedJwt = encrypt(jwtStr, process.env.ACCESS_TOKEN_PRIVATE_KEY as string);
	return encryptedJwt;
};

export const verifyJwt = <T>(token: string): T | null => {
	try {
		const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
		return jwt.verify(token, publicKey) as T;
	} catch (error) {
		return null;
	}
};

export const encrypt = (plainText: string, eKey: string): string => {
	let m = crypto.createHash('md5');
	m.update(eKey);
	const key = m.digest('hex');
	m = crypto.createHash('md5');
	m.update(eKey + key);
	const iv = m.digest('hex');

	const data = Buffer.from(plainText, 'utf-8').toString('binary');
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0, 16));
	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');

	return Buffer.from(encrypted, 'binary').toString('base64');
};

export const decrypt = (text: string): string => {
	let m = crypto.createHash('md5');
	m.update(process.env.ACCESS_TOKEN_PRIVATE_KEY!);
	const key = m.digest('hex');

	m = crypto.createHash('md5');
	m.update(process.env.ACCESS_TOKEN_PRIVATE_KEY! + key);
	const iv = m.digest('hex');
	const input = text.replace(/-/g, '+').replace(/_/g, '/');
	const edata = Buffer.from(input, 'base64').toString('binary');

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0, 16));
	let decrypted = decipher.update(edata, 'hex', 'utf8');
	decrypted += decipher.final('utf8');

	return Buffer.from(decrypted, 'binary').toString('utf8');
};

const AuthService = {
	signinGoogle,
};

export default AuthService;
