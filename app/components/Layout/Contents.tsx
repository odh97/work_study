import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Contents = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <section ref={ref} className={cn(``, className)}>
      {children}
    </section>
  );
});

Contents.displayName = "Contents";

export default Contents;
