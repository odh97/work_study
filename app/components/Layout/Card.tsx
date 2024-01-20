import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  isShadow?: boolean;
  className?: string;
};

const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className, isShadow = true }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `flex w-full flex-col rounded-[0.625rem] border border-grayscale-light bg-grayscale-white`,
          className,
          isShadow ? "shadow-card" : "",
        )}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
