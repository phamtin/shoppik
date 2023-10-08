import slugify from 'slugify';

import {
	CreateProductRequest,
	CreateProductResponse,
	GetProductDetailRequest,
	GetProductDetailResponse,
	GetShoppikCategoryResponse,
	GetStoreProductsRequest,
	GetStoreProductsResponse,
} from 'Router/routers/product.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	const productDb = ctx.prisma.product;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const now = new Date();

	const createdProduct = await productDb.create({
		data: {
			name: request.name,
			slug: slugify(request.name + '-' + now.getTime().toString()),
			storeId: ctx.user.roleOwner.storeId,
			description: request.description,
			keyFeatures: request.keyFeatures,
			detail: request.detail,
			images: request.images,
			originPrice: request.originPrice,
			variants: request.variants,
			quantity: request.quantity,
			storeCategories: request.storeCategories,
			shoppikCategories: request.shoppikCategories,
			rating: {
				score: 5,
				reviews: 0,
				sold: 0,
			},
			isDraft: request.isDraft,
			lastSavedAt: now,
			createdAt: now,
			DeletedAt: null,
			isDeleted: false,
		},
		include: true,
	});

	return { data: createdProduct };
};

const getStoreProducts = async (ctx: Context, request: GetStoreProductsRequest): Promise<GetStoreProductsResponse> => {
	const shoppikCategoryDb = ctx.prisma.product;

	let skip = 0;
	let limit = undefined;
	let sortBy = 'name';
	let sortOrder = 'asc';

	if (request.pagination) {
		skip = (request.pagination.page - 1) * request.pagination.pageSize;
		sortBy = request.pagination.sortBy;
		limit = request.pagination.pageSize;
		sortOrder = request.pagination.sort;
	}

	const products = await shoppikCategoryDb.findMany({
		skip: skip,
		take: limit,
		where: {
			storeId: ctx.user?.roleOwner.storeId,
		},
		orderBy: {
			[sortBy]: sortOrder,
		},
		include: true,
	});

	return products;
};

const getShoppikCategory = async (ctx: Context): Promise<GetShoppikCategoryResponse> => {
	const res: GetShoppikCategoryResponse = [];

	const rawData: any = await ctx.prisma.shoppikCategory.aggregateRaw({
		pipeline: [
			{
				$unwind: {
					path: '$parentId',
					preserveNullAndEmptyArrays: true,
				},
			},
		],
	});
	if (!rawData || !rawData.length) {
		return res;
	}

	for (let i = 0; i < rawData.length; i++) {
		const element = rawData[i];
		res.push({
			id: element._id.$oid,
			name: element.name,
			parentId: element.parentId,
			isSubCategory: element.isSubCategory,
		});
	}

	return res;
};

const getProductDetail = async (ctx: Context, request: GetProductDetailRequest): Promise<GetProductDetailResponse> => {
	const shoppikCategoryDb = ctx.prisma.product;

	const product = await shoppikCategoryDb.findUnique({
		where: {
			id: request.productId,
		},
		include: true,
	});

	return product;
};

const ProductRepo = Object.freeze({ createProduct, getProductDetail, getStoreProducts, getShoppikCategory });

export default ProductRepo;
