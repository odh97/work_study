import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

type HoverCardProps = {
  triggerElement: React.ReactNode | React.ReactNode[];
  contentElement: React.ReactNode | React.ReactNode[];
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export default function CustomHoverCard({
  contentElement,
  triggerElement,
  contentClassName,
  open,
  onOpenChange,
}: HoverCardProps) {
  return (
    <HoverCard.Root openDelay={0} open={open} onOpenChange={onOpenChange}>
      <HoverCard.Trigger asChild>{triggerElement}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={cn(
            "rounded-[6px] bg-grayscale-white shadow-card data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all",
            contentClassName,
          )}
          sideOffset={5}
        >
          {contentElement}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
