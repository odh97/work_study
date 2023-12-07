"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utills";
import * as Label from "@radix-ui/react-label";
import { animated, config, useSpring } from "@react-spring/web";

/**
 *   기본 옵션
 *   ref = {ref}<br/>
 *   id (label, input) = {id}<br/>
 *   divClassName = {div 스타일 정의}<br/>
 *   labelClassName = {label 스타일 정의}<br/>
 *   inputClassName = {input 스타일 정의}<br/>
 *   disabled = {boolean}<br/>
 *   setInputValue = {string}<br/>
 *   <br/>
 *   // label <br/>
 *   labelToggle = {boolean}<br/>
 *   labelText = {string}<br/>
 *   // error <br/>
 *   errorToggle = {boolean},
 *   errorText = {string},
 * */

function Textarea(
  {
    id,
    divClassName,
    labelClassName,
    inputClassName,
    disabled = false,
    // event
    setInputValue,
    // label
    labelToggle = false,
    labelText,
    // error
    errorToggle = false,
    setErrorToggle,
    errorText,
  }: TextareaType,
  ref: React.Ref<HTMLDivElement>,
) {
  const errorStyle = errorToggle ? "border-secondary-red" : "";
  const disabledStyle = disabled ? "opacity-20 pointer-events-none" : "";
  const springAnimate = useSpring({
    from: { x: 0 },
    to: async (next, cancel) => [
      await next({ x: errorToggle ? 2 : 0 }),
      await next({ x: errorToggle ? -2 : 0 }),
      await next({ x: errorToggle ? 2 : 0 }),
      await next({ x: errorToggle ? -2 : 0 }),
      await next({ x: errorToggle ? 1 : 0 }),
      await next({ x: errorToggle ? -1 : 0 }),
      await next({ x: errorToggle ? 0 : 0 }),
    ],
    reset: true,

    config: {
      ...config.wobbly,
      duration: 70,
    },
  });

  return (
    <div ref={ref} className={cn(divClassName)}>
      <style jsx>{`
        textarea {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        textarea::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {labelToggle ? (
        <Label.Root
          className={cn(
            "LabelRoot",
            "body-5 mb-[4px] ml-[15px]",
            labelClassName,
          )}
          htmlFor={id}
        >
          {labelText}
        </Label.Root>
      ) : null}
      <animated.div
        className={cn(
          " w-full overflow-hidden rounded-[10px] border border-[#B0B0B9] p-[15px] hover:border-[#000000] focus:border-[#000000]",
          inputClassName,
          errorStyle,
          disabledStyle,
        )}
        style={springAnimate}
      >
        <textarea
          className={cn(
            "Input",
            "body-4 min-h-[62px] w-full resize-none outline-none",
          )}
          id={id}
          placeholder={"단어나 문장을 입력해 주세요."}
          disabled={disabled}
          onChange={(e) => {
            if (errorToggle === true && setErrorToggle !== undefined) {
              setErrorToggle(false);
            }
            if (setInputValue !== undefined) setInputValue(e.target.value);
          }}
        />
      </animated.div>
      {errorToggle ? (
        <p className={"body-7 text-secondary-red ml-[15px] mt-[5px]"}>
          {errorText ? errorText : "값을 입력해 주세요."}
        </p>
      ) : null}
    </div>
  );
}

export default forwardRef(Textarea);

interface TextareaType {
  // default props
  id?: string;
  divClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;

  // label
  labelToggle?: boolean;
  labelText?: string;
  // error
  errorToggle?: boolean;
  setErrorToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  errorText?: string;
}
