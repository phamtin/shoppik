import { z } from 'zod';

import { STATUS } from './entity.entity';

export const CreatePortfolioRequest = z.object({
	userId: z.string(),
	name: z.string(),
	status: z.nativeEnum(STATUS),
	token: z
		.array(
			z.object({
				name: z.string(),
				price: z.number().gt(0).lt(1000000),
			}),
		)
		.min(0)
		.max(1000),
});

export const CreatePortfolioResponse = z.object({
	success: z.number(),
});

export const GetPortfoliosRequest = z.object({
	greeting: z.string(),
});

export const GetPortfoliosResponse = z.object({
	greeting: z.string(),
});
