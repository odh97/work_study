import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Page = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <div
      ref={ref}
      className={cn(`relative flex flex-col items-center`, className)}
    >
      {children}
    </div>
  );
});

Page.displayName = "Page";

export default Page;
