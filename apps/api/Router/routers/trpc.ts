import { ObjectId } from 'mongodb';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { AccountCollection } from 'Loaders/database/mongoDB';
import { Context, UserRequest } from './context';
import { AccountSchema } from 'Repository/schemas';
import { StringId } from 'Pkgs/types/common.type';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

const checkUserLoggedIn = async (ctx: Context): Promise<{ err: TRPCError | null; res: StringId<AccountSchema> | null }> => {
	const dedicatedUser = await AccountCollection.aggregate<StringId<AccountSchema>>([
		{
			$match: {
				_id: new ObjectId(ctx.user._id),
			},
		},
		{
			$addFields: {
				_id: { $toString: '$_id' },
			},
		},
	]).toArray();

	const foundUser = dedicatedUser[0];

	if (!foundUser || !foundUser._id || !foundUser.email || (!foundUser.roleCustomer && !foundUser.roleOwner)) {
		ctx.systemLog.error('[isAuthed] Invalid credentials');
		return {
			err: new TRPCError({ code: 'UNAUTHORIZED' }),
			res: null,
		};
	}

	return { err: null, res: foundUser };
};

const isAuthed = t.middleware(async ({ next, ctx }) => {
	if (!ctx.user?._id) throw new TRPCError({ code: 'UNAUTHORIZED' });

	const { err, res } = await checkUserLoggedIn(ctx);
	if (err || !res) {
		throw err;
	}
	const user: UserRequest = {
		_id: new ObjectId(res._id),
		fullname: res.fullname,
		firstname: res.firstname,
		lastname: res.lastname,
		email: res.email,
		roleCustomer: {
			trustscore: res.roleCustomer.trustscore,
		},
		roleOwner: {
			storeId: new ObjectId(res.roleOwner?.storeId),
		},
	};

	return next({
		ctx: { user },
	});
});

const isOwner = t.middleware(async ({ next, ctx }) => {
	if (!ctx.user?._id) throw new TRPCError({ code: 'UNAUTHORIZED' });

	const { err, res } = await checkUserLoggedIn(ctx);
	if (err || !res) {
		throw err;
	}
	if (!res.roleOwner?.storeId) {
		throw new TRPCError({ code: 'FORBIDDEN' });
	}

	const user: UserRequest = {
		_id: new ObjectId(res._id),
		fullname: res.fullname,
		firstname: res.firstname,
		lastname: res.lastname,
		email: res.email,
		roleCustomer: {
			trustscore: res.roleCustomer.trustscore,
		},
		roleOwner: {
			storeId: new ObjectId(res.roleOwner?.storeId),
		},
	};

	return next({ ctx: { user } });
});

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(isAuthed);

export const isOwnerProcedure = t.procedure.use(isOwner);
