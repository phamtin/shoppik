import { z } from 'zod';

import { createStoreRequest } from '../../Router/routers/store.route';
import makeStoreRepo from '../../Repository/store.repo';
import { Context } from '../../Router/context';
import systemLog from '../../Pkgs/systemLog';

export default function makeProductService() {
	const storeRepo = makeStoreRepo();

	async function createStore(ctx: Context, request: z.infer<typeof createStoreRequest>) {
		systemLog.info('createStore - START');

		const newStore = await storeRepo.createStore(request);

		systemLog.info('createStore - END');

		return newStore;
	}

	return Object.freeze({ createStore });
}
