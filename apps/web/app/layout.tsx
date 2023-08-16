'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ConfigProvider, Layout } from '@shoppik/ui/components/Core';
import NavBar from '@/Components/Navbar/Navbar';

import EmptyState from '@/Components/EmptyState/EmptyState';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { trpc } from '@/lib/trpc/trpc';

import './globals.css';

const { Content } = Layout;

const customTheme = {
	borderRadius: 8,
	sizeStep: 4,
	sizeUnit: 4,
	colorPrimary: '#0b5dff',
	fontSize: 13.2,
	colorTextBase: '#181818',
};
const customThemeIPad = {
	borderRadius: 6,
	sizeStep: 4,
	sizeUnit: 3,
	fontSize: 12,
	colorPrimary: '#0b5dff',
	colorTextBase: '#181818',
};

const cc = { height: '100%', overflow: 'auto', backgroundColor: '#FFFFFF' };

export default trpc.withTRPC(function RootLayout({ children }: PropsWithChildren) {
	let theme = customTheme;

	const isIpad = useMediaQuery('(max-width: 991.8px)', true, {
		getInitialValueInEffect: false,
	});

	if (isIpad) theme = customThemeIPad;

	const renderEmptyIndicator = () => {
		return <EmptyState />;
	};

	return (
		<html lang="en">
			<body>
				<ConfigProvider theme={{ token: theme }} renderEmpty={renderEmptyIndicator}>
					<Layout style={{ height: '100vh' }}>
						<SessionProvider refetchOnWindowFocus={process.env.NODE_ENV === 'production'}>
							<Sidebar />

							<Layout style={cc}>
								<NavBar />
								<Content>{children}</Content>
							</Layout>
						</SessionProvider>
					</Layout>
				</ConfigProvider>
			</body>
		</html>
	);
});
