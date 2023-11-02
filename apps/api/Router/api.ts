import { publicProcedure, router } from './routers/trpc';

export const apiRouter = router({
	version: publicProcedure.query(() => {
		return { version: '0.42.0' };
	}),

	hello: publicProcedure.query(() => {
		return {
			text: `hello world`,
		};
	}),
});
