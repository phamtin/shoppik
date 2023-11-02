import { AttributePattern, Pagination, ProductSchema, ShoppikCategory, StoreTag } from '@shoppik/types';

import ProductService from 'Service/product/product.service';
import { publicProcedure, authenticatedProcedure, router, isOwnerProcedure } from './routers/trpc';
import { StringId } from 'Pkgs/types/common.type';
import { product } from '../Generated/product';

export type CreateProductRequest = {
	name: string;
	description?: string;
	images: string[];
	keyFeatures: string[];
	detail: AttributePattern[];
	variants: AttributePattern[];
	shoppikCategories: string[];
	storeCategories: Array<StringId<StoreTag>>;
	originPrice: number;
	quantity: number;
	isDraft: boolean;
};
export type GetShoppikCategoryResponse = {
	data: Array<StringId<ShoppikCategory>>;
};
export type GetStoreProductsRequest = {
	query?: string;
	pagination?: Pagination;
};
export type CreateProductResponse = {
	data: StringId<ProductSchema>;
};
export type GetStoreProductsResponse = {
	products: Array<Pick<StringId<ProductSchema>, '_id' | 'name' | 'slug' | 'images' | 'quantity'>>;
	total?: number;
};
export type GetProductDetailRequest = {
	_id: string;
};
export type GetProductDetailResponse = {
	product: StringId<ProductSchema> | null;
};

export const productRouter = router({
	getShoppikCategory: publicProcedure.output(product.GetShoppikCategoryResponse).query(async () => {
		const res = await ProductService.getShoppikCategory();
		return res;
	}),

	createProduct: authenticatedProcedure
		.input(product.CreateProductRequest)
		.output(product.CreateProductResponse)
		.mutation(async ({ ctx, input }) => {
			const res = await ProductService.createProduct(ctx, input);
			return res;
		}),

	getOverviewProductList: isOwnerProcedure
		.input(product.GetStoreProductsRequest)
		.output(product.GetStoreProductsResponse)
		.query(async ({ ctx, input }) => {
			let res: GetStoreProductsResponse = {
				products: [],
				total: 0,
			};
			res = await ProductService.getOverviewProductList(ctx, input);

			return res;
		}),

	getProductDetail: publicProcedure
		.input(product.GetProductDetailRequest)
		.output(product.GetProductDetailResponse)
		.query(async ({ ctx, input }) => {
			const res = await ProductService.getProductDetail(ctx, input);
			return {
				product: res.product,
			};
		}),
});
