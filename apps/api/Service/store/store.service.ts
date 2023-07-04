import { CreateStoreRequest, GetMyStoreRequest, GetMyStoreResponse } from '../../Router/routers/store.route';
import StoreRepo from '../../Repository/store.repo';
import { Context } from '../../Router/context';

const createStore = async (ctx: Context, request: CreateStoreRequest) => {
	ctx.systemLog.info('createStore - START');

	const newStore = await StoreRepo.createStore(ctx, request);

	ctx.systemLog.info('createStore - END');

	return newStore;
};

const getMyStore = async (ctx: Context, request: GetMyStoreRequest): Promise<GetMyStoreResponse> => {
	ctx.systemLog.info('getMyStore - START');

	const newStore = StoreRepo.getMyStore(ctx, request);

	ctx.systemLog.info('getMyStore - END');

	return newStore;
};

const StoreService = {
	createStore,
	getMyStore,
};

export default StoreService;
