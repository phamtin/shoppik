import { getServerSession } from 'next-auth';

import StoreOverViewScreen from '@/Modules/Store/screen/StoreOverview/StoreOverview';
import NotAuthenticated from '@/Components/NotAuthenticated/NotAuthenticated';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function OverviewPage() {
	const serverSession = await getServerSession(authOptions());

	if (!serverSession) {
		console.log('[StoreOverViewScreen] Session Expired in Server Component');
		return <NotAuthenticated />;
	}

	return <StoreOverViewScreen store="cc" />;
}
