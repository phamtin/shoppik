import { Types } from 'mongoose';
import { STATUS, UserEntity } from '../../Model/user/user.entity';
import { IUserRepo } from '../../Repository/user.repo';

export default function makeAuthService(UserRepo: IUserRepo) {
	async function signup(provider: 'google' | 'github') {
		// Validate parameters...
		// Create user...
		// Create user items...

		const payload2: UserEntity = {
			fullname: 'Tin Pham',
			status: STATUS.ACTIVE,
			entityId: new Types.ObjectId(),
			roleId: new Types.ObjectId(),
			managers: [new Types.ObjectId()],
		};

		const user = await UserRepo.create(payload2);

		return true;
	}

	async function signin(email: string) {
		// Validate parameters...
		// Create user...
		// Create user items...

		return true;
	}

	return Object.freeze({ signup, signin });
}
