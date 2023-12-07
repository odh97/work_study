"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";

/**
 *  팝오버 기능으로 클릭시 리스트가 나오는 버튼
 *  리스트 목록 또는 옵션 설정 등에 사용
 * */
const PopoverButton = () => {
  const DataArray = ["item1", "item2", "item3", "item4"];

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="w-[300px] rounded bg-green-300 py-3">
          제품 리스트
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={"w-[300px] rounded bg-green-200"}>
          {DataArray.map((item, index) => {
            return (
              <button
                key={index}
                className={"w-[300px] py-3 hover:bg-green-300"}
              >
                {item}
              </button>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverButton;
