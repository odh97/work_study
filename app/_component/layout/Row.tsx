import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Row = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={cn(`flex`, className)}>
      {children}
    </div>
  );
});

Row.displayName = "Row";

export default Row;
