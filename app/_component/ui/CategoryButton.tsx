import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Form from "@/components/Layout/Form";
import { cn } from "@/lib/utils";
import {
  IconCategory0,
  IconCategory1,
  IconCategory2,
  IconCategory3,
  IconCategory4,
  IconCategory5,
  IconCategory6,
  IconCategory7,
  IconCategory8,
} from "@/assets/svg/dynamic/svgList";
import { useText } from "@/hook/useText";

type Props = {
  mode?: "white" | "transparent";
  icon?: React.ReactNode;
  label: string;
  value?: string;
  setRadioValue: () => void;
};
export function CategoryButton({
  mode = "transparent",
  icon,
  label,
  value,
  setRadioValue,
}: Props) {
  const { t } = useText("category");
  const labelStyle =
    mode === "white" ? "text-grayscale-deep" : "text-grayscale-white";
  const IconStyle = {
    color: mode === "white" ? "hsla(240, 4%, 31%, 1)" : "white",
  };
  const buttonStyle =
    label === value
      ? "bg-secondary-green border-secondary-green"
      : mode === "white"
      ? "bg-grayscale-white border-grayscale-weak border-[5px]"
      : "bg-category-button border-[rgba(255_255_255/0.15)] border";
  return (
    <RadioGroup.Item
      data-check={label === value}
      className={cn(
        "flex h-[90px] w-[86px] cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[10px]" +
          " outline-none",
        buttonStyle,
      )}
      value="default"
      id={label}
      onClick={setRadioValue}
    >
      {icon}
      <label
        className={cn("emphasis-4 cursor-pointer leading-none", labelStyle)}
        htmlFor={label}
      >
        {t(label)}
      </label>
    </RadioGroup.Item>
  );
}

type CategoryButtonListProps = {
  all?: boolean;
  mode?: "white" | "transparent";
  className?: string;
  value?: string;
  setRadioValue: (key: string, label: string) => void;
};
export function CategoryButtonList({
  all,
  mode,
  className,
  value,
  setRadioValue,
}: CategoryButtonListProps) {
  const { t } = useText("category");
  const IconStyle =
    mode === "white" ? "text-grayscale-deep" : "text-grayscale-white";
  const categoryButtonList = [
    {
      label: "all",
      icon: <IconCategory0 className={IconStyle} />,
    },
    { label: "investment", icon: <IconCategory1 className={IconStyle} /> },
    { label: "cryptocurrency", icon: <IconCategory2 className={IconStyle} /> },
    { label: "voice_phishing", icon: <IconCategory3 className={IconStyle} /> },
    { label: "flower_snake", icon: <IconCategory4 className={IconStyle} /> },
    { label: "ponzi_scheme", icon: <IconCategory5 className={IconStyle} /> },
    { label: "card", icon: <IconCategory6 className={IconStyle} /> },
    { label: "real_estate", icon: <IconCategory7 className={IconStyle} /> },
    { label: "cyber", icon: <IconCategory8 className={IconStyle} /> },
  ];
  return (
    <Form className={cn("w-full overflow-auto", className)}>
      <RadioGroup.Root className={"mx-auto flex w-[854px] gap-[10px]"}>
        {categoryButtonList.map(({ label, icon }, index) => {
          if (!all && index === 0) return false;
          return (
            <CategoryButton
              key={label}
              label={label}
              icon={icon}
              value={value}
              setRadioValue={() => setRadioValue("category", label)}
              mode={mode}
            />
          );
        })}
      </RadioGroup.Root>
    </Form>
  );
}
