import mongoose from 'mongoose';

import { Entity, STATUS } from './entity.entity';

const { ObjectId } = mongoose.Types;

const EntitySchema = new mongoose.Schema<Entity>(
	{
		fullname: { type: String, required: true },
		roleId: { type: ObjectId, ref: 'Role', required: true },
		status: { enum: Object.values(STATUS) },
		managers: [
			{
				type: ObjectId,
				ref: 'Entity',
			},
		],
		entityId: { type: ObjectId, ref: 'Entity', required: true },
		deletedAt: { type: Date, default: undefined },
	},
	{ timestamps: true },
);

const Entity = mongoose.model<Entity>('Entity', EntitySchema);

export default Entity;
