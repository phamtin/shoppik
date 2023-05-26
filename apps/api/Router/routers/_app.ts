import { apiRouter } from './api';
import { marketRouter } from './market';

import { router } from '../trpc';

export const appRouter = router({
	market: marketRouter,
	api: apiRouter,
});

export type AppRouter = typeof appRouter;
