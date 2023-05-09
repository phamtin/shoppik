import { SchemaDefinitionProperty, Types } from 'mongoose';

export enum STATUS {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export interface UserEntity {
	roleId: SchemaDefinitionProperty<Types.ObjectId>;
	fullname: string;
	status: STATUS;
	managers: SchemaDefinitionProperty<Types.ObjectId[]>;
	entityId: SchemaDefinitionProperty<Types.ObjectId>;
	deletedAt?: Date;
}
