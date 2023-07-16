import slugify from 'slugify';

import { CreateStoreRequest, GetMyStoreRequest, CreateStoreResponse, GetMyStoreResponse } from '../Router/routers/store.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';
import { StoreStatus } from '@prisma/client';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	const db = ctx.prisma.store;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const createdStore = await db.create({
		data: {
			name: request.name,
			ownerId: ctx.user.id,
			slug: slugify(request.name),
			tradeName: request.tradeName,
			description: request.description,
			storeAddress: request.storeAddress,
			landingPageUrl: request.landingPageUrl,
			avatar: request.avatar,
			contact: request.contact,
			storeStatus: StoreStatus.ACTIVE,
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
			createdAt: new Date(),
			isDeleted: false,
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
