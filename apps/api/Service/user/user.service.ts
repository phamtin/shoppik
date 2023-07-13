import UserRepo from '../../Repository/user.repo';
import { Context } from '../../Router/context';
import { GetMyProfileResponse, UpdateUserProfileRequest } from '../../Router/routers/user.route';

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

const UserService = {
	updateUserProfile,
	getMyProfile,
};

export default UserService;
