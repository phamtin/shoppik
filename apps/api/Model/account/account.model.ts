import mongoose, { Document } from 'mongoose';

import { UserEntity } from './account.entity';
import { STATUS } from '../owner/owner.entity';

const { ObjectId } = mongoose.Types;

export interface UserDoc extends UserEntity, Document {}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		roleId: { type: String, ref: 'Role', required: true },
		status: { enum: Object.values(STATUS) },
		managers: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		entityId: { type: ObjectId, ref: 'Entity', required: true },
		deletedAt: { type: Date, default: undefined },
	},
	{ timestamps: true },
);

const UserModel = mongoose.model<UserDoc>('User', userSchema);

export default UserModel;
