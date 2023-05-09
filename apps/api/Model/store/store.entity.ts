import { ObjectId } from 'mongoose';
import { Token } from '../token/token.entity';

export interface Store {
	ownerId: ObjectId;
	name: string;
	status: STATUS;
	categories: Token[];
	deletedAt: Date | undefined;
}

export enum STATUS {
	CREATED,
	DELETEED,
}
