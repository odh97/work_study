"use client";
import React, { useEffect } from "react";
import { Title } from "@/components/editor/Title";
import { Editable, Slate } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/element/ElementRender";
import { Toolbar } from "@/components/editor/EditorToolbar";

import HoverToolbar from "@/components/editor/plugins/HoverToolbar";
import {
  EventKeyPlugins,
  keydownEventPlugin,
} from "@/components/editor/plugins/event-key-plugins";
import Category from "@/components/editor/Category";
import { usePathname, useSearchParams } from "next/navigation";
import { getPost } from "@/service/post";
import SubmitButton from "@/components/editor/SubmitButton";
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function Editor({ readOnly, content }: { readOnly?: boolean; content?: any }) {
  const pathname = usePathname();
  const {
    editor,
    setContents,
    contents,
    setTitle,
    setCategory,
    setIsOnlyRead,
    isOnlyRead,
  } = useEditorStore((state) => state);
  const id = useSearchParams().get("id");

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    let data;
    if (pathname.includes("detail") && id) {
      const res = await getPost({ id });
      setTitle(res.res.title);
      setCategory(res.res.category);
      setIsOnlyRead(res.readonly);
      localStorage.removeItem("content");
      localStorage.removeItem("title");
      localStorage.removeItem("category");
      localStorage.removeItem("id");
      data = res.res.content;
    } else {
      data = localStorage.getItem("content");
    }
    await setContents(!!data ? JSON.parse(data) : initialValue);
  }

  if (contents === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Category />
      <Slate
        editor={editor}
        initialValue={contents}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type,
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            setContents(value);
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <Toolbar show={true} />
        <div className={`grid w-full max-w-[45rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-[45rem] outline-none`}
            renderElement={renderElement}
            readOnly={isOnlyRead}
            onKeyDownCapture={(event) => {
              EventKeyPlugins.ShiftEnter(event, editor);
              EventKeyPlugins.DeleteLister(event, editor);
              EventKeyPlugins.CodeOrLinkEnter(event, editor);
            }}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (!(event.key === `Enter` && event.shiftKey)) {
                keydownEventPlugin(event, editor);
              }
            }}
          />
        </div>
      </Slate>
      <SubmitButton />
    </div>
  );
}

export default Editor;
