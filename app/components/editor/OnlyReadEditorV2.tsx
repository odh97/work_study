"use client";
import React, { useEffect } from "react";
import { Editable, Slate } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/element/ElementRender";
import { Toolbar } from "@/components/editor/EditorToolbar";
import HoverToolbar from "@/components/editor/plugins/HoverToolbar";

function OnlyReadEditorV2({ content }: { content: any[] }) {
  const { editor, setContents, contents, setIsOnlyRead } = useEditorStore(
    (state) => state,
  );

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    setContents(content);
    setIsOnlyRead(true);
  }

  if (contents === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-[0px] md:px-[30px]`}>
      {/*<div className={"flex w-full max-w-[47rem] justify-end"}>*/}
      {/*  <div>*/}
      {/*    <ButtonLargeCp*/}
      {/*      onClick={() => {*/}
      {/*        localStorage.setItem("content", JSON.stringify(contents));*/}
      {/*        window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/guide/${pathname}/write`;*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      수정하기*/}
      {/*    </ButtonLargeCp>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Slate editor={editor} initialValue={contents}>
        <Toolbar show={true} />
        <div className={`grid w-full max-w-full overflow-auto`}>
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-full outline-none`}
            renderElement={renderElement}
            readOnly={true}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </div>
  );
}

export default OnlyReadEditorV2;
