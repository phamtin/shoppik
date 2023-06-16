'use client';

import { PropsWithChildren } from 'react';
import { Nunito } from 'next/font/google';
import NavBar from '@/Components/Navbar/Navbar';
import { SessionProvider } from 'next-auth/react';

import EmptyState from '@/Components/EmptyState/EmptyState';
import { ConfigProvider, Layout } from 'ui/components/Core';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { trpc } from '@/lib/trpc/trpc';

const { Content } = Layout;

const customTheme = {
	borderRadius: 8,
	sizeStep: 4,
	sizeUnit: 4,
	colorPrimary: '#0b5dff',
	fontSize: 13.2,
};
const customThemeIPad = {
	borderRadius: 6,
	sizeStep: 4,
	sizeUnit: 3,
	fontSize: 12,
	colorPrimary: '#0b5dff',
};

const cc = { height: '100%', overflow: 'auto', backgroundColor: '#FFF' };
const font = Nunito({ subsets: ['latin'] });

export default trpc.withTRPC(function RootLayout({ children }: PropsWithChildren) {
	let theme = customTheme;

	const isIpad = useMediaQuery('(max-width: 991.8px)', true, {
		getInitialValueInEffect: false,
	});

	if (isIpad) theme = customThemeIPad;

	return (
		<html lang="en">
			<body className={font.className} style={{ margin: '0px' }}>
				<ConfigProvider theme={{ token: theme }} renderEmpty={() => <EmptyState />}>
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
