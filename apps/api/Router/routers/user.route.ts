import { z } from 'zod';
import { AccountSchema, CustomerSchema, OwnerSchema } from '@shoppik/schema';

import UserService from '../../Service/user/user.service';
import { authenticatedProcedure, router } from '../trpc';

const updateUserProfileRequest = z
	.object({
		avatar: z.string(),
		fullname: z.string(),
		lastname: z.string(),
		firstname: z.string(),
		birthday: z.string(),
		phoneNumber: z.string(),
		postalCode: z.string(),
		isDeleted: z.boolean(),
		roleCustomer: CustomerSchema,
		roleOwner: OwnerSchema,
	})
	.partial();

const updateUserProfileResponse = AccountSchema.omit({ isDeleted: true, deletedAt: true }).extend({ roleCustomer: CustomerSchema, roleOwner: OwnerSchema.nullable() });
const getMyProfileResponse = AccountSchema.omit({ isDeleted: true, deletedAt: true });
export type UpdateUserProfileResponse = z.infer<typeof updateUserProfileResponse>;
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileRequest>;
export type GetMyProfileResponse = z.infer<typeof getMyProfileResponse>;

export const userRouter = router({
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
