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
	firstname: z.string(),
	lastname: z.string(),
});

export type SigninRequest = z.infer<typeof signinRequest>;
export type SigninResponse = z.infer<typeof signinResponse>;

export const authRouter = router({
	signin: publicProcedure
		.input(signinRequest)
		.output(signinResponse)
		.mutation(async (params) => {
			if (params.input.provider !== SigninMethod.GOOGLE) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Unavailable signin method',
				});
			}
			const signinRes = await AuthService.signinGoogle(params.ctx, params.input);

			params.ctx.res.setCookie('accessToken', signinRes?.encryptedJwt ?? 'abc123').then(
				() => {
					console.log('WTF');
					console.log(params.ctx.res.getHeaders());
					return signinRes;
				},
				() => {
					console.log('WTF Err');
				},
			);

			return signinRes;
		}),
});
