import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { decrypt, verifyJwt } from '../Service/auth/auth.service';
import { UserRequest } from './context';

export const deserializeUser = ({ req }: CreateFastifyContextOptions): UserRequest | null => {
	try {
		const encryptedJwt = req.headers['x-api'] as string;
		const notAuthenticated = null;

		if (!encryptedJwt) {
			return notAuthenticated;
		}
		const decoded: UserRequest = verifyJwt(decrypt(encryptedJwt));

		if (!decoded || !decoded.id || !decoded.email || (!decoded.roleCustomer && !decoded.roleOwner)) {
			return notAuthenticated;
		}

		return {
			id: decoded.id,
			email: decoded.email,
			fullname: decoded.fullname,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			roleOwner: decoded.roleOwner,
			roleCustomer: decoded.roleCustomer,
		};
	} catch (e) {
		return null;
	}
};
