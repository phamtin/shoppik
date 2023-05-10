import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export type Owner = {
	userId: typeof ObjectId;
	storeIds: string[];
	status: STATUS;
	deletedAt?: Date;
};

export enum STATUS {
	ACTIVE,
	INACTIVE,
}
