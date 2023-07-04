// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import StoreOverViewScreen from '@/Modules/Store/screen/StoreOverview/StoreOverview';
// import NotAuthenticated from '@/Components/NotAuthenticated/NotAuthenticated';

export default async function OverviewPage() {
	// const session = await getServerSession(authOptions);

	// if (!session) {
	// 	return <NotAuthenticated />;
	// }

	return <StoreOverViewScreen store="cc" />;
}
