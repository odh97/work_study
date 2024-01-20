"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";
import { cn } from "@/app/lib/utills";

export default function AvatarIcon({
  src,
  style,
  className,
}: {
  src?: string;
  style?: any;
  className?: string;
}) {
  return (
    <div className="flex gap-5">
      <Avatar.Root
        className={cn(
          "border-avatar inline-flex select-none items-center justify-center overflow-hidden rounded-[9999px] border bg-[#0000001A] align-middle",
          className,
        )}
      >
        <Avatar.Image
          className="h-full w-full object-cover"
          // src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          src={src}
          width={45}
          height={45}
          style={style}
          alt="Pedro Duarte"
        />
        <Avatar.Fallback
          className="leading-1 flex h-full w-full items-center justify-center bg-grayscale-white text-[15px] font-medium"
          delayMs={0}
        >
          <Image
            className={"h-full w-full"}
            src={"/images/Profile.png"}
            alt={"icon"}
            width={400}
            height={400}
            style={style}
          />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
