"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IconCheck } from "@/assets/svg/dynamic/svgList";

interface checkBoxType {
  // default props
  id?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // label
  labelToggle?: boolean;
  // event
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 *   기본 옵션<br/>
 *   ref = {ref}<br/>
 *   id (label, input) = {id}<br/>
 *   children = {children}<br/>
 *   className = {div 스타일 정의}<br/>
 *   disabled = {boolean}<br/>
 *   <br/>
 *   // label <br/>
 *   labelToggle = {boolean}<br/>
 *   // state <br/>
 *   checked = {boolean},
 *   setRadioValue = {boolean},
 * */
function CheckBox(
  {
    id,
    className,
    children,
    disabled = false,
    // label
    labelToggle = false,
    //event
    checked,
    setChecked,
  }: checkBoxType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      data-disabled={disabled}
      className={cn(
        "flex items-center",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-20",
        className,
      )}
    >
      <Checkbox.Root
        id={id}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "CheckboxRoot",
          "relative h-[26px] w-[26px] rounded-[6px] border border-grayscale-neutral text-grayscale-light hover:border-secondary-green hover:bg-grayscale-white hover:text-secondary-green focus:bg-grayscale-white",
          "data-[state=checked]:bg-secondary-green data-[state=checked]:text-grayscale-white data-[state=checked]:hover:bg-secondary-green data-[state=checked]:hover:text-grayscale-white data-[state=checked]:focus:bg-secondary-green data-[state=checked]:focus:text-grayscale-white",
        )}
        onClick={() => (setChecked ? setChecked(!checked) : null)}
      >
        <div className={"absolute left-[2px] top-[2px]"}>
          <IconCheck
            width={"20px"}
            height={"20px"}
            style={{ opacity: checked ? 0 : 1 }}
          />
        </div>
        <div className={"absolute left-[2px] top-[2px]"}>
          <IconCheck
            width={"20px"}
            height={"20px"}
            style={
              checked === false
                ? {
                    strokeDasharray: 60,
                    strokeDashoffset: -50,
                    transition: "all",
                    transitionDuration: "0s",
                  }
                : {
                    strokeDasharray: 30,
                    strokeDashoffset: 0,
                    transition: "all",
                    transitionDuration: "0.6s",
                  }
            }
          />
        </div>
      </Checkbox.Root>
      {labelToggle ? (
        <label
          className={cn(
            "Label",
            "body-4 ml-[13px] cursor-pointer text-grayscale-dark",
          )}
          htmlFor={id}
        >
          {children}
        </label>
      ) : null}
    </div>
  );
}

export default forwardRef(CheckBox);
