"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";

const config = {
  defaultOptions: {
    mutations: {
      retry: (failureCount: number, error: any) => {
        // 최대 2번까지 재시도하며, 인증에러일경우에만 재시도
        return failureCount <= 2 && error?.cause?.status === 401;
      },
    },
  },
};

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  initData?: any;
};

function QueryProvider({ children, initData, ...props }: Props) {
  const queryClient = new QueryClient(config);
  const { initUser } = useUserStore();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (initData) {
      initUser(initData);
    }
    setInit(true);
  }, []);

  return (
    <QueryClientProvider {...props} client={queryClient}>
      {init && children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
