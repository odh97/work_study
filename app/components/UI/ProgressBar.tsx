import React from "react";
import Row from "@/components/Layout/Row";
import { cn } from "@/app/lib/utills";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  value: number;
  className?: string;

  containerClassName?: string;
  barClassName?: string;
};

function ProgressBar({ value, containerClassName, barClassName }: Props) {
  const sp = useSpring({
    width: `${value * 100}%`,
  });

  return (
    <Row
      className={cn("h-[10px] w-full bg-grayscale-light", containerClassName)}
    >
      <animated.div
        className={cn("flex h-[10px] bg-grayscale-deep", barClassName)}
        style={sp}
      ></animated.div>
    </Row>
  );
}

export default ProgressBar;
