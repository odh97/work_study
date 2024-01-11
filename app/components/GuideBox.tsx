import React from "react";
import Row from "@/components/Layout/Row";

type Props = {
  children?: any;
};

function GuideBox({ children }: Props) {
  return (
    <Row
      className={
        "body-3 gap-[10px] rounded-[10px] border-[5px] border-grayscale-weak p-[20px] text-grayscale-deep"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#3D474F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Row>
  );
}

export default GuideBox;
