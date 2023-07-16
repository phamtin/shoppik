import { CreateStoreRequest, GetMyStoreRequest, GetMyStoreResponse } from '../../Router/routers/store.route';
import StoreRepo from '../../Repository/store.repo';
import UserService from 'Service/user/user.service';
import { Context } from '../../Router/context';
import { TRPCError } from '@trpc/server';

const createStore = async (ctx: Context, request: CreateStoreRequest) => {
	ctx.systemLog.info('create Store - START');

	//	[DB.createStore] 1/2
	const newStore = await StoreRepo.createStore(ctx, request);
	if (!newStore?.id) {
		throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
	}

	//	[DB.createStore] 2/2
	await UserService.addStoreId(ctx, newStore.id);

	ctx.systemLog.info('create Store - END');

	return newStore;
};

const getMyStore = async (ctx: Context, request: GetMyStoreRequest): Promise<GetMyStoreResponse> => {
	ctx.systemLog.info('get My Store - START');

	const newStore = StoreRepo.getMyStore(ctx, request);

	ctx.systemLog.info('get My Store - END');

	return newStore;
};

const StoreService = {
	createStore,
	getMyStore,
};

export default StoreService;
