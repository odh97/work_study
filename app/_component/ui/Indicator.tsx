"use client";
import { IconDot, IconDotEmpty } from "@/assets/svg/dynamic/svgList";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";

export default function Indicator({
  width = "max-w-[20rem]",
  options,
}: {
  width?: string;
  options: { value: string }[];
}) {
  const [choice, setChoice] = useState(0);
  return (
    <Col className={cn("w-full items-center gap-[15px]", width)}>
      <Image src={options[choice].value} alt={"a"} width={200} height={200} />
      <Row className={"justify-center gap-[15px]"}>
        {options?.map((option: { value: string }, index: number) => (
          <Button
            key={index}
            onClick={() => setChoice(index)}
            active={index === choice}
          />
        ))}
      </Row>
    </Col>
  );
}

const Button = ({ active, onClick }: { active: any; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={cn(
        "text-grayscale-dark hover:text-secondary-green disabled:text-secondary-green",
      )}
    >
      {active ? <IconDot /> : <IconDotEmpty />}
    </button>
  );
};
