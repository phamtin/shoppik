import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { Roles, SigninMethod } from '@prisma/client';

import { SigninRequest, SigninResponse } from '../../Router/routers/auth.route';
import { generateEncryptedJwt } from '../../Router/middleware';
import { Context } from '../../Router/context';

type AppJwtPayload = {
	name: string;
	given_name: string;
	family_name: string;
	locale: string;
};

const signinGoogle = async (ctx: Context, request: SigninRequest): Promise<SigninResponse> => {
	ctx.systemLog.info(`Signin Google email ${request.email} - START`);

	const authRepo = ctx.prisma.account;
	const roleRepo = ctx.prisma.role;

	let res: SigninResponse = {
		accountId: '',
		fullname: '',
		firstname: '',
		lastname: '',
		email: '',
		role: '',
		prodiver: SigninMethod.GOOGLE,
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
	ctx.systemLog.info('------- BEfore -------');
	const encryptedJwt = generateEncryptedJwt(
		ctx,
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

	ctx.systemLog.info(res);
	ctx.systemLog.info(`Signin Google email ${request.email} - END`);

	return res;
};

const AuthService = {
	signinGoogle,
};

export default AuthService;
