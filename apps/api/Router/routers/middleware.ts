import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { decrypt, verifyJwt } from '../../Service/auth/auth.service';
import { UserRequest } from './context';
import { ObjectId } from 'mongodb';

export const deserializeUser = ({ req }: CreateFastifyContextOptions): UserRequest => {
	const notAuthenticated: UserRequest = {
		_id: new ObjectId('000000000000000000000000'),
		email: '',
		fullname: '',
		firstname: '',
		lastname: '',
		roleCustomer: { trustscore: 0 },
	};

	try {
		const encryptedJwt = req.headers['x-api'] as string;
		if (!encryptedJwt) {
			return notAuthenticated;
		}
		const decoded: UserRequest | null = verifyJwt(decrypt(encryptedJwt));

		if (!decoded || !decoded._id || !decoded.email || (!decoded.roleCustomer && !decoded.roleOwner)) {
			return notAuthenticated;
		}

		return {
			_id: decoded._id,
			email: decoded.email,
			fullname: decoded.fullname,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			roleOwner: decoded.roleOwner,
			roleCustomer: decoded.roleCustomer,
		};
	} catch (e) {
		return notAuthenticated;
	}
};
