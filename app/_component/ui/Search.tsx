"use client";
import { cn } from "@/lib/utils";
import IconSearch from "../../../public/icon/icon-search.svg";
import React from "react";
import Image from "next/image";

type SearchProps = {
  maxWidth?: string;
  value: any;
  valueHandler?: Function;
  onsubmit?: Function;
  className?: string;
};

export default function Search({
  maxWidth,
  value,
  valueHandler = () => {},
  onsubmit = () => {
    console.log("onsubmit");
  },
  className,
}: SearchProps) {
  return (
    <form
      className={cn("relative w-full max-w-[666px]", maxWidth, className)}
      onSubmit={(e) => {
        e.preventDefault();
        onsubmit();
      }}
    >
      <input
        className={
          "body-4 w-full max-w-full rounded-[9999px] border border-grayscale-neutral px-[15px] py-[11px] text-grayscale-dark outline-none placeholder:text-grayscale-neutral hover:border-grayscale-black focus:border-grayscale-black"
        }
        placeholder={"검색어를 입력해주세요."}
        value={value}
        onChange={(e) => valueHandler(e.target.value)}
      />
      <button className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}>
        <Image src={IconSearch} alt={"search"} />
      </button>
    </form>
  );
}
