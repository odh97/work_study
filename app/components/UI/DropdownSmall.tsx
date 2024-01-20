"use client";

import { cn } from "@/app/lib/utills";
import React, { forwardRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconDown } from "@/assets/svg/dynamic/svgList";

interface ButtonPropsType {
  ref?: React.Ref<HTMLButtonElement>;
  title?: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
  list?: string[];
  className?: string;
  disabled?: boolean;
}

/**
 * button<br/>
 * ref = {ref 정의}<br/>
 * title = {title 정의}<br/>
 * setTitle = {setTitle 정의}<br/>
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
    setTitle,
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
            "body-6 flex max-h-[31px] items-center justify-center rounded-[9999px] px-[16px] pb-[6px] pt-[8px] hover:bg-secondary-green",
            "bg-primary text-grayscale-white focus:outline-0",
            "disabled:pointer-events-none disabled:opacity-20",
            className,
          )}
        >
          <p className={"min-w-max"}>{title}</p>
          <div
            className={
              imgAni
                ? "mb-[3px] ml-[3px] -rotate-180 select-none transition-all duration-300"
                : "mb-[3px] ml-[3px] select-none transition-all duration-300"
            }
          >
            <IconDown />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn(
              "shadow-card mt-[5px] overflow-y-hidden rounded-[10px] bg-grayscale-white text-center",
              "animate-[slideDownAndFade_0.6s_ease-in-out]",
            )}
          >
            {list !== undefined
              ? list.map((value, index) => {
                  return (
                    <DropdownMenu.Item
                      key={index}
                      className={
                        "body-6 cursor-pointer px-[20px] py-2 hover:bg-primary-light hover:text-grayscale-white hover:outline-0"
                      }
                      onClick={() => (setTitle ? setTitle(value) : null)}
                    >
                      <p>{value}</p>
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
