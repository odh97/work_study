"use client";
import { useEditorStore } from "@/store/editorStore";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/element/ElementRender";
import { Editable, Slate } from "slate-react";
import { Node } from "slate";
import React, { useEffect } from "react";
import Row from "@/components/Layout/Row";
import ButtonSmallCp from "@/components/UI/button/ButtonSmall";
import ImageButton from "@/components/editor/plugins/ImageButton";
import { cn } from "@/lib/utils";
import { useAddCaseStore } from "@/store/addCaseStore";
import { useToastStore } from "@/store/toastStore";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function OnlyAddCaseEditor({ caseKey }: { caseKey: string }) {
  const { editor, setIsOnlyRead } = useEditorStore((state) => state);
  const [textCnt, setTextCnt] = React.useState(0);
  const [contents, setContest] = React.useState<any>(null);
  const { getValue, setValue } = useAddCaseStore();
  const { showToast } = useToastStore();
  function countCharacters(editor: any) {
    const text = Node.string(editor); // Editor의 모든 텍스트를 문자열로 변환
    setTextCnt(text?.length); // 문자열의 길이를 반환
  }
  useEffect(() => {
    setIsOnlyRead(false);
  }, []);
  return (
    <Slate
      editor={editor}
      initialValue={!!getValue(caseKey) ? getValue(caseKey) : initialValue}
      onChange={() => {
        setContest(editor.children);
        countCharacters(editor);
      }}
    >
      <Row
        className={
          "relative right-0 top-[0] gap-[20px] sm:absolute sm:top-[-50px]"
        }
      >
        <ImageButton type={"case-add"}>
          <ButtonSmallCp secondary={true}>사진 등록</ButtonSmallCp>
        </ImageButton>
        <ButtonSmallCp
          secondary={true}
          disabled={
            textCnt > 2000 || textCnt === 0 || getValue(caseKey) === contents
          }
          onClick={() => {
            if (textCnt === 0) return;
            setValue(caseKey, contents);
            showToast({
              title: "피해 내용",
              type: "success",
              description: "저장되었습니다.",
            });
          }}
        >
          {getValue(caseKey) === contents ? "완료" : "저장하기"}
        </ButtonSmallCp>
      </Row>
      <Row
        className={
          "relative w-full max-w-[1020px] rounded-[10px] border border-[rgba(0_0_0,0.3)]"
        }
      >
        <Editable
          className={`min-h-[500px] w-full max-w-full p-[15px] pb-[50px] outline-none`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
        <Row
          className={cn(
            "body-5 absolute bottom-[20px] right-[20px]",
            textCnt > 2000 &&
              "border-[3px] border-secondary-red p-[5px] text-secondary-red",
          )}
        >
          {textCnt > 2000 &&
            "글자수 제한을 넘으면 최종 작성이 진행되지않습니다. -- "}
          {textCnt.toLocaleString()}/2,000
        </Row>
      </Row>
    </Slate>
  );
}
