import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { prisma as prismaAdapter } from '../Loaders/mongo';
import { deserializeUser } from './middleware';
import systemLog from '../Pkgs/systemLog';

export interface UserRequest {
	id: string;
	email: string;
	fullname: string;
	firstname: string;
	lastname: string;
	role: string[];
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
	let user: UserRequest | null = null;
	const prisma = prismaAdapter;

	if (req.url.includes('/trpc/auth.signin')) {
		return {
			req,
			res,
			user,
			systemLog,
			prisma,
		};
	}

	user = deserializeUser({ req, res });

	return { req, res, user, systemLog, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
