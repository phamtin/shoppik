import { PropsWithChildren, useCallback, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import './app-skeleton.css';

// const PUBLIC_PAGE: Record<string, string> = { "/signin": "/signin" };
// const s = { display: "flex" };

interface Props extends PropsWithChildren {
	session?: any;
}

const AppSkeleton = ({ children }: Props) => {
	// const { data: session } = useSession();
	const session: any = {};
	// console.log('session = ', session);

	const router = useRouter();
	const client = new QueryClient();
	const renderRootLayout = useCallback(() => {
		router.replace('/');
		return children;
	}, [children, router]);

	useEffect(() => {
		session?.user ? renderRootLayout() : renderRootLayout();
	}, [renderRootLayout, session?.user]);

	// const renderPublicPage = () => {
	//   router.replace("/signin");
	//   // return <SigninNextScreen
	// };

	return (
		<div className="appSkeleton">
			<QueryClientProvider client={client}>
				{session?.user ? children : children}
			</QueryClientProvider>
		</div>
	);
};

export default AppSkeleton;
