import { useMutation } from '@tanstack/react-query';
import authApi from '../api/api.auth';

export const useSignin = (): any => {
	return useMutation(authApi.loginApi, {
		onSuccess: async (data: any) => {
			return data;
		},
		onError: (err: Error) => {},
	});
};
