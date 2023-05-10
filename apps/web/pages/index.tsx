import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
import HomePage from "@/Modules/Home/Home";

export default function Page() {
  return null;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const session = await getServerSession(context.req, context.res, authOptions);
  const session = null;
  // if (!session) {
  //   return {
  //     redirect: { permanent: false, destination: "/signin" },
  //   };
  // }

  return {
    redirect: { permanent: false, destination: "/shoppik" },
  };
};
