import { SigninPayload } from '../auth';

const loginApi = (data: SigninPayload): Promise<any> => {
	return new Promise((resolve, reject) => {
		resolve({
			...data,
			_id: '3465378683796458',
			role: 'host',
			firstname: 'Tin',
			lastname: 'Pham',
		});
	});
};

const authApi = {
	loginApi,
};

export default authApi;
