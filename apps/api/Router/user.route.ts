import { authenticatedProcedure, router } from 'Router/routers/trpc';
import UserService from 'Service/user/user.service';
import { AccountSchema, Owner } from '@shoppik/types';
import { account } from '../Generated/account';

export type UpdateUserProfileRequest = Partial<{
	avatar: string;
	fullname: string;
	lastname: string;
	firstname: string;
	birthday: string;
	phoneNumber: string;
	postalCode: string;
	roleOwner: Owner;
}>;
export type UpdateUserProfileResponse = Omit<AccountSchema, 'isDeleted' | 'deletedAt'>;

export type GetMyProfileResponse = Omit<AccountSchema, 'isDeleted' | 'deletedAt'>;

export const userRouter = router({
	updateUserProfile: authenticatedProcedure
		.input(account.UpdateUserProfileRequest)
		.output(account.UpdateUserProfileResponse)
		.mutation(async (params) => {
			const res = await UserService.updateUserProfile(params.ctx, params.input);
			return res;
		}),

	getMyProfile: authenticatedProcedure.output(account.GetMyProfileResponse).query(async (params) => {
		const res = await UserService.getMyProfile(params.ctx);
		return res;
	}),
});
