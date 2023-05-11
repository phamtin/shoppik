import { useMutation } from '@tanstack/react-query';
import { updateUserProfileApi } from '../api/market.api';

export const useUpdateProfile = () => {
	return useMutation(updateUserProfileApi, {
		onSuccess: (data) => {},
		onError: (err: Error) => {},
	});
};
