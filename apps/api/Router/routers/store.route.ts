import { z } from 'zod';

import { authenticatedProcedure, publicProcedure, router } from '../trpc';
import StoreService from 'Service/store/store.service';
import { StoreSchema } from '@shoppik/prisma/generated';

const createStoreRequest = z.object({
	name: z.string(),
	tradeName: z.string(),
	description: z.string(),
	avatar: z.string(),
	landingPageUrl: z.string(),
	contact: z.object({
		phone: z.array(z.string()).min(1),
		facebookLink: z.string(),
		youtubeLink: z.string(),
		instagramLink: z.string(),
	}),
	tags: z.array(z.string()).min(2),
});

const createStoreResponse = z.object({
	success: z.number(),
});

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
	createStore: publicProcedure
		.input(createStoreRequest)
		.output(createStoreResponse)
		.mutation(async ({ ctx, input }) => {
			await StoreService.createStore(ctx, input);

			return { success: 1 };
		}),

	getMyStore: authenticatedProcedure
		.input(getMyStoreRequest)
		.output(getMyStoreResponse)
		.query(async ({ ctx, input }) => {
			const stores = await StoreService.getMyStore(ctx, input);

			return stores;
		}),
});
