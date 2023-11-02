import { TRPCError } from '@trpc/server';
import { Context } from 'Router/routers/context';
import { sanitize } from 'Pkgs/utils/transfrom';
import { GetMyProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'Router/user.route';
import { AccountCollection } from 'Loaders/database/mongoDB';
import { ObjectId } from 'mongodb';

const getMyProfile = async (ctx: Context): Promise<GetMyProfileResponse> => {
	const profile = await AccountCollection.findOne({
		_id: ctx.user._id,
		isDeleted: false,
	});

	if (!profile) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
	}

	delete profile.deletedAt;
	delete profile.isDeleted;

	const res: GetMyProfileResponse = {
		...profile,
		_id: profile._id.toHexString(),
		roleOwner: {
			...profile.roleOwner,
			storeId: profile.roleOwner?.storeId.toHexString() || '',
		},
	};
	return res;
};

const updateUserProfile = async (ctx: Context, request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
	const toUpdate = sanitize(request);

	const toUpdateRoleOwner = toUpdate.roleOwner && { ...toUpdate.roleOwner, storeId: new ObjectId(toUpdate.roleOwner.storeId) };

	const updated = await AccountCollection.findOneAndUpdate(
		{
			_id: ctx.user._id,
			isDeleted: false,
		},
		{
			$set: { ...toUpdate, roleOwner: toUpdateRoleOwner },
		},
		{ ignoreUndefined: true },
	);

	if (!updated) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	delete updated.deletedAt;
	delete updated.isDeleted;

	const res: UpdateUserProfileResponse = {
		...updated,
		_id: updated._id.toHexString(),
		roleOwner: {
			...updated.roleOwner,
			storeId: updated.roleOwner?.storeId.toHexString() || '',
		},
	};

	return res;
};

const UserRepo = Object.freeze({ updateUserProfile, getMyProfile });

export default UserRepo;
