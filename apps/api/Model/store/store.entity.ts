import { ObjectId } from 'mongoose';
import { Product } from '../product/product.entity';

export interface Store {
	ownerId: ObjectId;
	name: string;
	status: STATUS;
	products: Product[];
	deletedAt: Date | undefined;
}

export enum STATUS {
	ACTIVE,
	CLOSED,
	CREATED,
	DELETED,
}
