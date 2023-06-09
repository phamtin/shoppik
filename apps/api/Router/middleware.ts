import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { decrypt, verifyJwt } from '../Service/auth/auth.service';
import { UserRequest } from './context';

export const deserializeUser = ({ req }: CreateFastifyContextOptions): UserRequest | null => {
	console.log('req.headers.cookie = ', req.headers.cookie);
	try {
		const encryptedJwt = req.headers['x-api'] as string;
		const notAuthenticated = null;

		if (!encryptedJwt) {
			return notAuthenticated;
		}
		const decoded: any = verifyJwt(decrypt(encryptedJwt));

		const parsedRoles = JSON.parse((decoded?.role as string) ?? '');

		if (!decoded || !decoded.id || !decoded.email || !decoded.role || parsedRoles.length === 0) {
			return notAuthenticated;
		}

		return {
			id: decoded.id,
			email: decoded.email,
			fullname: decoded.fullname,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			role: parsedRoles,
		};
	} catch (e) {
		return null;
	}
};
