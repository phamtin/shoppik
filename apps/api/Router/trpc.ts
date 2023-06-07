import { OpenApiMeta } from 'trpc-openapi';
import { TRPCError, initTRPC } from '@trpc/server';

import { Context } from './context';

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.user?.id) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}
	return next({
		ctx: { user: ctx.user },
	});
});

export const router = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);
