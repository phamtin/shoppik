import { TRPCError } from '@trpc/server';

import { CreateUserRequest, CreateUserResponse, GetUsersResponse } from '../../Model/user/user.validator';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
	//
	create: publicProcedure
		.input(CreateUserRequest)
		.output(CreateUserResponse)
		.mutation((mutationParams) => {
			if (!mutationParams.ctx.user.name) throw new TRPCError({ code: 'UNAUTHORIZED' });

			return { success: 1 };
		}),

	list: publicProcedure
		.input(CreateUserRequest)
		.output(GetUsersResponse)
		.query((queryParams) => {
			if (!queryParams.ctx.user.name) throw new TRPCError({ code: 'UNAUTHORIZED' });

			return { greeting: 'hi' };
		}),
});
