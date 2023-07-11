import { z } from 'zod';
import { AccountSchema } from '@shoppik/schema';

import UserService from '../../Service/user/user.service';
import { authenticatedProcedure, router } from '../trpc';

const updateUserProfileRequest = z
	.object({
		avatar: z.string(),
		locale: z.string(),
		fullname: z.string(),
		lastname: z.string(),
		firstname: z.string(),
		birthday: z.string(),
		phoneNumber: z.string(),
		postalCode: z.string(),
		isDeleted: z.boolean(),
	})
	.partial();

const updateUserProfileResponse = AccountSchema.omit({ isDeleted: true, deletedAt: true });
const getMyProfileResponse = AccountSchema.omit({ isDeleted: true, deletedAt: true });
export type UpdateUserProfileResponse = z.infer<typeof updateUserProfileResponse>;
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileRequest>;
export type GetMyProfileResponse = z.infer<typeof getMyProfileResponse>;

export const authRouter = router({
	updateUserProfile: authenticatedProcedure
		.input(updateUserProfileRequest)
		.output(updateUserProfileResponse)
		.mutation(async (params) => {
			const res = await UserService.updateUserProfile(params.ctx, params.input);

			return res;
		}),

	getMyProfile: authenticatedProcedure.output(getMyProfileResponse).query(async (params) => {
		const res = await UserService.getMyProfile(params.ctx);
		return res;
	}),
});
