"use client";
import React from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { IconCheck, IconEyeOff, IconEyeOn, IconX } from "@/assets/svg/svgList";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";

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
}: inputProps) {
  const py = size === "lg" ? "py-[11px]" : "py-[6px]";
  const fontStyle = size === "lg" ? "body-4" : "body-6";
  const fontColor = disabled ? "text-grayscale-neutral" : "text-grayscale-dark";
  const [initType, setInitType] = React.useState(type);

  const isError = errorMessage
    ? "border-secondary-red  hover:border-secondary-red focus:border-secondary-red"
    : "";
  return (
    <Col className={cn("relative gap-[4px]")}>
      <Label.Root className={cn("body-6 ml-[15px]", fontColor)} htmlFor={id}>
        {label}
      </Label.Root>
      <Row className={cn("relative w-full max-w-[328px]", maxWidth)}>
        <input
          className={cn(
            "disabled:bg-transparent w-full max-w-[328px] rounded-[9999px] border border-grayscale-neutral px-[15px] text-grayscale-dark outline-none placeholder:text-grayscale-neutral hover:border-grayscale-black focus:border-grayscale-black disabled:border-grayscale-weak disabled:text-grayscale-neutral",
            fontStyle,
            py,
            maxWidth,
            className,
            isError,
          )}
          placeholder={!!placeholder ? placeholder : "Placeholder"}
          type={type === "password" ? initType : type}
          id={id}
          autoComplete="off"
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => valueHandler(e.target.value)}
        />
        {value && type === "text" && disabled === false && !errorMessage && (
          <ClearButton valueHandler={valueHandler} />
        )}
        {value && type === "password" && disabled === false && (
          <ToggleShowPassword showHandler={setInitType} type={initType} />
        )}
        {!!errorMessage && type === "text" && <CheckButton />}
      </Row>
      <ErrorMessage errorMessage={errorMessage} />
    </Col>
  );
}

function ErrorMessage({ errorMessage }: { errorMessage?: string }) {
  if (!errorMessage) return;
  return (
    <Row className={"body-7 ml-[15px] text-secondary-red"}>{errorMessage}</Row>
  );
}
function CheckButton() {
  return (
    <Row className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}>
      <IconCheck />
    </Row>
  );
}
function ToggleShowPassword({ showHandler, type }: any) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        showHandler((type: string) =>
          type === "password" ? "text" : "password",
        );
      }}
      className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}
    >
      {type === "password" ? <IconEyeOn /> : <IconEyeOff />}
    </button>
  );
}
function ClearButton({ valueHandler }: any) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        valueHandler("");
      }}
      className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}
    >
      <IconX />
    </button>
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
};
