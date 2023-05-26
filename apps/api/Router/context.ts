import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export interface UserRequest {
	id?: string;
	name: string | string[];
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
	const user: UserRequest = {
		id: '1',
		name: 'tin' ?? 'anonymous',
	};
	return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
