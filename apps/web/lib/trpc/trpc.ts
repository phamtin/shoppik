import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { inferReactQueryProcedureOptions } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../../../api/server';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const getBaseUrl = () => {
	return process.env.NEXT_PUBLIC_API_URL;
};

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/trpc`,
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
	ssr: false,
});
