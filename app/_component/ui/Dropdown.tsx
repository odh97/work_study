import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import IconChevronDown from "../../../public/icon/icon-chevron-down.svg";
import { IconCheck } from "@/assets/svg/svgList";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Row from "@/components/Layout/Row";
import * as Label from "@radix-ui/react-label";

type DropdownProps = {
  value: any;
  valueHandler: (value: string) => void;
  className?: string;
  size?: "lg" | "sm";
  list?: any[];
  keyValue?: any;
  errorMessage?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
};

export default function Dropdown({
  value,
  valueHandler,
  className,
  label,
  id,
  size = "lg",
  list = ["hello", "world", "test", "test2", "wor"],
  keyValue = "",
  errorMessage,
  disabled = false,
}: DropdownProps) {
  const height = size === "lg" ? "h-[45px]" : "h-[31px]";
  const top = size === "lg" ? 10 : 4;
  const labelTop = !!label ? 20 : 0;
  const fontStyle = size === "lg" ? "body-4" : "body-6";
  const fontColor = disabled ? "text-grayscale-neutral" : "text-grayscale-dark";
  const [open, setOpen] = useState(false);
  const border = open ? "border-grayscale-black" : "border-grayscale-neutral";
  const isError = errorMessage
    ? "border-secondary-red  hover:border-secondary-red focus:border-secondary-red"
    : "";
  const springs = useSpring({
    rotate: open ? 180 : 0,
    top: open ? top + labelTop : top + labelTop,
  });
  useEffect(() => {
    valueHandler(typeof list[0] === "object" ? list[0][keyValue] : list[0]);
  }, []);

  return (
    <Row className={"w-full max-w-[328px]"}>
      <DropdownMenu.Root
        open={open}
        onOpenChange={() => setOpen((open) => (!disabled ? !open : false))}
      >
        <DropdownMenu.Trigger
          className={"relative flex w-full flex-col outline-none"}
        >
          <Label.Root
            className={cn("body-6 ml-[15px]", fontColor)}
            htmlFor={id}
          >
            {label}
          </Label.Root>
          <input
            type={"text"}
            className={cn(
              "disabled:bg-transparent flex w-full items-center rounded-[9999px] border border-grayscale-neutral px-[15px] text-grayscale-dark outline-none hover:border-grayscale-black disabled:border-grayscale-weak disabled:text-grayscale-neutral",
              height,
              className,
              border,
              fontStyle,
              isError,
            )}
            id={id}
            readOnly={true}
            value={value}
            disabled={disabled}
          />
          <animated.div
            style={{
              transform: springs.rotate.to((o) => `rotate(${o}deg)`),
              top: springs.top.to((o) => `${o}px`),
            }}
            className={cn(
              "absolute right-[15px] top-[50%] h-[24px] w-[24px]",
              disabled ? "cursor-default" : "cursor-pointer",
            )}
          >
            <Image alt={" icon-chevron-down"} src={IconChevronDown} />
          </animated.div>
          <ErrorMessage errorMessage={errorMessage} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          {!disabled && (
            <DropdownMenu.Content
              className={
                "flex w-full max-w-[328px] rounded-[10px] border border-grayscale-black"
              }
            >
              <DropdownMenu.RadioGroup
                value={value}
                onValueChange={valueHandler}
                className={
                  "w-full max-w-full overflow-hidden rounded-[10px] bg-grayscale-white"
                }
              >
                {list?.map((item) => {
                  return (
                    <DropdownMenu.RadioItem
                      key={typeof item === "object" ? item[keyValue] : item}
                      className="relative flex h-[25px] w-full flex-1 select-none items-center py-[15px] pl-[30px] outline-none data-[checked]:bg-grayscale-dark data-[highlighted]:bg-grayscale-light data-[highlighted]:text-grayscale-white"
                      value={typeof item === "object" ? item[keyValue] : item}
                    >
                      <DropdownMenu.ItemIndicator className="absolute left-0 top-0">
                        <IconCheck />
                      </DropdownMenu.ItemIndicator>
                      {typeof item === "object" ? item[keyValue] : item}
                    </DropdownMenu.RadioItem>
                  );
                })}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          )}
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Row>
  );
}
function ErrorMessage({ errorMessage }: { errorMessage?: string }) {
  if (!errorMessage) return;
  return (
    <Row
      className={"body-7 absolute bottom-[-25px] ml-[15px] text-secondary-red"}
    >
      {errorMessage}
    </Row>
  );
}
