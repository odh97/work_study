"use client";
import React, { useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import SubmitButton from "@/components/editor/SubmitButton";
import { LEGAL_CATEGORIES } from "@/constant/constant";
import { useText } from "@/hook/useText";

export default function Category() {
  const { category, setCategory, reset, editor } = useEditorStore(
    (state) => state,
  );
  const { t } = useText("category");
  const { isOnlyRead } = useEditorStore((state) => state);
  useEffect(() => {
    const storedContent = localStorage.getItem("category");
    setCategory(!!storedContent ? storedContent : LEGAL_CATEGORIES[0]);
  }, []);

  return (
    <div className={"mb-[20px] flex w-full max-w-[45rem] justify-between"}>
      <select
        value={category}
        onChange={(e) => {
          if (isOnlyRead) return;
          setCategory(e.target.value);
          localStorage.setItem("category", e.target.value);
        }}
        id="cars"
        className={
          "border-gray-300 h-[40px] w-auto rounded-[4px] border px-[10px]"
        }
      >
        {LEGAL_CATEGORIES.map((category) => (
          <option value={category} key={category}>
            {t(category)}
          </option>
        ))}
      </select>
      <SubmitButton />
    </div>
  );
}
