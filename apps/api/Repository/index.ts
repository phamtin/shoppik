import UserModel from '../Model/account/account.model';

import makeUserDb from './user.repo';

const UserRepo = makeUserDb(UserModel);

export { UserRepo };
