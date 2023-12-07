import { cn } from "@/app/lib/utills";
import React, { forwardRef } from "react";

interface ButtonPropsType {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  secondary?: boolean;
}

/**
 * button<br/>
 * ref={ref 정의}<br/>
 * onClick={이벤트 정의}<br/>
 * className={스타일 정의}<br/>
 * disabled={true}<br/>
 * secondary={true}<br/>
 * */
function ButtonSmallCp(
  {
    type = "button",
    onClick,
    className,
    children,
    disabled = false,
    secondary = false,
  }: ButtonPropsType,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      data-second={secondary}
      className={cn(
        "body-6 hover:bg-secondary-green focus:bg-secondary-green flex content-center items-center rounded-[9999px] px-[16px] pb-[6px] pt-[8px] disabled:opacity-20",
        "bg-primary text-grayscale-weak",
        "data-[second=true]:border-primary data-[second=true]:text-primary data-[second=true]:hover:border-secondary-green data-[second=true]:hover:text-secondary-green data-[second=true]:focus:border-secondary-green data-[second=true]:focus:text-secondary-green data-[second=true]:border data-[second=true]:bg-transparent",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default forwardRef(ButtonSmallCp);
