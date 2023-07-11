import { TRPCError } from '@trpc/server';

import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'Router/routers/user.route';
import { Context } from '../Router/context';

const getMyProfile = async (ctx: Context): Promise<GetMyProfileResponse> => {
	const profile = await ctx.prisma.account.findFirst({
		where: {
			id: ctx.user?.id,
			isDeleted: false,
		},
	});
	if (!profile) {
		throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
	}

	return profile;
};

const updateUserProfile = async (ctx: Context, request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
	const accountRepo = ctx.prisma.account;

	const activeUser = await accountRepo.findFirst({
		where: {
			id: ctx.user?.id,
			isDeleted: false,
		},
	});
	if (!activeUser) {
		throw new TRPCError({ code: 'FORBIDDEN', message: 'User not found' });
	}

	Object.keys(request).forEach((key) => {
		if ((request as Record<string, string | boolean>)[key] == null) {
			delete (request as Record<string, string | boolean>)[key];
		}
	});

	const updatedProfile = await accountRepo.update({
		where: {
			id: ctx.user?.id,
		},
		data: {
			...request,
		},
	});

	const res: UpdateUserProfileResponse = updatedProfile;

	return res;
};

const UserRepo = Object.freeze({ updateUserProfile, getMyProfile });

export default UserRepo;
