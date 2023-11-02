import { TRPCError } from '@trpc/server';
import { StoreStatus } from '@shoppik/types';

import {
	CreateProductRequest,
	CreateProductResponse,
	GetProductDetailRequest,
	GetProductDetailResponse,
	GetShoppikCategoryResponse,
	GetStoreProductsRequest,
	GetStoreProductsResponse,
} from 'Router/product.route';
import StoreService from 'Service/store/store.service';
import ProductRepo from 'Repository/product/product.repo';
import { Context } from 'Router/routers/context';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	ctx.systemLog.info('Create new Product - START');

	const store = await StoreService.getMyStore(ctx);
	if (store.data === null) {
		throw new TRPCError({ code: 'BAD_REQUEST' });
	}
	if (store.data.isDeleted ?? store.data.storeStatus !== StoreStatus.ACTIVE) {
		throw new TRPCError({ code: 'BAD_REQUEST' });
	}
	const created = await ProductRepo.createProduct(ctx, request);

	ctx.systemLog.info('Create new Product - END');

	return created;
};

const getShoppikCategory = async (): Promise<GetShoppikCategoryResponse> => {
	const ShoppikCategories = await ProductRepo.getShoppikCategory();
	return ShoppikCategories;
};

const getOverviewProductList = async (ctx: Context, request: GetStoreProductsRequest): Promise<GetStoreProductsResponse> => {
	let res: GetStoreProductsResponse = {
		products: [],
		total: 0,
	};
	res = await ProductRepo.getOverviewProductList(ctx, request);

	return res;
};

const getProductDetail = async (ctx: Context, request: GetProductDetailRequest): Promise<GetProductDetailResponse> => {
	let res: GetProductDetailResponse = {
		product: null,
	};
	res = await ProductRepo.getProductDetail(ctx, request);

	return res;
};

const getProductDetail = async (ctx: Context, request: GetProductDetailRequest): Promise<GetProductDetailResponse> => {
	const product = await ProductRepo.getProductDetail(ctx, request);
	return product;
};

const ProductService = {
	createProduct,
	getOverviewProductList,
	getShoppikCategory,
	getProductDetail,
};

export default ProductService;
