import { ObjectId } from 'mongodb';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { Customer, Owner } from 'Repository/schemas';
import systemLog from 'Pkgs/systemLog';

import { deserializeUser } from './middleware';

export type UserRequest = {
	_id: ObjectId;
	email: string;
	fullname: string;
	firstname: string;
	lastname: string;
	roleCustomer: Customer;
	roleOwner?: Owner;
};

export function createContext({ req, res }: CreateFastifyContextOptions) {
	let user: UserRequest = {
		_id: new ObjectId('000000000000000000000000'),
		email: '',
		fullname: '',
		firstname: '',
		lastname: '',
		roleCustomer: { trustscore: 0 },
	};

	if (req.url.includes('/trpc/auth.signin')) {
		return { req, res, user, systemLog };
	}

	user = deserializeUser({ req, res });

	return { req, res, user, systemLog };
}

export type Context = inferAsyncReturnType<typeof createContext>;
