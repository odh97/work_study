"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";
import * as Switch from "@radix-ui/react-switch";

interface radioBoxType {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "small" | "large";
  // state
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 *   기본 옵션<br/>
 *   ref = {ref}<br/>
 *   id = {id}<br/>
 *   className = {switch 스타일 정의}<br/>
 *   <br/>
 *   // state <br/>
 *   radioValue = {string},
 *   setRadioValue = {string},
 * */
function RadioBox(
  {
    id,
    className,
    children,
    size = "large",
    //event
    toggle,
    setToggle,
  }: radioBoxType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref}>
      <Switch.Root
        id={id}
        className={cn("flex items-center", className)}
        defaultChecked={toggle}
        onCheckedChange={() => (setToggle ? setToggle(!toggle) : null)}
      >
        <label
          htmlFor={id}
          className={cn(
            "Label",
            "body-4 mr-[10px] cursor-pointer text-grayscale-dark",
          )}
        >
          {children}
        </label>
        <div
          data-state={toggle ? "checked" : "unchecked"}
          data-size={size === "small" ? "small" : "large"}
          className={cn(
            "SwitchRoot",
            "relative h-[26px] w-[50px] cursor-pointer rounded-[9999px] bg-grayscale-neutral transition-all duration-300",
            "data-[size=small]:h-[16px] data-[size=small]:w-[30px]",
            "data-[state=checked]:bg-secondary-green",
          )}
        >
          <Switch.Thumb
            data-size={size === "small" ? "small" : "large"}
            className={cn(
              "absolute left-[3px] top-[3px] h-[20px] w-[20px] rounded-[9999px] bg-grayscale-weak transition-all duration-300",
              "data-[size=small]:left-[2px] data-[size=small]:top-[2px] data-[size=small]:h-[12px] data-[size=small]:w-[12px]",
              `data-[state=checked]:data-[size=large]:left-[27px] data-[state=checked]:data-[size=small]:left-[16px]`,
            )}
          />
        </div>
      </Switch.Root>
    </div>
  );
}

export default forwardRef(RadioBox);
