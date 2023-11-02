import { trpc } from '@/lib/trpc/trpc';
import { Customer, Owner } from '@shoppik/types';
import { useSession } from 'next-auth/react';

export type LoggedInUser = {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	fullname: string;
	avatar: string;
	roleCustomer: Customer;
	roleOwner?: Omit<Owner, 'storeId'> & { storeId: string };
};

export async function getSession() {
	return;
}

const useLoggedInUser = () => {
	const { data } = trpc.user.getMyProfile.useQuery(undefined, {
		// /**
		//  *  IMPORTANT: cacheTime, staleTime should be same with Token time-to-live
		//  */
		staleTime: 10 * 60 * 1000, //  10 minutes
		cacheTime: 10 * 60 * 1000, //  10 minutes

		/**
		 *  Try to keep output up to date
		 */
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
	const session = useSession();

	let loggedInUser: LoggedInUser = {
		id: '',
		email: '',
		firstname: '',
		lastname: '',
		avatar: '',
		fullname: '',
		roleCustomer: { trustscore: 0 },
		roleOwner: { storeId: '' },
	};

	if (!session?.data?.user?.email) {
		return loggedInUser;
	}

	if (data) {
		loggedInUser = {
			id: data._id?.toString() ?? '',
			email: data.email,
			firstname: data.firstname,
			fullname: data.fullname,
			avatar: data.avatar,
			lastname: data.lastname,
			roleCustomer: {
				...data.roleCustomer,
				updatedAt: data.roleCustomer.updatedAt
					? new Date(data.roleCustomer.updatedAt)
					: undefined,
			},
			roleOwner: { ...data.roleOwner, storeId: data.roleOwner?.storeId.toString() ?? '' },
		};
	}

	return loggedInUser;
};

export default useLoggedInUser;
