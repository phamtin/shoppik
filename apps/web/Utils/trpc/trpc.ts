import { createTRPCReact, inferReactQueryProcedureOptions } from '@trpc/react-query';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../../../api/server';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const getBaseUrl = () => (typeof window !== 'undefined' ? '' : process.env.NEXTAUTH_URL);

export const trpc = createTRPCReact<AppRouter>({
	abortOnUnmount: true,
});
