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
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import { useParams, usePathname } from "next/navigation";

function OnlyReadEditor({ post }: { post: any }) {
  const {
    editor,
    setContents,
    contents,
    setTitle,
    setCategory,
    setIsOnlyRead,
  } = useEditorStore((state) => state);

  useEffect(() => {
    setData();
  }, []);
  const pathname = useParams().id;
  async function setData() {
    console.log(post);
    setTitle(post.title);
    setCategory(post.category);
    setContents(post.content);
    setIsOnlyRead(true);
  }

  if (contents === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <div className={"flex w-full max-w-[47rem] justify-end"}>
        <div>
          <ButtonLargeCp
            onClick={() => {
              localStorage.setItem("content", JSON.stringify(contents));
              localStorage.setItem("title", post.title);
              localStorage.setItem("id", post.id);
              window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/guide/${pathname}/write`;
            }}
          >
            수정하기
          </ButtonLargeCp>
        </div>
      </div>
      <Slate editor={editor} initialValue={contents}>
        <Toolbar show={true} />
        <div className={`grid w-full max-w-[47rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-[47rem] outline-none`}
            renderElement={renderElement}
            readOnly={true}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </div>
  );
}

export default OnlyReadEditor;
