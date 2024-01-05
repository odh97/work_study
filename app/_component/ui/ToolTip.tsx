"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "@/lib/utils";
type toolTipProps = {
  triggerElement: React.ReactNode | React.ReactNode[];
  contentElement: React.ReactNode | React.ReactNode[];
  className?: string;
};
export default function ToolTip({
  triggerElement,
  contentElement,
  className,
}: toolTipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{triggerElement}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={cn(
            "select-none rounded-[4px] bg-[#222] px-[15px] py-[10px] text-[15px] leading-none text-grayscale-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
            className,
          )}
          sideOffset={5}
        >
          {contentElement}
          <Tooltip.Arrow className="fill-[#222]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
