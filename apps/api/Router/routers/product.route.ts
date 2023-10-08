import { z } from 'zod';
import { AttributePatternSchema, PaginationSchema, ProductWithRelationsSchema, StoreTagSchema } from '@shoppik/schema';

import ProductService from 'Service/product/product.service';
import { publicProcedure, authenticatedProcedure, router } from '../trpc';
import ObjectID from 'bson-objectid';

const createProductRequest = z.object({
	name: z.string(),
	description: z.string().nullable().optional(),
	images: z.array(z.string()),
	keyFeatures: z.array(z.string()),
	detail: z.array(AttributePatternSchema),
	variants: z.array(AttributePatternSchema),
	shoppikCategories: z.array(z.string()),
	storeCategories: z.array(StoreTagSchema),
	originPrice: z.number(),
	quantity: z.number(),
	isDraft: z.boolean(),
});
const createProductResponse = z.object({
	data: ProductWithRelationsSchema,
});
const getShoppikCategoryResponse = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		parentId: z.string().optional(),
		isSubCategory: z.boolean(),
	}),
);
const getStoreProductsRequest = z.object({
	query: z.string().optional(),
	pagination: PaginationSchema.optional(),
});
const getStoreProductsResponse = z.array(ProductWithRelationsSchema);
const getProductDetailResponse = ProductWithRelationsSchema.nullable();
const getProductDetailRequest = z.object({
	productId: z.string(),
});

export type CreateProductRequest = z.infer<typeof createProductRequest>;
export type CreateProductResponse = z.infer<typeof createProductResponse>;
export type GetShoppikCategoryResponse = z.infer<typeof getShoppikCategoryResponse>;
export type GetStoreProductsRequest = z.infer<typeof getStoreProductsRequest>;
export type GetStoreProductsResponse = z.infer<typeof getStoreProductsResponse>;
export type GetProductDetailRequest = z.infer<typeof getProductDetailRequest>;
export type GetProductDetailResponse = z.infer<typeof getProductDetailResponse>;

export const productRouter = router({
	getShoppikCategory: publicProcedure.output(getShoppikCategoryResponse).query(async ({ ctx }) => {
		const res = await ProductService.getShoppikCategory(ctx);
		return res;
	}),

	createProduct: authenticatedProcedure
		.input(createProductRequest)
		.output(createProductResponse)
		.mutation(async ({ ctx, input }) => {
			const res = await ProductService.createProduct(ctx, input);
			return res;
		}),

	getStoreProducts: authenticatedProcedure
		.input(getStoreProductsRequest)
		.output(getStoreProductsResponse)
		.query(async ({ ctx, input }) => {
			const res = await ProductService.getStoreProducts(ctx, input);
			return res;
		}),

	getProductDetail: publicProcedure
		.input(getProductDetailRequest)
		.output(getProductDetailResponse)
		.query(async ({ ctx, input }) => {
			const res = await ProductService.getProductDetail(ctx, input);
			return res;
		}),
});
