export interface DataType {
	gender?: string;
	name: {
		title?: string;
		first?: string;
		last?: string;
	};
	email?: string;
	picture: {
		large?: string;
		medium?: string;
		thumbnail?: string;
	};
	nat?: string;
	loading: boolean;
}
