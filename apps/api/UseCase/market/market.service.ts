import { z } from 'zod';

import makeProductService from '../product/product.service';
import { Context } from '../../Router/context';
import { getMarketRequest } from 'Router/routers/market';

export default function makeMarketService() {
	const productService = makeProductService();

	async function getPublicMarket(ctx: Context, request: z.infer<typeof getMarketRequest>) {
		const products = productService.getProducts(request.price);

		return products;
	}

	async function getCustomizedMarket(ctx: Context, request: z.infer<typeof getMarketRequest>) {
		const products = productService.getProducts(1110);
		return products;
	}

	return Object.freeze({ getPublicMarket, getCustomizedMarket });
}
