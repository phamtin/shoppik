import slugify from 'slugify';
import ObjectId from 'bson-objectid';

import { CreateProductRequest, CreateProductResponse, GetShoppikCategoryResponse, GetStoreProductsRequest, GetStoreProductsResponse } from 'Router/routers/product.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	const productDb = ctx.prisma.product;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const now = new Date();
	const newId = ObjectId();

	const createdProduct = await productDb.create({
		data: {
			id: newId.id,
			name: request.name,
			slug: slugify(request.name + newId.id),
			storeId: ctx.user.roleOwner.storeId,
			description: request.description,
			keyFeatures: request.keyFeatures,
			images: request.images,
			originPrice: request.originPrice,
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
			isDeleted: false,
		},
	});

	return { data: createdProduct };
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

const getStoreProducts = async (ctx: Context, request: GetStoreProductsRequest): Promise<GetStoreProductsResponse> => {
	const shoppikCategoryDb = ctx.prisma.product;

	const skip = (request.pagination.page - 1) * request.pagination.pageSize;
	const limit = request.pagination.pageSize;

	const products = await shoppikCategoryDb.findMany({
		skip: skip,
		take: limit,
		where: {
			storeId: ctx.user?.roleOwner.storeId,
			OR: [
				{
					name: { contains: request.query },
				},

				{
					description: { contains: request.query },
				},
			],
		},
		orderBy: {
			[request.pagination.sortBy]: request.pagination.sort,
		},
		include: true,
	});

	return products;
};

const ProductRepo = Object.freeze({ createProduct, getStoreProducts, getShoppikCategory });

export default ProductRepo;
