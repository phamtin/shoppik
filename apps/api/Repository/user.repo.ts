import { TRPCError } from '@trpc/server';

import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from '../Router/routers/user.route';
import { Context } from '../Router/context';

const getMyProfile = async (ctx: Context): Promise<GetMyProfileResponse> => {
	const profile = await ctx.prisma.account.findFirst({
		where: {
			id: ctx.user?.id,
			isDeleted: false,
		},
		include: true,
	});
	if (!profile) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
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
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
	}

	type RequestType = Record<string, string | boolean | Date>;
	Object.keys(request).forEach((key) => {
		if (!(request as RequestType)[key]) {
			delete (request as RequestType)[key];
		}
	});

	const updatedProfile = await accountRepo.update({
		where: { id: ctx.user?.id },
		data: { ...request },
	});

	const res: UpdateUserProfileResponse = updatedProfile;

	return res;
};

const UserRepo = Object.freeze({ updateUserProfile, getMyProfile });

export default UserRepo;
