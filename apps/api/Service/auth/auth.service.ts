import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Owner, Customer, SigninMethod } from 'Repository/schemas';
import { SigninRequest, SigninResponse } from 'Router/auth.route';
import { Context } from 'Router/routers/context';
import { AccountCollection } from 'Loaders/database/mongoDB';
import { ObjectId } from 'mongodb';

type AppJwtPayload = {
	name: string;
	given_name: string;
	family_name: string;
	locale: string;
};

type EncryptedJwtPayload = {
	_id: string;
	email: string;
	fullname: string;
	firstname: string;
	lastname: string;
	roleCustomer: Customer;
	roleOwner?: Owner;
};

const signinGoogle = async (ctx: Context, request: SigninRequest): Promise<SigninResponse> => {
	ctx.systemLog.info(`Signin Google email ${request.email} - START`);

	let res: SigninResponse = {
		_id: '',
		email: '',
		fullname: '',
		firstname: '',
		lastname: '',
		encryptedJwt: '',
		roleCustomer: { trustscore: 0 },
		roleOwner: null,
	};
	let createdId = '';

	//	Jwt payload returned from OAuth Provider
	const jwtPayload = jwt.decode(request.accessToken, { complete: true });

	if (!jwtPayload || !jwtPayload?.payload) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentails' });
	}

	const jwtPload = jwtPayload.payload as AppJwtPayload;

	const authenticatedUser = await AccountCollection.findOne({ email: request.email });

	const resRoleOwner = authenticatedUser?.roleOwner ? { ...authenticatedUser.roleOwner, storeId: authenticatedUser.roleOwner.storeId.toHexString() } : null;

	if (authenticatedUser?._id) {
		res = {
			encryptedJwt: '',
			_id: authenticatedUser._id.toString(),
			email: authenticatedUser.email,
			fullname: authenticatedUser.fullname,
			firstname: authenticatedUser.firstname,
			lastname: authenticatedUser.lastname,
			roleCustomer: {
				trustscore: authenticatedUser.roleCustomer.trustscore,
				updatedAt: authenticatedUser.roleCustomer.updatedAt,
			},
			roleOwner: resRoleOwner,
		};
	} else {
		const { acknowledged, insertedId } = await AccountCollection.insertOne({
			_id: new ObjectId(),
			email: request.email,
			fullname: jwtPload.name,
			firstname: jwtPload.given_name,
			lastname: jwtPload.family_name,
			locale: jwtPload.locale,
			phoneNumber: '',
			postalCode: '',
			birthday: '',
			avatar: request.avatar,
			signinMethod: SigninMethod.GOOGLE,
			isConfirm: false,
			isDeleted: false,
			createdAt: new Date(),
			roleCustomer: { trustscore: 0 },
		});
		if (!acknowledged) {
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
		}
		createdId = insertedId.toString();
	}

	const encryptedJwt = generateEncryptedJwt(
		{
			_id: authenticatedUser?._id.toString() ?? createdId,
			email: request.email,
			fullname: request.fullname,
			firstname: jwtPload.given_name,
			lastname: jwtPload.family_name,
			roleCustomer: authenticatedUser?.roleCustomer || { trustscore: 0 },
			roleOwner: authenticatedUser?.roleOwner,
		},
		'accessTokenPrivateKey',
		{ expiresIn: 60 * 60 * 6 }, //	6 hour
	);

	if (authenticatedUser?._id) {
		res = { ...res, encryptedJwt };
		return res;
	}

	res = {
		encryptedJwt,
		_id: createdId,
		email: request.email,
		fullname: jwtPload.name,
		firstname: jwtPload.given_name,
		lastname: jwtPload.family_name,
		roleCustomer: { trustscore: 0 },
		roleOwner: null,
	};

	ctx.systemLog.info(`Signin Google email ${request.email} - END`);

	return res;
};

export const generateEncryptedJwt = (payload: EncryptedJwtPayload, key: 'accessTokenPrivateKey', options: SignOptions = {}) => {
	const privateKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
	const jwtStr = jwt.sign(payload, privateKey, {
		...(options && options),
	});
	const encryptedJwt = encrypt(jwtStr, process.env.ACCESS_TOKEN_PRIVATE_KEY as string);
	return encryptedJwt;
};

export const verifyJwt = <T>(token: string): T | null => {
	try {
		const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii');
		return jwt.verify(token, publicKey) as T;
	} catch (error) {
		return null;
	}
};

export const encrypt = (plainText: string, eKey: string): string => {
	let m = crypto.createHash('md5');
	m.update(eKey);
	const key = m.digest('hex');
	m = crypto.createHash('md5');
	m.update(eKey + key);
	const iv = m.digest('hex');

	const data = Buffer.from(plainText, 'utf-8').toString('binary');
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0, 16));
	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');

	return Buffer.from(encrypted, 'binary').toString('base64');
};

export const decrypt = (text: string): string => {
	let m = crypto.createHash('md5');
	m.update(process.env.ACCESS_TOKEN_PRIVATE_KEY as string);
	const key = m.digest('hex');

	m = crypto.createHash('md5');
	m.update((process.env.ACCESS_TOKEN_PRIVATE_KEY as string) + key);
	const iv = m.digest('hex');
	const input = text.replace(/-/g, '+').replace(/_/g, '/');
	const edata = Buffer.from(input, 'base64').toString('binary');

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0, 16));
	let decrypted = decipher.update(edata, 'hex', 'utf8');
	decrypted += decipher.final('utf8');

	return Buffer.from(decrypted, 'binary').toString('utf8');
};

const AuthService = {
	signinGoogle,
};

export default AuthService;
