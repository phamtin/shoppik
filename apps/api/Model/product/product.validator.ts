import { z } from 'zod';

export const CreateProducttRequest = z.object({
	name: z.string(),
});

export const CreateProducttResponse = z.object({
	success: z.number(),
});

export const GetAccountsRequest = z.object({
	greeting: z.string(),
});

export const GetAccountsResponse = z.object({
	greeting: z.string(),
});
