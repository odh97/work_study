"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface radioBoxType {
  // default props
  list?: {
    id: string;
    text: string;
  }[];
  className?: string;
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
    <>
      <div
        ref={ref}
        className={cn("mx-auto flex items-center", className, disabledStyle)}
      >
        <RadioGroup.Root
          className="RadioGroupRoot"
          defaultValue={defaultValue ? radioValue : undefined}
          aria-label="View density"
        >
          {list !== undefined
            ? list.map(({ id, text }) => {
                return (
                  <div key={id} className={"mb-2 flex  items-center"}>
                    <RadioGroup.Item
                      className={cn("RadioGroupItem", "group")}
                      value={text}
                      id={id}
                      onClick={() =>
                        setRadioValue ? setRadioValue(text) : null
                      }
                    >
                      <div
                        className={cn(
                          "border-grayscale-neutral bg-grayscale-white group-hover:border-secondary-green relative h-[26px] w-[26px] rounded-[9999px] border ",
                          "group-data-[state=checked]:bg-secondary-green group-data-[state=checked]:text-grayscale-white",
                          "group-data-[state=checked]:hover:bg-secondary-green group-data-[state=checked]:hover:text-grayscale-white group-data-[state=checked]:focus:bg-secondary-green group-data-[state=checked]:focus:text-grayscale-white",
                          "group-data-[state=checked]:transition-all group-data-[state=checked]:duration-700",
                        )}
                      >
                        <span
                          className={cn(
                            "bg-grayscale-neutral group-hover:bg-secondary-green absolute left-[6px] top-[6px] h-[12px] w-[12px] rounded-[9999px]",
                            "group-data-[state=checked]:bg-grayscale-white",
                            "group-data-[state=checked]:transition-all group-data-[state=checked]:duration-700",
                          )}
                        />
                      </div>
                    </RadioGroup.Item>
                    <label
                      className={cn(
                        "Label",
                        "body-4 text-grayscale-dark ml-[10px] cursor-pointer",
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
    </>
  );
}

export default forwardRef(RadioBox);
