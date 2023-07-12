import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';

import { Context } from './context';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

const isAuthed = t.middleware(({ next, ctx }) => {
	const currentUser = ctx.user;

	if (!currentUser) {
		ctx.systemLog.error('Invalid credentials');
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	const { id, email, role } = currentUser;

	if (!id || !email || !role) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: { user: currentUser },
	});
});

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);
