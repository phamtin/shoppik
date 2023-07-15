import { z } from 'zod';

import { authenticatedProcedure, router } from '../trpc';
import StoreService from '../../Service/store/store.service';
import { StoreSchema } from '@shoppik/schema';

const createStoreRequest = z.object({
	name: z.string(),
	storeAddress: z.string(),
	tradeName: z.string(),
	description: z.string(),
	avatar: z.string(),
	landingPageUrl: z.string(),
	contact: z.object({
		email: z.string(),
		phone: z.string(),
		instagramLink: z.string().optional(),
		facebookLink: z.string().optional(),
		youtubeLink: z.string().optional(),
	}),
	tags: z.array(z.string()),
});

const createStoreResponse = StoreSchema;

const getMyStoreRequest = z.object({
	storeId: z.string().optional(),
});

const getMyStoreResponse = z.object({
	data: z.array(StoreSchema),
});

export type CreateStoreRequest = z.infer<typeof createStoreRequest>;
export type CreateStoreResponse = z.infer<typeof createStoreResponse>;
export type GetMyStoreRequest = z.infer<typeof getMyStoreRequest>;
export type GetMyStoreResponse = z.infer<typeof getMyStoreResponse>;

export const storeRouter = router({
	createStore: authenticatedProcedure
		.input(createStoreRequest)
		.output(createStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const store = await StoreService.createStore(ctx, input);

			return store;
		}),

	getMyStore: authenticatedProcedure
		.input(getMyStoreRequest)
		.output(getMyStoreResponse)
		.query(async ({ ctx, input }) => {
			const stores = await StoreService.getMyStore(ctx, input);

			return stores;
		}),
});
