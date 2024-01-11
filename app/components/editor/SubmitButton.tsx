"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { useCreatePost } from "@/hook/useCreatePost";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import { usePathname } from "next/navigation";

export default function SubmitButton() {
  const { category, title, contents, isOnlyRead } = useEditorStore();
  const { isCreating, createPost } = useCreatePost();

  const pathName = usePathname();
  const author = pathName?.split("/")[2];
  const localStorageId = localStorage.getItem("id");
  if (isOnlyRead) return null;
  return (
    <ButtonLargeCp
      disabled={isCreating}
      onClick={async () => {
        createPost({ title, category, contents, author, localStorageId });
      }}
      className={
        "max-w-[40px] border border-grayscale text-[20px] font-bold md:max-w-[40px] "
      }
    >
      저장
    </ButtonLargeCp>
  );
}
