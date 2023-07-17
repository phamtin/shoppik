import { trpc } from '@/lib/trpc/trpc';
import { Customer, Owner } from '@shoppik/schema';
import { useSession } from 'next-auth/react';

export type LoggedInUser = {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	fullname: string;
	roleCustomer: Omit<Customer, 'updatedAt'>;
	roleOwner: Omit<Owner, 'updatedAt'> | null;
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
		fullname: '',
		roleCustomer: { trustscore: 0 },
		roleOwner: null,
	};

	if (!session?.data?.user?.email) {
		return loggedInUser;
	}

	if (data) {
		loggedInUser = {
			id: data.id,
			email: data.email,
			firstname: data.firstname,
			fullname: data.fullname,
			lastname: data.lastname,
			roleCustomer: data.roleCustomer,
			roleOwner: data.roleOwner,
		};
	}

	return loggedInUser;
};

export default useLoggedInUser;
