import { z } from 'zod';

import { publicProcedure, router } from '../trpc';
import { authService } from '../../Service';
import { TRPCError } from '@trpc/server';
import { SigninMethod } from '@prisma/client';

const signinRequest = z.object({
	email: z.string(),
	accessToken: z.string(),
	provider: z.nativeEnum(SigninMethod),
	fullname: z.string(),
	avatar: z.string(),
	expiresAt: z.number(),
	scope: z.string(),
});
export type SigninRequest = z.infer<typeof signinRequest>;
const signinResponse = z.object({
	token: z.string(),
	email: z.string(),
	accountId: z.string(),
	role: z.string(),
	prodiver: z.nativeEnum(SigninMethod),
	avatar: z.string(),
	fullname: z.string(),
});
export type SigninResponse = z.infer<typeof signinResponse>;

export const authRouter = router({
	signin: publicProcedure
		.input(signinRequest)
		.output(signinResponse)
		.mutation((params) => {
			if (params.input.provider !== SigninMethod.GOOGLE) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Unavailabel signin method',
				});
			}
			const signinRes = authService.signinGoogle(params.input);
			return signinRes;
		}),
});
