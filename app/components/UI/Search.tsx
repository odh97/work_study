"use client";
import { cn } from "@/lib/utils";

import React from "react";
import { IconSearch } from "@/assets/svg/dynamic/svgList";
import { useText } from "@/hook/useText";

type SearchProps = {
  maxWidth?: string;
  value: any;
  valueHandler?: Function;
  onsubmit?: Function;
  className?: string;
  classNameInput?: string;
  placeholderText?: string;
};

export default function Search({
  maxWidth,
  value,
  valueHandler = () => {},
  onsubmit = () => {
    console.log("onsubmit");
  },
  className,
  classNameInput,
  placeholderText,
}: SearchProps) {
  const { t } = useText("common");
  const iconColor = classNameInput?.includes("bg-transparent")
    ? { color: "white" }
    : { color: "#3D474F" };
  return (
    <form
      className={cn("relative w-full max-w-[666px]", maxWidth, className)}
      onSubmit={(e) => {
        e.preventDefault();
        onsubmit();
      }}
    >
      <input
        className={cn(
          "body-4 w-full max-w-full rounded-[9999px] border border-grayscale-neutral px-[15px] py-[11px] text-grayscale-dark outline-none duration-500",
          classNameInput,
          classNameInput?.includes("bg-transparent")
            ? "hover:border-grayscale-light focus:border-grayscale-light"
            : "hover:border-grayscale-black focus:border-grayscale-black",
        )}
        placeholder={placeholderText ? placeholderText : t("input_keyword_pla")}
        value={value}
        onChange={(e) => valueHandler(e.target.value)}
      />
      <button className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}>
        <IconSearch color={iconColor.color} />
      </button>
    </form>
  );
}
