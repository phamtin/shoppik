import { PrismaClient, StoreStatus } from '@prisma/client';
import { createStoreRequest } from '../Router/routers/store.route';
import { ObjectId } from 'bson';
import slugify from 'slugify';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStoreRepo = () => {
	const StorePrisma = new PrismaClient().store;

	return Object.freeze({
		...StorePrisma,

		createStore: async (request: z.infer<typeof createStoreRequest>) => {
			const store = await StorePrisma.create({
				data: {
					name: request.name,
					tradeName: request.tradeName,
					slug: slugify(request.name),
					ownerId: new ObjectId().toString(),
					description: request.description,
					avatar: request.avatar,
					landingPageUrl: request.landingPageUrl,
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
					isDeleted: false,
					createdAt: new Date(),
				},
			});

			return store;
		},
	});
};

export default makeStoreRepo;
