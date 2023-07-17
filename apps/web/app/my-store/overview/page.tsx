import { getServerSession } from 'next-auth';

import StoreOverViewScreen from '@/Modules/Store/screen/StoreOverview/StoreOverview';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import GlobalError from '@/app/error/Error';
import { TRPCError } from '@trpc/server';

export const metadata = {
	title: 'My Store',
	description: 'My Store',
};

export default async function OverviewPage() {
	const serverSession = await getServerSession(authOptions());

	if (!serverSession) {
		return <GlobalError error={new TRPCError({ code: 'UNAUTHORIZED' })} />;
	}

	return <StoreOverViewScreen store="cc" />;
}
