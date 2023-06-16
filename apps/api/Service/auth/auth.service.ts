// import { TRPCError } from '@trpc/server';
import { PrismaClient, Roles, SigninMethod } from '@prisma/client';

import { SigninRequest, SigninResponse } from '../../Router/routers/auth.route';
import systemLog from '../../Pkgs/systemLog';

export default function makeAuthService() {
	const prisma = new PrismaClient().account;
	const rolePrisma = new PrismaClient().role;

	async function signinGoogle(request: SigninRequest): Promise<SigninResponse> {
		systemLog.info(`Signin Google email ${request.email} - START`);

		let res: SigninResponse = { accountId: '', fullname: '', email: '', role: '', prodiver: SigninMethod.GOOGLE, avatar: '', token: 'abc123' };

		const customerRole = await rolePrisma.findFirst({
			where: {
				name: Roles.CUSTOMER,
			},
		});
		if (!customerRole) {
			await rolePrisma.create({ data: { name: Roles.CUSTOMER, createdAt: new Date() } });
			// throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Can't register new customer" });
		}

		const user = await prisma.findFirst({
			where: {
				email: request.email,
			},
		});
		if (user?.id) {
			res = {
				accountId: user.id,
				fullname: user.fullname,
				email: user.email,
				role: customerRole.name,
				avatar: request.avatar,
				prodiver: SigninMethod.GOOGLE,
				token: 'abc123',
			};
			return res;
		}

		//	Create new User
		const createdUser = await prisma.create({
			data: {
				roleId: [customerRole.id],
				email: request.email,
				fullname: request.fullname,
				phoneNumber: request.phoneNumber ?? '',
				postalCode: '',
				birthday: '',
				avatar: request.avatar,
				signinMethod: SigninMethod.GOOGLE,
				isConfirm: false,
				createdAt: new Date(),
				isDeleted: false,
			},
		});
		res = {
			accountId: createdUser.id,
			fullname: createdUser.fullname,
			email: createdUser.email,
			role: customerRole.name,
			avatar: request.avatar,
			prodiver: SigninMethod.GOOGLE,
			token: 'abc123',
		};

		systemLog.info(`Signin Google email ${request.email} - END`);

		return res;
	}

	return Object.freeze({ signinGoogle });
}
