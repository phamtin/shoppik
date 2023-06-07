import { UserRepo } from '../../Repository';

import makeUserService from './user.service';

const userService = makeUserService(UserRepo);

export default userService;
