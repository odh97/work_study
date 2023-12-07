"use client";

import { cn } from "@/app/lib/utills";
import React, { forwardRef, useState } from "react";
import { IconClose } from "@/app/assets/svg/svgList";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface ButtonPropsType {
  title?: string;
  list?: {
    children: React.ReactNode;
    onClick: () => void;
  }[];
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

/**
 * button<br/>
 * ref = {ref 정의}<br/>
 * title = {title 정의}<br/>
 * list = {list array 정의}<br/>
 * className = {스타일 정의}<br/>
 * disabled = {true}<br/>
 * == icon ==<br/>
 * dropDownIcon = {true}<br/>
 * */
function DropdownSmall(
  {
    className,
    disabled = false,
    title = "이름이 없습니다.",
    list,
  }: ButtonPropsType,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [imgAni, setImgAni] = useState(false);

  return (
    <div>
      <DropdownMenu.Root onOpenChange={() => setImgAni(!imgAni)}>
        <DropdownMenu.Trigger
          ref={ref}
          disabled={disabled}
          className={cn(
            "body-6 hover:bg-secondary-green flex items-center justify-center rounded-[9999px] px-[16px] pb-[6px] pt-[8px] disabled:opacity-20",
            "bg-primary text-grayscale-white focus:outline-0",
            className,
          )}
        >
          {title}
          <div
            className={
              imgAni
                ? "mb-[3px] ml-[3px] -rotate-180 select-none transition-all duration-300"
                : "mb-[3px] ml-[3px] select-none transition-all duration-300"
            }
          >
            <IconClose />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn(
              "bg-grayscale-white mt-[5px] overflow-y-hidden rounded-[10px] text-center shadow-2xl",
              "animate-[slideDownAndFade_0.6s_ease-in-out]",
            )}
          >
            {list !== undefined
              ? list.map(({ children, onClick }, index) => {
                  return (
                    <DropdownMenu.Item
                      key={index}
                      className={
                        "body-6 hover:bg-primary-light hover:text-grayscale-white cursor-pointer px-[20px] py-2 hover:outline-0"
                      }
                    >
                      <p onClick={onClick}>{children}</p>
                    </DropdownMenu.Item>
                  );
                })
              : null}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export default forwardRef(DropdownSmall);
