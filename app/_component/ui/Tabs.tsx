"use client";

import React, { forwardRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/app/lib/utills";

interface radioBoxType {
  id?: string;
  children?: React.ReactNode;
  list?: string[];
  secondary?: boolean;
  className?: string;
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
 *   contentClassName = {content 스타일 정의}<br/>
 *   list = {string[]}<br/>
 *   secondary = {true}<br/>
 *   //state<br/>
 *   defaultValue = string;<br/>
 *   setContent = React.Dispatch<React.SetStateAction<string>>;<br/>
 *   <br/>
 * */
function RadioBox(
  {
    children,
    className,
    list,
    secondary,
    contentClassName,
    defaultValue,
    setContent,
  }: radioBoxType,
  ref: React.Ref<HTMLDivElement>,
) {
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
                        "border-b-grayscale-dark border-t-grayscale-white text-grayscale-neutral hover:border-secondary-green hover:border-t-grayscale-white hover:text-secondary-green box-border h-[36px] flex-1 overflow-hidden border-b-2 border-t-2  transition-all duration-500",
                        "aria-selected:emphasis-4 aria-selected:border-grayscale-dark aria-selected:border-b-grayscale-white aria-selected:text-grayscale-dark aria-selected:border-2",
                        "data-[secondary=true]:aria-selected:body-4 data-[secondary=true]:aria-selected:text-primary group data-[secondary=true]:relative data-[secondary=true]:border-0",
                      )}
                      value={title}
                      key={title}
                      onClick={() => (setContent ? setContent(title) : null)}
                    >
                      {title}
                      {secondary ? (
                        <span
                          className={cn(
                            "ease absolute bottom-0 left-[50%] h-[2px] w-[0%] transition-all duration-500",
                            "group-hover:bg-secondary-green group-hover:left-0 group-hover:w-[100%]",
                            "group-aria-selected:bg-primary-light group-aria-selected:left-0 group-aria-selected:w-[100%]",
                          )}
                        ></span>
                      ) : null}
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

export default forwardRef(RadioBox);
