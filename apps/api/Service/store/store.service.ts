import { CreateStoreRequest, CreateStoreResponse, GetMyStoreResponse, UpdateStoreRequest, UpdateStoreResponse } from 'Router/store.route';
import StoreRepo from 'Repository/store/store.repo';
import UserService from 'Service/user/user.service';
import { Context } from 'Router/routers/context';
import { TRPCError } from '@trpc/server';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	ctx.systemLog.info('create Store - START');

	const isAlreadyHasStore = await UserService.isOwner(ctx);

	if (isAlreadyHasStore) {
		throw new TRPCError({ code: 'BAD_REQUEST', message: "This account'd already had a store" });
	}
	if (request.contact.email !== ctx.user?.email) {
		throw new TRPCError({ code: 'BAD_REQUEST', message: 'Hack cc' });
	}

	//	1/2 [createStore]
	const res = await StoreRepo.createStore(ctx, request);
	if (!res.insertedId) {
		throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
	}
	//	2/2 [updateUserProfile]
	await UserService.updateUserProfile(ctx, {
		roleOwner: {
			storeId: res.insertedId,
		},
	});

	ctx.systemLog.info('create Store - END');

	return {
		insertedId: res.insertedId,
	};
};

const getMyStore = async (ctx: Context): Promise<GetMyStoreResponse> => {
	ctx.systemLog.info('get My Store - START');

	const newStore = StoreRepo.getMyStore(ctx);

	ctx.systemLog.info('get My Store - END');

	return newStore;
};

const updateMyStore = async (ctx: Context, request: UpdateStoreRequest): Promise<UpdateStoreResponse> => {
	ctx.systemLog.info('Update My Store - START');

	const isSuccess = StoreRepo.updateMyStore(ctx, request);

	ctx.systemLog.info('Update My Store - END');

	return isSuccess;
};

const StoreService = {
	createStore,
	getMyStore,
	updateMyStore,
};

export default StoreService;
