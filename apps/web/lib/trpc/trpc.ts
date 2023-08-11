'use client';

import { getCookie } from 'cookies-next';
import superjson from 'superjson';

import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../../../api/server';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const getBaseUrl = () => {
	return process.env.NEXT_PUBLIC_API_URL;
};

export function getToken() {
	const token = getCookie('accessToken');
	return token?.toString();
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			// transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/trpc`,
					headers: () => {
						return {
							'x-api': getToken(),
						};
					},
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: 'include',
						});
					},
				}),
			],
			queryClientConfig: {
				defaultOptions: {
					queries: {
						retry: true,
						refetchOnWindowFocus: true,
						refetchOnReconnect: true,
						staleTime: 5 * 60 * 1000, //  5 minutes
					},
				},
			},
		};
	},
	ssr: true,
});
