import { Contact, StoreAddress, StoreSchema, StoreTag } from '@shoppik/types';

import StoreService from 'Service/store/store.service';
import { authenticatedProcedure, router } from './routers/trpc';
import { StringId } from 'Pkgs/types/common.type';
import { DeepPartial } from '@trpc/server';
import { store } from 'Generated/store';

export type CreateStoreRequest = {
	name: string;
	avatar: string;
	tradeName: string;
	description: string;
	landingPageUrl: string;
	tags: StringId<StoreTag>[];
	contact: Contact;
	storeAddress: StoreAddress;
};
export type CreateStoreResponse = {
	insertedId: string;
};
export type GetMyStoreResponse = {
	data: StringId<StoreSchema> | null;
};
export type UpdateStoreRequest = DeepPartial<{
	name: string;
	avatar: string;
	tradeName: string;
	description: string;
	landingPageUrl: string;
	tags: StoreTag[];
	contact: Contact;
	storeAddress: StoreAddress;
}>;
export type UpdateStoreResponse = {
	res: boolean;
};

export const storeRouter = router({
	getMyStore: authenticatedProcedure.output(store.GetMyStoreResponse).query(async ({ ctx }) => {
		const store = await StoreService.getMyStore(ctx);
		return store;
	}),

	createStore: authenticatedProcedure
		.input(store.CreateStoreRequest)
		.output(store.CreateStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const store = await StoreService.createStore(ctx, input);
			return store;
		}),

	updateStoreProfile: authenticatedProcedure
		.input(store.UpdateStoreRequest)
		.output(store.UpdateStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const updatedStore = await StoreService.updateMyStore(ctx, input);
			return updatedStore;
		}),
});
