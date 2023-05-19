import { useState } from 'react';
import { AppProps } from 'next/app';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ConfigProvider } from 'ui/components/Core';
import EmptyState from '@/Components/EmptyState/EmptyState';

import RootLayout from '@/Layout/RootLayout/RootLayout';
import { trpc } from '@/Utils/trpc/trpc';
import '@/styles/globals.css';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import { useOs } from '@/Hooks/useUserAgent';

const customTheme = {
	borderRadius: 8,
	wireframe: false,
	sizeStep: 4,
	sizeUnit: 4,
	fontSize: 13.4,
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

	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:8000/trpc',
					async headers() {
						return { authorization: 'API' };
					},
				}),
			],
		}),
	);

	const isIpad = useMediaQuery('(max-width: 1180px)', true, {
		getInitialValueInEffect: false,
	});
	console.log({ isIpad, ua });

	if (ua == 'ios' && isIpad) {
		theme = customThemeIPad;
	}

	return (
		<RootLayout>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<ConfigProvider theme={{ token: theme }} renderEmpty={() => <EmptyState />}>
						<Component {...pageProps} />
					</ConfigProvider>
				</QueryClientProvider>
			</trpc.Provider>
		</RootLayout>
	);
}
