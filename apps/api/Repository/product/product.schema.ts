import { ObjectId } from 'mongodb';
import { AttributePattern } from 'Repository/common.schema';
import { StoreTag } from 'Repository/store/store.schema';

export type ProductRating = {
	score: number;
	reviews: number;
	sold: number;
};

export type ProductSchema = {
	_id: ObjectId;
	storeId: ObjectId;
	name: string;
	slug: string;
	description?: string;
	keyFeatures: string[];
	images: string[];
	originPrice: number;
	quantity: number;
	rating: ProductRating;
	storeCategories: StoreTag[];
	shoppikCategories: ObjectId[];
	variants: AttributePattern[];
	detail: AttributePattern[];
	lastSavedAt: Date;
	isDraft: boolean;
	isDeleted?: boolean;
	createdAt: Date;
	deletedAt?: Date;
	updatedAt?: Date;
};
