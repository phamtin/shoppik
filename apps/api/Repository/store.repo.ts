import slugify from 'slugify';

import { CreateStoreRequest, CreateStoreResponse, GetMyStoreResponse } from '../Router/routers/store.route';
import { Context } from '../Router/context';
import { TRPCError } from '@trpc/server';
import { StoreAddress, StoreStatus } from '@prisma/client';

const createStore = async (ctx: Context, request: CreateStoreRequest): Promise<CreateStoreResponse> => {
	const db = ctx.prisma.store;

	if (!ctx.user?.id) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

	const fullStoreAddress: StoreAddress = {
		province: request.storeAddress.province,
		district: request.storeAddress.district,
		ward: request.storeAddress.ward,
		street: request.storeAddress.street,
		note: '',
	};

	const createdStore = await db.create({
		data: {
			name: request.name,
			ownerId: ctx.user.id,
			slug: slugify(request.name),
			tradeName: request.tradeName,
			description: request.description,
			storeAddress: fullStoreAddress,
			landingPageUrl: request.landingPageUrl,
			avatar: request.avatar,
			contact: request.contact,
			storeStatus: StoreStatus.ACTIVE,
			rating: {
				score: 5,
				reviews: 0,
				responseTime: 99,
			},
			tags: [{ name: 'Apple', slug: 'apple' }],
			createdAt: new Date(),
			isDeleted: false,
		},
	});

	return createdStore;
};

const getMyStore = async (ctx: Context): Promise<GetMyStoreResponse> => {
	const storerepo = ctx.prisma.store;

	const store = await storerepo.findFirst({
		where: {
			ownerId: ctx.user?.id,
		},
	});

	return { data: store };
};

const StoreRepo = Object.freeze({ createStore, getMyStore });

export default StoreRepo;
