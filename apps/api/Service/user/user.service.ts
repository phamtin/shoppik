import { IUserRepo } from '../../Repository/user.repo';

export default function makeUserService(UserRepo: IUserRepo) {
	async function signup(provider: 'google' | 'github') {
		// Validate parameters...
		// Create user...
		// Create user items...

		const user = await UserRepo.checkUserPriority('asd');

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
