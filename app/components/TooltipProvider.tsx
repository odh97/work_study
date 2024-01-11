"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

export default function TooltipProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return <Tooltip.Provider delayDuration={0}>{children}</Tooltip.Provider>;
}
