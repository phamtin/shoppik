import { z } from 'zod';

import { publicProcedure, router } from '../trpc';
import { marketService } from 'UseCase';
import systemLog from 'Pkgs/systemLog';
import { Product, z_Product } from '../../Model/product/product.entity';

export const getMarketRequest = z.object({
	price: z.number(),
});
export const getMarketResponse = z.array(z_Product).nullable();

export const marketRouter = router({
	getmarket: publicProcedure
		.input(getMarketRequest)
		.output(getMarketResponse)
		.query(async (queryParams) => {
			const { ctx } = queryParams;
			systemLog.info('Get market successfully: ');
			systemLog.info(ctx.user.id);
			let products: Product[];

			if (!ctx.user.id) {
				products = await marketService.getPublicMarket(ctx, getMarketRequest._output);
			} else {
				products = await marketService.getCustomizedMarket(ctx, getMarketRequest._output);
			}

			return products;
		}),
});
