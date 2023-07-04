import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { prisma as prismaAdapter } from '../Loaders/mongo';
import { deserializeUser } from './middleware';
import systemLog from '../Pkgs/systemLog';

export interface UserRequest {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	role: string[];
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
	console.log('req.headers.cookie', req.headers.cookie);
	let user: UserRequest | null = null;
	const prisma = prismaAdapter;

	if (req.url.includes('/trpc/auth.signin')) {
		return { req, res, user, systemLog, prisma };
	} else {
		user = deserializeUser({ req, res });
	}

	// user = {
	// 	id: '64931196cbd0a187d3beb4c7',
	// 	email: 'tinphamtp@gmail.com',
	// 	firstname: 'Tin',
	// 	lastname: 'Pham',
	// 	role: ['OWNER'],
	// };

	return { req, res, user, systemLog, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
