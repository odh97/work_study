"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import * as RadixTabs from "@radix-ui/react-tabs";
import useParamsToUrl from "@/hook/useParamsToUrl";
import { useSearchParams } from "next/navigation";

interface TabsProps {
  t?: any;
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  ParamKey: string;
  list: string[];
  selectedClass?: string;
  unSelectedClass?: string;
  reverse?: boolean;
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
  ParamKey,
  list,
  selectedClass,
  unSelectedClass,
  reverse = false,
}: TabsProps) {
  // 만약 onMount 됬을 때 value가 없으면 첫번째 value를 넣어준다.
  const { setKeyAndValue } = useParamsToUrl();
  const params = useSearchParams();
  const paramsValue = params.get(ParamKey);

  const [value, setValue] = React.useState<string>("");

  useEffect(() => {
    if (!!paramsValue) {
      setValue(paramsValue);
    } else {
      setValue(list[0]);
    }
  }, [paramsValue]);

  function generateTriggerClass(key: string) {
    if (reverse) return reverseClass(key);

    const defaultClass = cn("TabsTrigger h-[36px] sm:flex-1 select-none");
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
    const defaultClass = cn("TabsTrigger h-[36px] sm:flex-1 select-none");
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
      value={value}
      onValueChange={(value) => {
        setValue(value);
        setKeyAndValue(ParamKey, value);
      }}
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
