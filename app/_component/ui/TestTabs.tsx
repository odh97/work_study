"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import * as RadixTabs from "@radix-ui/react-tabs";
import { useSpring, animated, useTrail } from "@react-spring/web";

interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  list: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
  selectedClass?: string;
  unSelectedClass?: string;
}
interface TabsContentProps {
  value: string;
  children?: React.ReactNode | React.ReactNode[];
}

function Tabs({
  children,
  className,
  value,
  setValue,
  list,
  selectedClass,
  unSelectedClass,
}: TabsProps) {
  function generateTriggerClass(key: string) {
    const defaultClass = cn("TabsTrigger h-[36px] flex-1 relative");
    const selected = cn(
      "text-grayscale-dark border-b-2 emphasis-2",
      selectedClass,
    );
    const unSelected = cn(
      "text-grayscale-neutral body-3 text-grayscale-light hover:text-secondary-green hover:emphasis-2",
      unSelectedClass,
    );
    return key === value
      ? cn(defaultClass, selected)
      : cn(defaultClass, unSelected);
  }

  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const [styleSpring, set] = useSpring(
    () => ({
      width: hovered === undefined ? "0%" : "100%",
      x: hovered === undefined ? "50%" : "100%",
      duration: hovered === undefined ? 0 : 500,
    }),
    [hovered],
  );

  return (
    <RadixTabs.Root className="TabsRoot" defaultValue={value}>
      <RadixTabs.List
        className={cn(
          "TabsList body-5 flex border-b border-grayscale-light",
          className,
        )}
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
                onMouseEnter={(e) => {
                  if (title !== value) {
                    setHovered(index);
                  }
                }}
                onMouseOut={() => setHovered(undefined)}
              >
                {title}
                <animated.span
                  className={
                    "absolute bottom-0 left-0 block h-[5px] w-[0%] bg-secondary-yellow"
                  }
                  style={
                    index === hovered ? styleSpring : { width: "0%", x: "50%" }
                  }
                />
              </RadixTabs.Trigger>
            );
          })}
      </RadixTabs.List>
      {children}
      <AnimatedList />
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
const AnimatedListItem = ({ text, index }: { text: string; index: number }) => {
  const [hovered, setHovered] = React.useState(false);

  const trailProps = useTrail(1, {
    opacity: hovered ? 1 : 0.5,
    transform: `scale(${hovered ? 1.1 : 1})`,
  });

  return (
    <animated.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={trailProps[0]}
    >
      {text}
    </animated.div>
  );
};

const AnimatedList = () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  return (
    <div>
      {trail.map((trailProps, index) => (
        <AnimatedListItem
          key={index}
          text={items[index]}
          index={index}
          // style={trailProps}
        />
      ))}
    </div>
  );
};
