import AddProduct from "@/Modules/Store/screen/AddProduct/AddProduct";
import GlobalError from "@/app/error/Error";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {TRPCError} from "@trpc/server";
import {getServerSession} from "next-auth";

export const metadata = {
  title: 'Add Product',
  description: 'Add Product',
};

export default async function OverviewPage() {
  const serverSession = await getServerSession(authOptions());

  if (!serverSession) {
    return <GlobalError error={new TRPCError({code: 'UNAUTHORIZED'})} />;
  }

  return <AddProduct />;
}