import { UserRepo } from '../../Repository';
import makeAuthService from './auth.service';

const authService = makeAuthService(UserRepo);

export default authService;
