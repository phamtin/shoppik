import NotAuthenticated from '@/Components/NotAuthenticated/NotAuthenticated';
import ProfileScreen from '@/Modules/Profile/screens/ProfileOverview/ProfileOverview';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Page() {
	const session = await getServerSession(authOptions());

	if (!session) {
		console.log('[ProfileScreen] Session Expired in Server Component');
		return <NotAuthenticated />;
	}
	return <ProfileScreen />;
}
