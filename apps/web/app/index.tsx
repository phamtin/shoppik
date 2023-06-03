export default function Page() {
	return null;
}

export const getServerSideProps = async () => {
	return {
		redirect: { permanent: false, destination: '/shoppik' },
	};
};
