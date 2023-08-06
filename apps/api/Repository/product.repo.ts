import ObjectId from 'bson-objectid';
import slugify from 'slugify';

import { CreateProductRequest, CreateProductResponse } from 'Router/routers/product.route';
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

const ProductRepo = Object.freeze({ createProduct });

export default ProductRepo;
