import { z } from 'zod';
import { AttributePatternSchema, ProductWithRelationsSchema, StoreTagSchema } from '@shoppik/schema';

import ProductService from 'Service/product/product.service';
import { authenticatedProcedure, router } from '../trpc';

const createProductRequest = z.object({
	name: z.string(),
	quantity: z.number(),
	description: z.string(),
	originPrice: z.number(),
	images: z.array(z.string()),
	keyFeatures: z.array(z.string()),
	storeCategories: StoreTagSchema,
	shoppikCategories: z.array(z.string()),
	variants: AttributePatternSchema,
	detail: AttributePatternSchema,
	isDraft: z.boolean(),
});
const createProductResponse = z.object({
	data: ProductWithRelationsSchema,
});

export type CreateProductRequest = z.infer<typeof createProductRequest>;
export type CreateProductResponse = z.infer<typeof createProductResponse>;

export const productRouter = router({
	createProduct: authenticatedProcedure
		.input(createProductRequest)
		.output(createProductResponse)
		.mutation(async ({ ctx, input }) => {
			const res = await ProductService.createProduct(ctx, input);
			return res;
		}),
});
