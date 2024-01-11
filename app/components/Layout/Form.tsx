import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
} & ComponentProps<"form">;

const Form = forwardRef<HTMLFormElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <form ref={ref} className={cn(`flex flex-col`, className)} {...props}>
        {children}
      </form>
    );
  },
);

Form.displayName = "Col";

export default Form;
