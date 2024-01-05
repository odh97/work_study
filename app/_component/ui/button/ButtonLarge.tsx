import { cn } from "@/lib/utils";
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
 * 버튼 공통 컴포넌트<br/>
 * type={"submit"}<br/>
 * ref={"ref 정의"}<br/>
 * onClick={이벤트 정의}<br/>
 * className={"스타일 정의"}<br/>
 * disabled={true}<br/>
 * secondary={true}<br/>
 * */
function ButtonLargeCp(
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
        "body-3 h-[45px] max-h-[45px] w-full min-w-fit rounded-[9999px] bg-primary px-[30px] leading-[46px] text-grayscale-weak",
        "hover:bg-secondary-green focus:bg-secondary-green",
        "data-[second=true]:border data-[second=true]:border-primary data-[second=true]:bg-transparent data-[second=true]:text-primary data-[second=true]:hover:border-secondary-green data-[second=true]:hover:text-secondary-green data-[second=true]:focus:border-secondary-green data-[second=true]:focus:text-secondary-green",
        "whitespace-nowrap disabled:pointer-events-none disabled:opacity-20",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default forwardRef(ButtonLargeCp);
