import UserModel from '../Model/user/user.model';

import makeUserDb from './user.repo';

const UserRepo = makeUserDb(UserModel);

export { UserRepo };
