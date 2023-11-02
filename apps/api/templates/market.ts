import { createAssert } from 'typia';
import { GetMarketRequest } from 'Router/market.route';

const market = {
	GetMarketRequest: createAssert<GetMarketRequest>(),
};

export { market };
