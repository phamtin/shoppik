import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';

import { Context, UserRequest } from './context';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

const isAuthed = t.middleware(async ({ next, ctx }) => {
	if (!ctx.user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

	const dedicatedUser = await ctx.prisma.account.findUnique({
		where: {
			id: ctx.user?.id,
		},
	});

	if (!dedicatedUser || !dedicatedUser.id || !dedicatedUser.email || (!dedicatedUser.roleCustomer && !dedicatedUser.roleOwner)) {
		ctx.systemLog.error('[isAuthed] Invalid credentials');
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	const user: UserRequest = {
		id: dedicatedUser.id,
		fullname: dedicatedUser.fullname,
		firstname: dedicatedUser.firstname,
		lastname: dedicatedUser.lastname,
		email: dedicatedUser.email,
		roleCustomer: dedicatedUser.roleCustomer,
		roleOwner: dedicatedUser.roleOwner ?? { storeId: '' },
	};

	return next({
		ctx: { user },
	});
});

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);
