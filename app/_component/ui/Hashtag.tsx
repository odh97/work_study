import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import DownDarkSvg from "../../assets/svg/dynamic/IconClose";

interface hashtagPropsType {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  deleteIcon?: boolean;
  onClick?: () => void;
}

/**
 * div<br/>
 * ref={ref 정의}<br/>
 * className={스타일 정의}<br/>
 * children={children 정의}<br/>
 * disabled={true}<br/>
 * deleteIcon={true}<br/>
 * onClick={이벤트 정의}<br/>
 * */

function Hashtag(
  {
    className,
    children,
    disabled = false,
    deleteIcon = false,
    onClick,
  }: hashtagPropsType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      data-disabled={disabled}
      className={cn(
        "emphasis-5 box-border flex max-h-[29px] w-fit items-center rounded-[9999px] border border-grayscale-neutral px-[13px] pb-[6px] pt-[8px]",
        "hover:border-secondary-green hover:text-secondary-green focus:border-secondary-green focus:text-secondary-green",
        "cursor-pointer select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-20",
        className,
      )}
    >
      <div className={"min-w-max"}>{children}</div>
      {deleteIcon ? (
        <div
          className={
            "fill-current fill-current ml-[5px] translate-y-[-1px] cursor-pointer hover:text-secondary-green"
          }
        >
          <DownDarkSvg />
        </div>
      ) : null}
    </div>
  );
}

export default forwardRef(Hashtag);
