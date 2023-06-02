import { AppProps } from 'next/app';

import { ConfigProvider } from 'ui/components/Core';
import EmptyState from '@/Components/EmptyState/EmptyState';
import RootLayout from '@/Layout/RootLayout/RootLayout';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import { useOs } from '@/Hooks/useUserAgent';
import { trpc } from '@/lib/trpc/trpc';

import '@/styles/globals.css';

const customTheme = {
	borderRadius: 8,
	wireframe: false,
	sizeStep: 4,
	sizeUnit: 4,
	colorPrimary: '#0659ff',

	fontSize: 13.2,
};
const customThemeIPad = {
	borderRadius: 6,
	wireframe: false,
	sizeStep: 3,
	sizeUnit: 4,
	fontSize: 12,
	colorPrimary: '#0659ff',
};

export default trpc.withTRPC(function App({ Component, pageProps }: AppProps) {
	const ua = useOs();
	let theme = customTheme;

	const isIpad = useMediaQuery('(max-width: 1180px)', true, {
		getInitialValueInEffect: false,
	});
	// console.log({ isIpad, ua });

	if (ua === 'ios' && isIpad) {
		theme = customThemeIPad;
	}

	return (
		<RootLayout>
			<ConfigProvider theme={{ token: theme }} renderEmpty={() => <EmptyState />}>
				<Component {...pageProps} />
			</ConfigProvider>
		</RootLayout>
	);
});
