import { z } from 'zod';

import { STATUS } from './store.entity';

export const CreateStoreRequest = z.object({
	ownerId: z.string(),
	name: z.string(),
	status: z.nativeEnum(STATUS),
	categories: z
		.array(z.object({ name: z.string() }))
		.min(1)
		.max(32),
});

export const CreateStoreResponse = z.object({
	success: z.number(),
});

export const GetStoresRequest = z.object({
	greeting: z.string(),
});

export const GetStoresResponse = z.object({
	greeting: z.string(),
});
