import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import mongo from '../Loaders/mongo';

export interface UserRequest {
	id?: string;
	name: string | string[];
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
	const user: UserRequest = {
		id: '1',
		name: 'tin' ?? 'anonymous',
	};
	const db = mongo;
	return { db, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
