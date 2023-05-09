export type Entity = {
	manager: string;
	terminals: string[];
	status: STATUS;
	staffs: string[];
	deletedAt?: Date;
};

export enum STATUS {
	ACTIVE,
	INACTIVE,
}
