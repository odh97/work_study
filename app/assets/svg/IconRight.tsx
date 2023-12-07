"use client";
import React from "react";
import { IconProps } from "@/assets/svg/svgList";

export default function IconRight({ color, width, height }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color, width: width, height: height }}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
