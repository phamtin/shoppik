import { Types } from 'mongoose';
import { z } from 'zod';
import { Context } from '../../Router/context';

import { STORE_STATUS, Store } from '../../Model/store/store.entity';
import { createStoreRequest } from '../../Router/routers/store.route';
import makeStoreRepo from '../../Repository/store.repo';
import systemLog from '../../Pkgs/systemLog';
import slugify from 'slugify';

export default function makeProductService() {
	const storeRepo = makeStoreRepo();

	async function createStore(ctx: Context, request: z.infer<typeof createStoreRequest>): Promise<Store> {
		systemLog.info('getMyStore - START');

		const store = await storeRepo.create({
			name: request.name,
			tradeName: request.tradeName,
			slug: slugify(request.name),
			description: request.description,
			followers: [],
			following: [],
			tags: request.tags,
			ownerId: new Types.ObjectId(),
			avatar: request.avatar,
			landingPageUrl: request.avatar,
			rating: {
				store: 5,
				reviews: 0,
				responseTime: 99,
			},
			contact: {
				phone: request.contact.phone,
				youtubeLink: request.contact.youtubeLink,
				facebookLink: request.contact.facebookLink,
				instagramLink: request.contact.instagramLink,
			},
			storeStatus: STORE_STATUS.ACTIVE,
		});

		systemLog.info('getMyStore - SUCCESS');
		return store;
	}

	return Object.freeze({ createStore });
}
