import React from "react";
import Chatbot from "@/assets/images/chatbot-illust.png";
import Image from "next/image";
import Col from "@/components/Layout/Col";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

function Ready({ children, className }: Props) {
  return (
    <Col className={"mt-[100px] items-center justify-center"}>
      <Image src={Chatbot} alt={"guide"} />
      <div className={"heading-3"}>준비중입니다...</div>
    </Col>
  );
}

export default Ready;
