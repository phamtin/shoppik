import UserRepo from '../../Repository/user.repo';
import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from '../../Router/routers/user.route';
import { Context } from '../../Router/context';
import { TRPCError } from '@trpc/server';

const updateUserProfile = async (ctx: Context, request: UpdateUserProfileRequest) => {
	ctx.systemLog.info('update User Profile - START');

	const updatedProfile = await UserRepo.updateUserProfile(ctx, request);

	ctx.systemLog.info('update User Profile - END');

	return updatedProfile;
};

const getMyProfile = async (ctx: Context): Promise<GetMyProfileResponse> => {
	ctx.systemLog.info('get My Profile - START');

	const profile = UserRepo.getMyProfile(ctx);

	ctx.systemLog.info('get My Profile - END');

	return profile;
};

const removeStoreId = async (ctx: Context, storeId: string): Promise<UpdateUserProfileResponse> => {
	const account = await ctx.prisma.account.findFirst({
		where: {
			id: ctx.user?.id,
			isDeleted: false,
		},
	});
	if (!account) throw new TRPCError({ code: 'BAD_REQUEST' });

	if (!account.roleOwner || account.roleOwner?.storeId.length === 0) {
		return account;
	}

	return await ctx.prisma.account.update({
		where: {
			id: account.id,
		},
		data: {
			roleOwner: {
				storeId: account.roleOwner.storeId.filter((ids) => ids !== storeId),
				updatedAt: new Date(),
			},
		},
	});
};

const addStoreId = async (ctx: Context, storeId: string): Promise<UpdateUserProfileResponse> => {
	let updatedAccount: UpdateUserProfileResponse;
	const account = await ctx.prisma.account.findFirst({
		where: {
			id: ctx.user?.id,
			isDeleted: false,
		},
	});
	if (!account) throw new TRPCError({ code: 'BAD_REQUEST' });

	//	User don't have any store yet
	if (!account.roleOwner) {
		updatedAccount = await ctx.prisma.account.update({
			where: {
				id: account.id,
			},
			data: {
				roleOwner: { storeId: [storeId], updatedAt: new Date() },
			},
			include: true,
		});
		return updatedAccount;
	}

	updatedAccount = await ctx.prisma.account.update({
		where: {
			id: account.id,
		},
		data: {
			roleOwner: {
				storeId: account.roleOwner.storeId.concat(storeId),
				updatedAt: new Date(),
			},
		},
	});

	return updatedAccount;
};

const UserService = {
	updateUserProfile,
	getMyProfile,
	addStoreId,
	removeStoreId,
};

export default UserService;
