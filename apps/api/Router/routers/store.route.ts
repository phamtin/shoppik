import { z } from 'zod';

import { z_Store } from '../../Model/store/store.entity';
import { publicProcedure, router } from '../trpc';
import { storeService } from '../../UseCase';

export const createStoreRequest = z.object({
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
export const createStoreResponse = z_Store;

export const storeRouter = router({
	createStore: publicProcedure
		.input(createStoreRequest)
		.output(createStoreResponse)
		.mutation(async (queryParams) => {
			const createdStore = await storeService.createStore(queryParams.ctx, queryParams.input);

			return createdStore;
		}),
});
