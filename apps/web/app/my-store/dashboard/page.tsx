import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import GlobalError from '@/app/error/Error';
import { TRPCError } from '@trpc/server';
import StoreDashboard from '@/Modules/Store/screen/StoreDashboard/StoreDashboard';

export const metadata = {
  title: 'My Store',
  description: 'My Store',
};

export default async function DashbpardPage() {
  const serverSession = await getServerSession(authOptions());

  if (!serverSession) {
    return <GlobalError error={new TRPCError({ code: 'UNAUTHORIZED' })} />;
  }

  return <StoreDashboard store="cc" />;
}
