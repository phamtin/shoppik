export type AttributePattern = {
	k: string;
	v: string;
};

export type Pagination = {
	order: Order;
	page: number;
	pageSize: number;
	sortBy: string;
};

export type PaginationResponse = {
	total: number;
	totalPage: number;
};

export enum Order {
	ASC = 'ASC',
	DESC = 'DESC',
}
