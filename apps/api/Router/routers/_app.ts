import { apiRouter } from './api';
import { marketRouter } from './market.route';

import { router } from '../trpc';
import { storeRouter } from './store.route';

export const appRouter = router({
	api: apiRouter,
	market: marketRouter,
	store: storeRouter,
});

export type AppRouter = typeof appRouter;
