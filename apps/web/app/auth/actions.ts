import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSession() {
	const serverSession = await getServerSession(authOptions);
	return serverSession;
}
