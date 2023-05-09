"use client";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CssVarsProvider, theme } from "ui";
import "./app-skeleton.css";

const PUBLIC_PAGE: Record<string, string> = { "/signin": "/signin" };
const s = { display: "flex" };

interface Props extends PropsWithChildren {
  session?: any;
}

const AppSkeleton = ({ children }: Props) => {
  // const { data: session } = useSession();
  const session: any = {};
  // console.log('session = ', session);

  const router = useRouter();
  const client = new QueryClient();

  useEffect(() => {
    session?.user ? renderRootLayout() : renderRootLayout();
  }, []);

  const renderRootLayout = () => {
    router.replace("/");
    return children;
  };

  const renderPublicPage = () => {
    router.replace("/signin");
    // return <SigninNextScreen
  };

  return (
    <div className="appSkeleton">
      <QueryClientProvider client={client}>
        {session?.user ? children : children}
      </QueryClientProvider>
    </div>
  );
};

export default AppSkeleton;
