"use client";
import React from "react";
import { IconProps } from "@/assets/svg/svgList";

export default function IconCheck({
  color,
  width,
  height,
  className,
  style,
}: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color, width: width, height: height }}
      className={className}
    >
      <g id="icon-check">
        <path
          style={style}
          id="icon-check_2"
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
