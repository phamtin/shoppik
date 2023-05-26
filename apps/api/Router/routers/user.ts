import { TRPCError } from '@trpc/server';

import { CreateAccountRequest, CreateAccountResponse } from '../../Model/account/account.validator';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
	//
	create: publicProcedure
		.input(CreateAccountRequest)
		.output(CreateAccountResponse)
		.mutation((mutationParams) => {
			if (!mutationParams.ctx.user.name) throw new TRPCError({ code: 'UNAUTHORIZED' });

			return { success: 1 };
		}),
});
