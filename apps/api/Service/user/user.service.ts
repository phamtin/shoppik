import UserRepo from 'Repository/account/user.repo';
import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'Router/user.route';
import { Context } from 'Router/routers/context';

const updateUserProfile = async (ctx: Context, request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
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

const isOwner = async (ctx: Context): Promise<boolean> => {
	ctx.systemLog.info('Check user is owner or not - START');

	const profile = await UserRepo.getMyProfile(ctx);

	const isHasStore = profile.roleOwner?.storeId;

	ctx.systemLog.info('Check user is owner or not - END');

	return !!isHasStore;
};

const UserService = {
	updateUserProfile,
	getMyProfile,
	isOwner,
};

export default UserService;
