import { apiRouter } from './api';
import { marketRouter } from './market.route';

import { router } from '../trpc';
import { storeRouter } from './store.route';
import { authRouter } from './auth.route';

export const appRouter = router({
	api: apiRouter,
	market: marketRouter,
	store: storeRouter,
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
