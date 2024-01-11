"use client";
import React, { useEffect, useState } from "react";
import Row from "@/components/Layout/Row";
import { IconLoading } from "@/assets/svg/dynamic/svgList";
import { animated, useSpring, config } from "@react-spring/web";
import { cn } from "@/lib/utils";

export default function Loading({
  className,
  text,
  textClassName,
  spinner = true,
  loadingBar,
}: {
  className?: string;
  text?: string;
  textClassName?: string;
  spinner?: boolean;
  loadingBar?: boolean;
}) {
  const [loopToggle, setLoopToggle] = useState(false);
  const springAni = useSpring({
    from: { left: "-" + 45 + "%" },
    to: { left: 105 + "%" },
    loop: loopToggle,
    config: config.molasses,
  });
  useEffect(() => {
    setLoopToggle(true);
  }, []);

  return (
    <div className={className}>
      {spinner && <IconLoading className={"mx-auto mb-[30px]"} />}
      <p
        className={cn(
          "md:display-2 display-4 mb-[30px] text-center",
          textClassName,
        )}
      >
        {text}
      </p>
      {loadingBar && (
        <Row
          className={
            "relative mx-auto h-[10px] w-[90%] max-w-[810px] overflow-hidden rounded-[9999px] bg-grayscale-light"
          }
        >
          <animated.div
            className={
              "absolute flex h-[10px] w-[40%] rounded-[9999px] bg-grayscale-deep"
            }
            style={springAni}
          />
        </Row>
      )}
    </div>
  );
}
