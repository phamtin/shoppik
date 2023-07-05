import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Roles, SigninMethod } from '@prisma/client';

import { SigninRequest, SigninResponse } from '../../Router/routers/auth.route';
import { Context } from '../../Router/context';

type AppJwtPayload = {
	name: string;
	given_name: string;
	family_name: string;
	locale: string;
};

type EncryptedJwtPayload = {
	accountId: string;
	email: string;
	fullname: string;
	role: string;
};

const signinGoogle = async (ctx: Context, request: SigninRequest): Promise<SigninResponse> => {
	ctx.systemLog.info(`Signin Google email ${request.email} - START`);

	const authRepo = ctx.prisma.account;
	const roleRepo = ctx.prisma.role;

	let res: SigninResponse = {
		prodiver: SigninMethod.GOOGLE,
		accountId: '',
		fullname: '',
		firstname: '',
		lastname: '',
		email: '',
		role: '',
		avatar: '',
		encryptedJwt: '',
	};

	//	Jwt payload returned from OAuth Provider
	const jwtPayload = jwt.decode(request.accessToken, {
		complete: true,
	});
	if (!jwtPayload || !jwtPayload.payload) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentails' });
	}

	let customerRole = await roleRepo.findFirst({
		where: {
			name: Roles.CUSTOMER,
		},
	});

	if (!customerRole) {
		customerRole = await roleRepo.create({
			data: {
				name: Roles.CUSTOMER, //	Should have the Db Seed here
				createdAt: new Date(),
			},
		});
	}

	let authenticatedUser = await authRepo.findFirst({ where: { email: request.email } });

	if (authenticatedUser?.id) {
		res = {
			accountId: authenticatedUser.id,
			fullname: authenticatedUser.fullname,
			firstname: authenticatedUser.firstname,
			lastname: authenticatedUser.lastname,
			email: authenticatedUser.email,
			role: customerRole.name,
			avatar: request.avatar,
			prodiver: SigninMethod.GOOGLE,
			encryptedJwt: '',
		};
	} else {
		const jwt = jwtPayload.payload as AppJwtPayload;
		authenticatedUser = await authRepo.create({
			data: {
				roleId: [customerRole.id],
				email: request.email,
				fullname: jwt.given_name,
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
			accountId: authenticatedUser.id,
			email: authenticatedUser.email,
			fullname: authenticatedUser.fullname,
			role: JSON.stringify(authenticatedUser.roleId),
		},
		'accessTokenPrivateKey',
		{ expiresIn: 60 },
	);

	res = {
		accountId: authenticatedUser.id,
		fullname: authenticatedUser.fullname,
		firstname: authenticatedUser.firstname,
		lastname: authenticatedUser.lastname,
		email: authenticatedUser.email,
		role: customerRole.name,
		avatar: request.avatar,
		prodiver: SigninMethod.GOOGLE,
		encryptedJwt: encryptedJwt,
	};

	console.log('encryptedJwt = ', res.encryptedJwt);
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

export const verifyJwt = <T>(token: string, key: 'accessTokenPublicKey'): T | null => {
	try {
		const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');

		return jwt.verify(token, publicKey) as T;
	} catch (error) {
		return null;
	}
};

export const encrypt = (plainText: string, eKey: string): string => {
	try {
		const iv = crypto.randomBytes(16);
		const key = crypto.createHash('sha256').update(eKey).digest('base64').slice(0, 32);
		const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

		let encrypted = cipher.update(plainText);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return iv.toString('hex') + ':' + encrypted.toString('hex');
	} catch (error) {
		console.log(error);
		return '';
	}
};

export const decrypt = (text: string): string => {
	const textParts = text.split(':');

	const iv = Buffer.from(textParts.shift()!, 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY!), iv);
	let decrypted = decipher.update(encryptedText);

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
};

const AuthService = {
	signinGoogle,
};

export default AuthService;
