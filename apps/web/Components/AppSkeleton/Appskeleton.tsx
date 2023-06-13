'use client';

import { PropsWithChildren } from 'react';

import { ConfigProvider } from 'ui/components/Core';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import EmptyState from '../EmptyState/EmptyState';

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

type AppSkeletonProps = PropsWithChildren;

const AppSkeleton = ({ children }: AppSkeletonProps) => {
	let theme = customTheme;

	const isIpad = useMediaQuery('(max-width: 991.8px)', true, {
		getInitialValueInEffect: false,
	});

	if (isIpad) theme = customThemeIPad;

	return (
		<ConfigProvider theme={{ token: theme }} renderEmpty={() => <EmptyState />}>
			{children}
		</ConfigProvider>
	);
};

export default AppSkeleton;
