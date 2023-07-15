import slugify from 'slugify';
import { ObjectId } from 'bson';

import { CreateStoreRequest, GetMyStoreRequest, CreateStoreResponse, GetMyStoreResponse } from '../Router/routers/store.route';
import { Context } from '../Router/context';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	const db = ctx.prisma.store;

	const createdStore = await db.create({
		data: {
			name: request.name,
			tradeName: request.tradeName,
			storeAddress: request.storeAddress,
			slug: slugify(request.name),
			ownerId: new ObjectId().toString(),
			description: request.description,
			avatar: request.avatar,
			landingPageUrl: request.landingPageUrl,
			contact: request.contact,
			storeStatus: 'ACTIVE',
			rating: {
				score: 5,
				reviews: 0,
				responseTime: 99,
			},
			tags: [
				{
					name: 'Apple',
					slug: 'apple',
				},
			],
			isDeleted: false,
			createdAt: new Date(),
		},
	});

	return createdStore;
};

const getMyStore = async (ctx: Context, request: GetMyStoreRequest): Promise<GetMyStoreResponse> => {
	const storerepo = ctx.prisma.store;

	const store = await storerepo.findMany({
		where: {
			ownerId: request.storeId ?? ctx.user?.id,
		},
	});

	return { data: store };
};

const StoreRepo = Object.freeze({ createStore, getMyStore });

export default StoreRepo;
