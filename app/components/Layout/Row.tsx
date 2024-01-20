import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/app/lib/utills";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
} & ComponentProps<"div">;

const Row = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(`flex`, className)} {...props}>
        {children}
      </div>
    );
  },
);

Row.displayName = "Row";

export default Row;
