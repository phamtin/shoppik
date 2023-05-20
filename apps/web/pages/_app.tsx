import { useState } from 'react';
import { AppProps } from 'next/app';
import { httpBatchLink, httpLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmptyState from '@/Components/EmptyState/EmptyState';
import RootLayout from '@/Layout/RootLayout/RootLayout';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import { ConfigProvider } from 'ui/components/Core';
import { useOs } from '@/Hooks/useUserAgent';
import { trpc } from '@/Utils/trpc/trpc';

import '@/styles/globals.css';

const customTheme = {
	borderRadius: 8,
	wireframe: false,
	sizeStep: 4,
	sizeUnit: 4,
	fontSize: 13.2,
};
const customThemeIPad = {
	borderRadius: 6,
	wireframe: false,
	sizeStep: 3,
	sizeUnit: 4,
	fontSize: 10,
};

export default function App({ Component, pageProps }: AppProps) {
	const ua = useOs();
	let theme = customTheme;

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				staleTime: 5 * 60 * 1000, //  5 minutes
			},
		},
	});

	const trpcClient = trpc.createClient({
		links: [
			httpLink({
				url: 'http://localhost:8000/trpc',
			}),
		],
	});

	const isIpad = useMediaQuery('(max-width: 1180px)', true, {
		getInitialValueInEffect: false,
	});
	console.log({ isIpad, ua });

	if (ua == 'ios' && isIpad) {
		theme = customThemeIPad;
	}

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<RootLayout>
				<QueryClientProvider client={queryClient}>
					<ConfigProvider theme={{ token: theme }} renderEmpty={() => <EmptyState />}>
						<Component {...pageProps} />
					</ConfigProvider>
				</QueryClientProvider>
			</RootLayout>
		</trpc.Provider>
	);
}
