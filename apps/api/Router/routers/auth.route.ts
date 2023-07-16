import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { SigninMethod } from '@prisma/client';
import { CustomerSchema, OwnerSchema } from '@shoppik/schema';

import AuthService from '../../Service/auth/auth.service';
import { publicProcedure, router } from '../trpc';

const signinRequest = z.object({
	email: z.string(),
	accessToken: z.string(),
	provider: z.nativeEnum(SigninMethod),
	fullname: z.string(),
	avatar: z.string(),
	expiresAt: z.number(),
	scope: z.string(),
});
const signinResponse = z
	.object({
		id: z.string(),
		email: z.string(),
		fullname: z.string(),
		firstname: z.string(),
		lastname: z.string(),
		encryptedJwt: z.string(),
		roleCustomer: CustomerSchema,
		roleOwner: OwnerSchema.nullable(),
	})
	.strict();

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
			const r = await AuthService.signinGoogle(params.ctx, params.input);

			return r;
		}),
});
