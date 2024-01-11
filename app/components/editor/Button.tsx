"use client";
import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
} & ComponentProps<"button">;
export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(``, className)} {...props}>
      {children}
    </button>
  );
};
