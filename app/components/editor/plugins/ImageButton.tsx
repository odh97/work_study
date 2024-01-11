"use client";

import React from "react";
import { insertImage } from "@/components/editor/plugins/withImages";
import { useSlateStatic } from "slate-react";
import {
  IMAGE_SIZE_ADD_CASE_LG,
  IMAGE_SIZE_ADD_CASE_MD,
  IMAGE_SIZE_LARGE,
} from "@/constant/slate";

export default function ImageButton({
  children,
  type,
}: {
  children?: any;
  type?: string;
}) {
  const editor = useSlateStatic();
  const ref = React.useRef<HTMLInputElement>();

  function fileInputChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target?.result;
        insertImage(editor, base64String);
      };
      reader.readAsDataURL(file);
    }
    if (!!ref.current && `value` in ref.current) {
      ref.current.value = ``;
    }
  }
  function click() {
    if (!!ref.current && `click` in ref.current) {
      ref.current.click();
    }
  }
  const enhancedChildren = React.cloneElement(children, {
    onClick: () => click(),
  });

  return (
    <>
      <input
        type={`file`}
        ref={ref as any}
        accept="image/*"
        onChange={(event) => fileInputChange(event)}
        hidden
      />
      {enhancedChildren}
    </>
  );
}
