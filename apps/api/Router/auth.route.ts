import { TRPCError } from '@trpc/server';
import { Customer, Owner, SigninMethod } from '@shoppik/types';

import AuthService from 'Service/auth/auth.service';
import { publicProcedure, router } from './routers/trpc';
import { auth } from 'Generated/auth';

export type SigninRequest = {
	email: string;
	accessToken: string;
	provider: SigninMethod;
	fullname: string;
	avatar: string;
	expiresAt: number;
	scope: string;
};
export type SigninResponse = {
	_id: string;
	email: string;
	fullname: string;
	firstname: string;
	lastname: string;
	encryptedJwt: string;
	roleCustomer: Customer;
	roleOwner: Owner | null;
};

export const authRouter = router({
	signin: publicProcedure
		.input(auth.SigninRequest)
		.output(auth.SigninResponse)
		.mutation(async (params) => {
			if (params.input.provider !== SigninMethod.GOOGLE) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Unavailable signin method',
				});
			}
			const res = await AuthService.signinGoogle(params.ctx, params.input);

			return res;
		}),
});
