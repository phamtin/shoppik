import makeMarketService from './market/market.service';
import makeProductService from './product/product.service';

export const marketService = makeMarketService();
export const productService = makeProductService();
