import { Model } from 'mongoose';

import { UserDoc } from '../Model/user/user.model';
import makeBaseRepo from './base';

const checkUserPriority = async (id?: string): Promise<boolean> => {
	if (!id) {
		return false;
	}
	return true;
};

const toVerifiedUser = async (id?: string): Promise<string> => {
	if (await checkUserPriority(id)) {
		return 'success';
	}
	return 'try again';
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const makeUserRepo = (UserModel: Model<UserDoc>) =>
	Object.freeze({
		toVerifiedUser,
		checkUserPriority,
		...makeBaseRepo(UserModel),
	});

export type IUserRepo = ReturnType<typeof makeUserRepo>;

export default makeUserRepo;
