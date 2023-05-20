import { z } from 'zod';

export const z_Product = z.object({
	name: z.string(),
	price: z.number(),
	storeId: z.string().optional(),
});

export type Product = z.infer<typeof z_Product>;
