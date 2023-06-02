import makeMarketService from './market/market.service';
import makeProductService from './product/product.service';
import makeStoreService from './store/store.service';

export const marketService = makeMarketService();
export const productService = makeProductService();
export const storeService = makeStoreService();
