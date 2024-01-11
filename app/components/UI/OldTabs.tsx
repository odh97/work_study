"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";

interface OldTabsType {
  id?: string;
  children?: React.ReactNode;
  list?: string[];
  secondary?: "first" | "free" | "second" | "third";
  className?: string;
  tabClassName?: string;
  decoHoverClassName?: string;
  decoCheckedClassName?: string;
  contentClassName?: string;
  //state
  defaultValue?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
}
/**
 *   기본 옵션<br/>
 *   ref = {ref}<br/>
 *   children = {children}<br/>
 *   className = {div 스타일 정의}<br/>
 *   tabClassName = {text 스타일 정의}<br/>
 *   decoHoverClassName = {deco tag 스타일 정의  group-hover: 적용}<br/>
 *   decoCheckedClassName = {deco tag 스타일 정의}<br/>
 *   contentClassName = {content 스타일 정의}<br/>
 *   list = {string[]}<br/>
 *   secondary = {number}<br/>
 *   //state<br/>
 *   defaultValue = string;<br/>
 *   setContent = React.Dispatch<React.SetStateAction<string>>;<br/>
 *   <br/>
 * */
function OldTabs(
  {
    children,
    className,
    tabClassName,
    decoHoverClassName,
    decoCheckedClassName,
    list,
    secondary,
    contentClassName,
    defaultValue,
    setContent,
  }: OldTabsType,
  ref: React.Ref<HTMLDivElement>,
) {
  const [freeDecoClassName, setFreeDecoClassName] = React.useState<number>(0);

  return (
    <>
      <div ref={ref} className={cn("w-full", className)}>
        <Tabs.Root className="TabsRoot" defaultValue={defaultValue}>
          <Tabs.List
            className={cn("TabsList", "body-5 flex")}
            aria-label="Manage your account"
          >
            {list !== undefined
              ? list.map((title, index) => {
                  return (
                    <Tabs.Trigger
                      data-secondary={secondary}
                      className={cn(
                        "TabsTrigger",
                        "group box-border h-[36px] flex-1 overflow-hidden border-b-2 border-t-2 border-b-grayscale-dark border-t-grayscale-white text-grayscale-neutral transition-all duration-500 hover:border-secondary-green hover:border-t-grayscale-white hover:text-secondary-green",
                        "aria-selected:emphasis-4 aria-selected:border-2 aria-selected:border-grayscale-dark aria-selected:border-b-grayscale-white aria-selected:text-grayscale-dark",
                        "data-[secondary=second]:aria-selected:body-4 group data-[secondary=second]:relative data-[secondary=second]:border-0",
                        "data-[secondary=third]:aria-selected:body-4 group data-[secondary=third]:relative data-[secondary=third]:border-0 data-[secondary=third]:aria-selected:text-primary-light",
                        "data-[secondary=free]:aria-selected:body-4 group data-[secondary=free]:relative data-[secondary=free]:border-0",
                        tabClassName,
                      )}
                      value={title}
                      key={title}
                      onClick={() => {
                        if (setContent) setContent(title);
                        setFreeDecoClassName(index);
                      }}
                    >
                      {title}
                      {secondary !== "first" && secondary !== "free" && (
                        <span
                          data-secondary={secondary}
                          className={cn(
                            "absolute bottom-0 left-[50%] h-[2px] w-[0%] transition-all duration-500",
                            "group-hover:left-0 group-hover:w-[100%] group-hover:bg-secondary-green",
                            "data-[secondary=second]:group-hover:bg-transparent data-[secondary=second]:group-aria-selected:left-0 data-[secondary=second]:group-aria-selected:w-[100%] data-[secondary=second]:group-aria-selected:bg-grayscale-dark",
                            "data-[secondary=third]:group-aria-selected:left-0 data-[secondary=third]:group-aria-selected:w-[100%] data-[secondary=third]:group-aria-selected:bg-primary-light",
                          )}
                        />
                      )}
                      {secondary === "free" && (
                        <span
                          data-secondary={secondary}
                          className={
                            freeDecoClassName === index
                              ? cn(
                                  "absolute bottom-0 left-0 h-[2px] w-[100%]",
                                  decoCheckedClassName,
                                )
                              : cn(
                                  "ease absolute bottom-0 left-[50%] h-[2px] w-[0%] transition-all duration-500 group-hover:left-0 group-hover:w-[100%]",
                                  decoHoverClassName,
                                )
                          }
                        />
                      )}
                    </Tabs.Trigger>
                  );
                })
              : null}
          </Tabs.List>
          {list !== undefined
            ? list.map((title, index) => {
                return (
                  <Tabs.Content
                    className={cn("TabsContent", contentClassName)}
                    value={title}
                    key={title}
                  >
                    {children}
                  </Tabs.Content>
                );
              })
            : null}
        </Tabs.Root>
      </div>
    </>
  );
}

export default forwardRef(OldTabs);
