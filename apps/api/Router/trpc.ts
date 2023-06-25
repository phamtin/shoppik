import { TRPCError, initTRPC } from '@trpc/server';

import { Context } from './context';

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
	const currentUser = ctx.user;

	if (!currentUser) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	const { id, email, role, firstname, lastname } = currentUser;

	if (!id || !email || !role || !firstname || !lastname) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: { user: currentUser },
	});
});

export const router = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);
