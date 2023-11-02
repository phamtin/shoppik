import { ObjectId } from 'mongodb';

/**
 *  recursively map a type with ObjectId to string
 */
export type StringId<T> = T extends ObjectId
	? string
	: T extends Record<any, any>
	? {
			[K in keyof T]: StringId<T[K]>;
	  }
	: T;

export type FieldMask = string[];
