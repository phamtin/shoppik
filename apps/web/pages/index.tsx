// import { authOptions } from "./api/auth/[...nextauth]";

export default function Page() {
	return null;
}

export const getServerSideProps = async () => {
	// const session = await getServerSession(context.req, context.res, authOptions);
	// const session = null;
	// if (!session) {
	//   return {
	//     redirect: { permanent: false, destination: "/signin" },
	//   };
	// }

	return {
		redirect: { permanent: false, destination: '/shoppik' },
	};
};
