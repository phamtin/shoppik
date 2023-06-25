import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const getMarketRequest = z.object({
	price: z.number(),
});
export const getMarketResponse = z.boolean();

export const marketRouter = router({
	getmarket: publicProcedure
		// .input(getMarketRequest)
		.output(getMarketResponse)
		.query((queryParams) => {
			const { ctx } = queryParams;
			ctx.systemLog.info('Get market successfully: ');

			return true;
		}),
});
