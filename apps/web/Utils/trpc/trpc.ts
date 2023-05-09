import { createTRPCReact } from "@trpc/react-query";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "../../../veneno/Router";

// infer the types for your router
// export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
// export type RouterInputs = inferRouterInputs<AppRouter>;
// export type RouterOutputs = inferRouterOutputs<AppRouter>;

const getBaseUrl = () =>
  typeof window !== "undefined" ? "" : process.env.NEXTAUTH_URL;

// export const trpc = createTRPCReact<AppRouter>();

export const trpc = createTRPCReact<AppRouter>({
  config() {
    return {
      abortOnUnmount: true,
    };
  },
});
