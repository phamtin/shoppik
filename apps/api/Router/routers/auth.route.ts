import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { SigninMethod } from '@prisma/client';

import { publicProcedure, router } from '../trpc';
import AuthService from '../../Service/auth/auth.service';

const signinRequest = z.object({
	email: z.string(),
	accessToken: z.string(),
	provider: z.nativeEnum(SigninMethod),
	fullname: z.string(),
	avatar: z.string(),
	expiresAt: z.number(),
	scope: z.string(),
});
const signinResponse = z.object({
	encryptedJwt: z.string(),
	email: z.string(),
	accountId: z.string(),
	role: z.string(),
	prodiver: z.nativeEnum(SigninMethod),
	avatar: z.string(),
	fullname: z.string(),
});

export type SigninRequest = z.infer<typeof signinRequest>;
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
			const signinRes = AuthService.signinGoogle(params.ctx, params.input);
			return signinRes;
		}),
});
