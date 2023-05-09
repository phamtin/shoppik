import mongoose from 'mongoose';

import { Store, STATUS } from './store.entity';

const { ObjectId } = mongoose.Types;

const storeSchema = new mongoose.Schema<Store>(
	{
		name: { type: String, required: true },
		ownerId: { type: ObjectId, ref: 'User', required: true },
		status: { enum: Object.values(STATUS) },
		categories: [
			{
				type: ObjectId,
				ref: 'Token',
			},
		],
		deletedAt: { type: Date, default: undefined },
	},
	{ timestamps: true },
);

const Store = mongoose.model<Store>('Store', storeSchema);

export default Store;
