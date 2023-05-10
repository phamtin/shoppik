import { SchemaDefinitionProperty, Types } from 'mongoose';

export enum STATUS {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export type UserEntity = {
	roleId: SchemaDefinitionProperty<Types.ObjectId>;
	firstname: string;
	lastname: string;
	status: STATUS;
	managers: SchemaDefinitionProperty<Types.ObjectId[]>;
	entityId: SchemaDefinitionProperty<Types.ObjectId>;
	deletedAt?: Date;
};
