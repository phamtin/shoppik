import { useState } from "react";
import { AppProps } from "next/app";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ConfigProvider } from "ui/components/Core";
import EmptyState from "@/Components/EmptyState/EmptyState";
import RootLayout from "@/Layout/RootLayout/RootLayout";
import { trpc } from "@/Utils/trpc/trpc";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: "cc",
            };
          },
        }),
      ],
    })
  );

  return (
    <RootLayout>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{ token: { borderRadius: 8 } }}
            renderEmpty={() => <EmptyState />}
          >
            <Component {...pageProps} />
          </ConfigProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </RootLayout>
  );
}
