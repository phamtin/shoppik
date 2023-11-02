import { ObjectId } from 'mongodb';

export type ShoppikCategory = {
	_id: ObjectId;
	name: string;
	isSubCategory: boolean;
	parentId: ObjectId | null;
};
