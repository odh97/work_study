"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface radioBoxType {
  // default props
  list?: {
    id: string;
    text: string;
  }[];
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  defaultValue?: boolean;
  // state
  radioValue?: string;
  setRadioValue?: React.Dispatch<React.SetStateAction<string>>;
}
/**
 *   기본 옵션<br/>
 *   ref = {ref}<br/>
 *   list = object{id, text}<br/>
 *   className = {div 스타일 정의}<br/>
 *   disabled = {true}<br/>
 *   defaultValue = {true}<br/>
 *   <br/>
 *   // state <br/>
 *   radioValue = {string},
 *   setRadioValue = {string},
 * */

function RadioBox(
  {
    list,
    className,
    containerClassName,
    disabled = false,
    defaultValue = false,
    //event
    radioValue,
    setRadioValue,
  }: radioBoxType,
  ref: React.Ref<HTMLDivElement>,
) {
  const disabledStyle = disabled ? "opacity-20 pointer-events-none" : "";

  if (
    defaultValue === true &&
    list !== undefined &&
    setRadioValue !== undefined
  ) {
    setRadioValue(list[0].text);
  }
  return (
    <div
      ref={ref}
      className={cn("mx-auto flex items-center", className, disabledStyle)}
    >
      <RadioGroup.Root
        className={cn("RadioGroupRoot", containerClassName)}
        defaultValue={defaultValue ? radioValue : undefined}
        aria-label="View density"
      >
        {list !== undefined
          ? list.map(({ id, text }) => {
              return (
                <div
                  key={id}
                  className={cn("mb-2 flex items-start sm:items-center")}
                >
                  <RadioGroup.Item
                    className={cn("RadioGroupItem", "group")}
                    value={text}
                    id={id}
                    onClick={() => (setRadioValue ? setRadioValue(text) : null)}
                    checked={radioValue === text}
                  >
                    <div
                      className={cn(
                        "relative h-[26px] w-[26px] rounded-[9999px] border border-grayscale-neutral bg-grayscale-white group-hover:border-secondary-green ",
                        "group-data-[state=checked]:bg-secondary-green group-data-[state=checked]:text-grayscale-white",
                        "group-data-[state=checked]:hover:bg-secondary-green group-data-[state=checked]:hover:text-grayscale-white group-data-[state=checked]:focus:bg-secondary-green group-data-[state=checked]:focus:text-grayscale-white",
                        "group-data-[state=checked]:transition-all group-data-[state=checked]:duration-700",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-[6px] top-[6px] h-[12px] w-[12px] rounded-[9999px] bg-grayscale-neutral group-hover:bg-secondary-green",
                          "group-data-[state=checked]:bg-grayscale-white",
                          "group-data-[state=checked]:transition-all group-data-[state=checked]:duration-700",
                        )}
                      />
                    </div>
                  </RadioGroup.Item>
                  <label
                    className={cn(
                      "Label",
                      "body-4 ml-[10px] cursor-pointer text-grayscale-dark",
                    )}
                    htmlFor={id}
                  >
                    {text}
                  </label>
                </div>
              );
            })
          : null}
      </RadioGroup.Root>
    </div>
  );
}

export default forwardRef(RadioBox);
