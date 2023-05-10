import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export type Product = {
	name: string;
	price: number;
	storeId: typeof ObjectId;
};
