"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { Transforms } from "slate";
import { BLOCK_PARAGRAPH } from "@/constant/slate";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import { usePathname } from "next/navigation";

export default function ResetButton() {
  const { isLoading, isOnlyRead, editor, reset } = useEditorStore(
    (state) => state,
  );
  const pathName = usePathname();
  const author = pathName?.split("/")[2];
  if (isOnlyRead) return null;
  return (
    <ButtonLargeCp
      disabled={isLoading}
      onClick={async () => {
        localStorage.removeItem("content");
        localStorage.removeItem("title");
        localStorage.removeItem("category");
        localStorage.removeItem("id");
        reset();
        window.location.href = `/guide/${author}/posts`;
      }}
      className={
        "max-w-[30px] border border-grayscale px-8 py-3 text-[20px] font-bold md:max-w-[30px]"
      }
    >
      리셋
    </ButtonLargeCp>
  );
}
