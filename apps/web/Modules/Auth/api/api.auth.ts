import { AxiosResponse } from 'axios';

import { api } from '@/Api/api';
import { SigninPayload } from '../auth';

const loginApi = (data: SigninPayload): Promise<any> => {
	// const url = '/signin';
	// return api.post(url, data);

	return new Promise((resolve, reject) => {
		// setTimeout(() => {
		resolve({
			...data,
			_id: '3465378683796458',
			role: 'host',
			firstname: 'Tin',
			lastname: 'Pham',
		});
		// }, 1000);
	});
};

const logoutApi = (): Promise<AxiosResponse> => {
	return api.delete('/logout');
};

const authApi = {
	loginApi,
	logoutApi,
};

export default authApi;
