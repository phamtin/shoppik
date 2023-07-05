'use client';

import { cookies } from 'next/headers';
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../../../api/server';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const getBaseUrl = () => {
	return process.env.NEXT_PUBLIC_API_URL;
};

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/trpc`,
					headers() {
						return {
							cookie: ctx?.req?.headers.cookie,
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
						retry: process.env.NODE_ENV !== 'development',
						refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
						refetchOnReconnect: process.env.NODE_ENV !== 'development',
						staleTime: 5 * 60 * 1000, //  5 minutes
					},
				},
			},
		};
	},
	ssr: true,
});
