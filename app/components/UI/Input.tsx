"use client";
import React from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/app/lib/utills";

import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import {
  ErrorMessage,
  TextIconButton,
  ToggleShowPassword,
} from "@/components/UI/InputIcon";

export function Input({
  size = "lg",
  id,
  maxWidth,
  value,
  valueHandler = () => {},
  type = "text",
  disabled = false,
  className,
  errorMessage,
  placeholder,
  label,
  readOnly = false,
  otherIcon = null,
  maxLength = 100,
}: inputProps) {
  const sizeStyle = size === "lg" ? "py-[11px] body-4" : "py-[6px] body-6";

  const fontColor = disabled ? "text-grayscale-neutral" : "text-grayscale-dark";
  const [transType, setTransType] = React.useState(type);

  const isError = errorMessage
    ? "border-secondary-red  hover:border-secondary-red focus:border-secondary-red"
    : "";
  const maxWidthStyle = maxWidth === "max-w-full" && "max-w-[calc(100%-70px)]";
  return (
    <Col className={cn("relative gap-[4px]")}>
      <Label.Root className={cn("body-6 ml-[15px]", fontColor)} htmlFor={id}>
        {label}
      </Label.Root>
      <Row
        className={cn(
          "relative w-full max-w-[328px] overflow-hidden rounded-[9999px] border border-grayscale-neutral",
          maxWidth,
        )}
      >
        <input
          maxLength={maxLength}
          className={cn(
            "w-full max-w-[280px] px-[15px] text-grayscale-dark outline-none placeholder:text-grayscale-neutral hover:border-grayscale-black focus:border-grayscale-black disabled:border-grayscale-weak disabled:bg-transparent disabled:text-grayscale-neutral",
            sizeStyle,
            maxWidthStyle,
            className,
            isError,
          )}
          placeholder={!!placeholder ? placeholder : "Placeholder"}
          type={type === "password" ? transType : type}
          id={id}
          autoComplete="off"
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => valueHandler(e.target.value)}
        />
        {!otherIcon && (
          <TextIconButton
            valueHandler={valueHandler}
            type={type}
            value={value}
            disable={disabled}
            errorMessage={errorMessage}
          />
        )}
        {!otherIcon && (
          <ToggleShowPassword
            TransTypeHandler={setTransType}
            transType={transType}
            disabled={disabled}
            type={type}
            value={value}
          />
        )}
        {otherIcon}
      </Row>
      <ErrorMessage errorMessage={errorMessage} />
    </Col>
  );
}
type inputProps = {
  size?: "lg" | "sm";
  id: string;
  value: any;
  valueHandler?: Function;
  type?: string;
  maxWidth?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  otherIcon?: any;
  maxLength?: number;
};
