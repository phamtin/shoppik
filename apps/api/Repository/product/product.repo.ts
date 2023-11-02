import { Document, ObjectId } from 'mongodb';
import slugify from 'slugify';
import { Order } from '@shoppik/types';
import {
	CreateProductRequest,
	CreateProductResponse,
	GetProductDetailRequest,
	GetProductDetailResponse,
	GetShoppikCategoryResponse,
	GetStoreProductsRequest,
	GetStoreProductsResponse,
} from 'Router/product.route';
import { Context } from 'Router/routers/context';
import { TRPCError } from '@trpc/server';
import { ProductSchema } from './product.schema';
import { ProductCollection, ShoppikCategoryCollection } from 'Loaders/database/mongoDB';

const createProduct = async (ctx: Context, request: CreateProductRequest): Promise<CreateProductResponse> => {
	if (!ctx.user.roleOwner) throw new TRPCError({ code: 'BAD_REQUEST' });

	const now = new Date();
	const newId = new ObjectId();

	const doc: ProductSchema = {
		_id: newId,
		name: request.name,
		slug: slugify(request.name + '-' + now.getTime().toString()),
		storeId: new ObjectId(ctx.user.roleOwner.storeId),
		description: request.description,
		keyFeatures: request.keyFeatures,
		originPrice: request.originPrice,
		detail: request.detail,
		images: request.images,
		quantity: request.quantity,
		variants: request.variants,
		storeCategories: request.storeCategories.map((c) => ({ ...c, _id: new ObjectId(c._id) })),
		shoppikCategories: request.shoppikCategories.map((s) => new ObjectId(s)),
		isDraft: request.isDraft,
		rating: { score: 5, reviews: 0, sold: 0 },
		lastSavedAt: now,
		createdAt: now,
	};

	const { insertedId } = await ProductCollection.insertOne(doc);

	return {
		data: {
			...doc,
			_id: insertedId.toHexString(),
			storeId: ctx.user.roleOwner.storeId.toHexString(),
			storeCategories: request.storeCategories,
			shoppikCategories: request.shoppikCategories,
		},
	};
};

const getOverviewProductList = async (ctx: Context, request: GetStoreProductsRequest): Promise<GetStoreProductsResponse> => {
	if (!ctx.user.roleOwner) throw new TRPCError({ code: 'BAD_REQUEST' });

	const pipeline: Document[] = [
		{
			$match: {
				storeId: new ObjectId(ctx.user.roleOwner.storeId),
			},
		},
		{
			$project: { _id: 1, name: 1, slug: 1, images: 1, quantity: 1 },
		},
	];
	if (!request.pagination) {
		const products = (await ProductCollection.aggregate(pipeline).toArray()) as GetStoreProductsResponse['products'];
		return {
			products,
		};
	}

	const { pagination } = request;
	const sortBy = request.pagination.sortBy ?? '';

	pipeline.concat([
		{
			$sort: { [sortBy]: pagination.order === Order.ASC ? 1 : -1 },
		},
		{
			$skip: (pagination.page - 1) * pagination.pageSize,
		},
		{
			$limit: pagination.pageSize,
		},
	]);
	const products = ProductCollection.aggregate(pipeline).toArray() as Promise<GetStoreProductsResponse['products']>;

	const total = ProductCollection.countDocuments({
		storeId: ctx.user.roleOwner.storeId,
	});
	const [count, data] = await Promise.all([total, products]);

	return {
		products: data,
		total: count,
	};
};

const getShoppikCategory = async (): Promise<GetShoppikCategoryResponse> => {
	const categories = (await ShoppikCategoryCollection.aggregate([
		{
			$unwind: {
				path: '$parentId',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$addFields: {
				_id: { $toString: '$_id' },
				parentId: { $toString: '$parentId' },
			},
		},
	]).toArray()) as GetShoppikCategoryResponse['data'];

	return { data: categories };
};

const getProductDetail = async (ctx: Context, request: GetProductDetailRequest): Promise<GetProductDetailResponse> => {
	const res = await ProductCollection.findOne({
		_id: new ObjectId(request._id),
	});
	if (!res) return { product: null };

	return {
		product: {
			...res,
			_id: res._id.toHexString(),
			storeId: res.storeId.toHexString(),
			storeCategories: res.storeCategories.map((c) => ({ ...c, _id: c._id.toHexString() })),
			shoppikCategories: res.shoppikCategories.map((s) => s.toHexString()),
		},
	};
};

const ProductRepo = { createProduct, getOverviewProductList, getShoppikCategory, getProductDetail };

export default ProductRepo;
