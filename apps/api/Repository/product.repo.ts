import ObjectId from 'bson-objectid';
import slugify from 'slugify';

import { CreateProductRequest, CreateProductResponse } from 'Router/routers/product.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	const productDb = ctx.prisma.product;
	const shoppikCategoryDb = ctx.prisma.shoppikCategory;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const shoppikCategoriesPromisor = request.shoppikCategories.map((id) =>
		shoppikCategoryDb.findUnique({
			where: {
				id: id,
			},
		}),
	);
	const shoppikCategories = await Promise.all(shoppikCategoriesPromisor);

	const shoppikCategoryIds: string[] = [];
	for (let i = 0; i < shoppikCategories.length; i++) {
		if (!shoppikCategories ?? !shoppikCategories.length ?? !shoppikCategories[i]) {
			continue;
		}
		shoppikCategoryIds.push(shoppikCategories[i]?.id ?? '');
	}

	const newId = ObjectId();
	const createdProduct = await productDb.create({
		data: {
			id: newId.id,
			name: request.name,
			storeId: ctx.user.roleOwner.storeId,
			slug: slugify(request.name + newId.id),
			description: request.description,
			keyFeatures: request.keyFeatures,
			images: request.images,
			originPrice: request.originPrice,
			quantity: request.quantity,
			storeCategories: request.storeCategories,
			shoppikCategories: shoppikCategoryIds,
			rating: {
				score: 5,
				reviews: 0,
				sold: 0,
			},
			isDraft: request.isDraft,
			createdAt: new Date(),
			isDeleted: false,
		},
	});

	return { data: createdProduct };
};

const ProductRepo = Object.freeze({ createProduct });

export default ProductRepo;
