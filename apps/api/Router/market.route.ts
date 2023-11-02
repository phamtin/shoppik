import { publicProcedure, router } from './routers/trpc';
import { market } from '../Generated/market';

export type GetMarketRequest = {
	price: string;
};

export const marketRouter = router({
	getmarket: publicProcedure.input(market.GetMarketRequest).query((queryParams) => {
		const { ctx } = queryParams;
		ctx.systemLog.info('Get market successfully: ');

		return true;
	}),
});
