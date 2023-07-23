import { z } from 'zod';

import { StoreAddressSchema, StoreSchema } from '@shoppik/schema';
import StoreService from '../../Service/store/store.service';
import { authenticatedProcedure, router } from '../trpc';

const createStoreRequest = z.object({
	name: z.string(),
	avatar: z.string(),
	tradeName: z.string(),
	description: z.string(),
	storeAddress: StoreAddressSchema,
	contact: z.object({
		email: z.string(),
		phone: z.string(),
		instagramLink: z.string().optional(),
		facebookLink: z.string().optional(),
		youtubeLink: z.string().optional(),
	}),
	landingPageUrl: z.string(),
	tags: z.array(z.string()),
});

const createStoreResponse = StoreSchema;

const getMyStoreResponse = z.object({
	data: StoreSchema.nullable(),
});

export type CreateStoreRequest = z.infer<typeof createStoreRequest>;
export type CreateStoreResponse = z.infer<typeof createStoreResponse>;
export type GetMyStoreResponse = z.infer<typeof getMyStoreResponse>;

export const storeRouter = router({
	createStore: authenticatedProcedure
		.input(createStoreRequest)
		.output(createStoreResponse)
		.mutation(async ({ ctx, input }) => {
			const store = await StoreService.createStore(ctx, input);
			return store;
		}),

	getMyStore: authenticatedProcedure.output(getMyStoreResponse).query(async ({ ctx }) => {
		const store = await StoreService.getMyStore(ctx);
		return store;
	}),
});
