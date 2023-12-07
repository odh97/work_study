"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

/**
 * 아코디언 기능으로 리스트를 펼침
 * 리스트를 펼칠때 다른 리스트는 닫히도록 설정
 * 초기값은 닫힌 상태
 * */
export default function AccordionDemo() {
  let dataArray = ["item-1", "item-2", "item-3"];

  return (
    <>
      <Accordion.Root
        className="AccordionRoot w-[300px] rounded border-gray-700"
        type="single"
        collapsible
      >
        {dataArray.map((item, index) => {
          return (
            <Accordion.Item key={index} value={item}>
              <Accordion.Trigger className={" w-[300px]  bg-green-300 py-3"}>
                title : {item}
              </Accordion.Trigger>
              <Accordion.Content
                className={"w-[300px] bg-green-200 py-3 hover:bg-green-300"}
              >
                <div>Text : {item} content</div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </>
  );
}
