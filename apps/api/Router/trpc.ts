import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { Context } from './context';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

const isAuthed = t.middleware(({ next, ctx }) => {
	const currentUser = ctx.user;

	if (!currentUser || !currentUser.id || !currentUser.email || (!currentUser.roleCustomer && !currentUser.roleOwner)) {
		ctx.systemLog.error('[isAuthed] Invalid credentials');
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: { user: currentUser },
	});
});

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);
