"use client";
import React, { ComponentProps } from "react";
import Contents from "@/components/Layout/Contents";
import { cn } from "@/app/lib/utills";
import Image from "next/image";
type ButtonProps = {
  className?: string;
  type?: "naver" | "kakao" | "google" | "apple";
  children?: React.ReactNode;
};
export function ProviderBtn({
  children,
  type,
  ...props
}: ButtonProps & Omit<ComponentProps<"button">, "type">) {
  const iconSrc =
    type === "naver"
      ? "/icon/icon-naver-dark.png"
      : type === "kakao"
      ? "/icon/icon-kakaotalk-light.png"
      : type === "google"
      ? "/icon/icon-google-dark.png"
      : type === "apple"
      ? "/icon/icon-apple-dark.png"
      : "";
  return (
    <Button
      className={cn(
        "relative flex items-center justify-center",
        type === "naver" && "emphasis-3 bg-provider-naver",
        type === "kakao" && "emphasis-3 bg-provider-kakao text-grayscale-black",
        type === "google" &&
          "emphasis-3 bg-provider-google text-grayscale-black",
        type === "apple" && "emphasis-3 bg-provider-apple",
      )}
      {...props}
    >
      <Image
        src={iconSrc}
        alt={"button"}
        width={26}
        height={26}
        className={"absolute left-[1.25rem]"}
      />
      {children}
    </Button>
  );
}

export function ProviderBtnList({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <Contents
      className={cn(
        "flex w-full max-w-[24.375rem] flex-col gap-[0.625rem] px-[1.25rem] md:px-0",
        className,
      )}
    >
      {children}
    </Contents>
  );
}

function Button({
  className,
  children,
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "h-[2.813rem] w-full max-w-full rounded-[9999px] text-grayscale-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
