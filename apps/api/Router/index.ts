import { apiRouter } from './routes/api';
import { userRouter } from './routes/user';

import { router } from './trpc';

export const appRouter = router({
	user: userRouter,
});

export type AppRouter = typeof appRouter;
