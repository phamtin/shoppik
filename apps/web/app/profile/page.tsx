'server-only';

import { getServerSession } from 'next-auth';

import ProfileScreen from '@/Modules/Profile/screens/ProfileOverview/ProfileOverview';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import GlobalError from '../error/Error';
import { TRPCError } from '@trpc/server';

export const metadata = {
	title: 'Profile',
	description: 'Profile',
};

export default async function Page() {
	const session = await getServerSession(authOptions());

	if (!session) {
		return <GlobalError error={new TRPCError({ code: 'UNAUTHORIZED' })} />;
	}
	return <ProfileScreen />;
}
