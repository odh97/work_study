import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface ButtonPropsType {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  buttonState?: "pending" | "fulfilled" | "rejected";
}

/**
 * button<br/>
 * ref={ref 정의}<br/>
 * onClick={이벤트 정의}<br/>
 * className={스타일 정의}<br/>
 * disabled={true}<br/>
 * secondary={true}<br/>
 * buttonState={"pending" | "fulfilled" | "rejected"}<br/>
 * */
function ButtonSmallState(
  {
    type = "button",
    onClick,
    className,
    children,
    buttonState = "pending",
  }: ButtonPropsType,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <>
      <button
        type={type}
        ref={ref}
        onClick={onClick}
        data-state={buttonState}
        className={cn(
          "emphasis-5 block max-h-[31px] min-w-fit max-w-fit rounded-[6px] border border-grayscale-neutral px-[18px] pb-[6px] pt-[8px]",
          "data-[state=pending]:pointer-events-none data-[state=pending]:cursor-default",
          "data-[state=fulfilled]:border-secondary-green data-[state=fulfilled]:text-secondary-green",
          "data-[state=rejected]:pointer-events-none data-[state=rejected]:opacity-20",
          className,
        )}
      >
        {children}
      </button>
    </>
  );
}

export default forwardRef(ButtonSmallState);
