import mongoose from 'mongoose';

import { Owner, STATUS } from './owner.entity';

const { ObjectId } = mongoose.Types;

const OwnerSchema = new mongoose.Schema<Owner>(
	{
		userId: { type: ObjectId, ref: 'User', required: true },
		status: {
			default: STATUS.ACTIVE,
			required: true,
		},
		deletedAt: { type: Date, default: undefined },
	},
	{ timestamps: true },
);

const Owner = mongoose.model<Owner>('Owner', OwnerSchema);

export default Owner;
