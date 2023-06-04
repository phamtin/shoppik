import { z } from 'zod';

import { publicProcedure, router } from '../trpc';
import systemLog from '../../Pkgs/systemLog';

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
			systemLog.info('Get market successfully: ');
			systemLog.info(ctx.user.id);

			return true;
		}),
});
