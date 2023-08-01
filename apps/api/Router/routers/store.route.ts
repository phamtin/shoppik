import { z } from 'zod';

import { ContactSchema, StoreAddressSchema, StoreTagSchema, StoreWithRelationsSchema } from '@shoppik/schema';
import StoreService from '../../Service/store/store.service';
import { authenticatedProcedure, router } from '../trpc';

const createStoreRequest = z.object({
	name: z.string(),
	avatar: z.string(),
	tradeName: z.string(),
	description: z.string(),
	landingPageUrl: z.string(),
	tags: StoreTagSchema,
	contact: ContactSchema,
	storeAddress: StoreAddressSchema,
});

const createStoreResponse = StoreWithRelationsSchema;

const getMyStoreResponse = z.object({
	data: StoreWithRelationsSchema.nullable(),
});

const updateStoreRequest = z
	.object({
		name: z.string(),
		avatar: z.string(),
		tradeName: z.string(),
		description: z.string(),
		landingPageUrl: z.string(),
		tags: StoreTagSchema,
		contact: ContactSchema.partial(),
		storeAddress: StoreAddressSchema.partial(),
	})
	.partial();

const updateStoreResponse = StoreWithRelationsSchema;

export type CreateStoreRequest = z.infer<typeof createStoreRequest>;
export type CreateStoreResponse = z.infer<typeof createStoreResponse>;
export type GetMyStoreResponse = z.infer<typeof getMyStoreResponse>;
export type UpdateStoreRequest = z.infer<typeof updateStoreRequest>;
export type UpdateStoreResponse = z.infer<typeof updateStoreResponse>;

export const storeRouter = router({
	getMyStore: authenticatedProcedure.output(getMyStoreResponse).query(async ({ ctx }) => {
		const store = await StoreService.getMyStore(ctx);
		return store;
	}),

	createStore: authenticatedProcedure
		.input(createStoreRequest)
		.output(createStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const store = await StoreService.createStore(ctx, input);
			return store;
		}),

	updateStoreProfile: authenticatedProcedure
		.input(updateStoreRequest)
		.output(updateStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const updatedStore = await StoreService.updateMyStore(ctx, input);
			return updatedStore;
		}),
});
