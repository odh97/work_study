import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Page = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <main
      ref={ref}
      className={cn(`flex min-h-screen flex-col items-center p-3`, className)}
    >
      {children}
    </main>
  );
});

Page.displayName = "Page";

export default Page;
