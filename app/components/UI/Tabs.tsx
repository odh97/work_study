"use client";

import React, { forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import * as RadixTabs from "@radix-ui/react-tabs";
import { useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  list?: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
  selectedClass?: string;
  unSelectedClass?: string;
  reverse?: boolean;
  t?: any;
}
interface TabsContentProps {
  value: string;
  children?: React.ReactNode | React.ReactNode[];
}

function Tabs({
  t,
  children,
  className,
  wrapperClassName,
  value,
  setValue,
  list,
  selectedClass,
  unSelectedClass,
  reverse = false,
}: TabsProps) {
  function generateTriggerClass(key: string) {
    if (reverse) return reverseClass(key);

    const defaultClass = cn("TabsTrigger h-[36px] flex-1 select-none");
    const selected = cn(
      "h-[48px] text-grayscale-dark border-b-2 emphasis-2",
      selectedClass,
    );
    const unSelected = cn(
      "h-[48px] text-grayscale-neutral body-3 text-grayscale-light hover:text-secondary-green hover:emphasis-2",
      unSelectedClass,
    );
    return key === value
      ? cn(defaultClass, selected)
      : cn(defaultClass, unSelected);
  }

  function reverseClass(key: string) {
    const defaultClass = cn("TabsTrigger h-[36px] flex-1 select-none");
    const selected = cn(
      "h-[48px] text-grayscale-dark border-t-2 border-r-2 border-l-2 emphasis-2",
      selectedClass,
    );
    const unSelected = cn(
      "h-[48px] text-grayscale-neutral body-3 text-grayscale-light border-b-2 border-grayscale-dark hover:text-secondary-black hover:emphasis-2",
      unSelectedClass,
    );
    return key === value
      ? cn(defaultClass, selected)
      : cn(defaultClass, unSelected);
  }

  return (
    <RadixTabs.Root
      className={cn(
        "TabsRoot flex w-full flex-col justify-center sm:block sm:w-auto",
        wrapperClassName,
      )}
      defaultValue={value}
    >
      <RadixTabs.List
        className={cn("TabsList body-5 flex", className)}
        aria-label="Manage your account"
      >
        {list &&
          list.map((title, index) => {
            return (
              <RadixTabs.Trigger
                value={title}
                key={title}
                className={generateTriggerClass(title)}
                onClick={() => setValue(title)}
              >
                {t ? t(title) : title}
              </RadixTabs.Trigger>
            );
          })}
        {reverse && <div className={"flex-1 border-b-2"}></div>}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}

function TabContent({ value, children }: TabsContentProps) {
  return (
    <RadixTabs.Content value={value} className={"TabsContent"}>
      {children}
    </RadixTabs.Content>
  );
}

Tabs.displayName = "Tabs";
Tabs.Content = TabContent;

export default Tabs;
