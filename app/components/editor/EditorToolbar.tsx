"use client";
import { Button } from "@/components/editor/Button";
import React from "react";
import {
  BlockEditor,
  HREditor,
  MarkEditor,
} from "@/components/editor/plugins/custom-editor-plugins";
import {
  BLOCK_CODE,
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_PARAGRAPH,
  BLOCK_QUOTE,
  BULLETED_LIST,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
  NUMBER_LIST,
  TEXT_ALIGN_CENTER,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT,
} from "@/constant/slate";
import ImageButton from "@/components/editor/plugins/ImageButton";
import { useSlateStatic } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconBold,
  IconCode,
  IconFile,
  IconItalic,
  IconQuote,
  IconUnderLined,
} from "@/assets/svg/dynamic/svgList";
import IconAlignRight from "@/assets/svg/dynamic/alignRight";
import IconHr from "@/assets/svg/dynamic/hr";

export const Toolbar = ({ show }: { show: boolean }) => {
  const editor = useSlateStatic();
  const { isOnlyRead } = useEditorStore((state) => state);
  if (isOnlyRead) return null;
  if (!show) return null;
  return (
    <div
      className={`mb-[20px] flex w-full max-w-[45rem] flex-wrap justify-between`}
    >
      <div className={"flex w-full flex-col"}>
        <div className={"flex flex-col"}>
          <p>Block: shift + enter = 줄내리기 </p>
          <p>
            enter = 같은 옵션으로 한줄 추가(다른 옵션 사용시 block 옵션버튼
            클릭해야함)
          </p>
        </div>
        <div
          className={
            "z-1 text-white flex w-full max-w-full rounded-[4px] bg-primary-light p-[8px_7px_6px]"
          }
        >
          <Button
            title={`ctrl+b`}
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_PARAGRAPH);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            P
          </Button>
          <Button
            title={`ctrl+b`}
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_QUOTE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconQuote css={{ width: 15, height: 15 }} />
          </Button>
          <Button
            title={`ctrl+b`}
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_CODE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            C
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_HEADING_ONE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            H1
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            H2
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, BLOCK_HEADING_THREE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            H3
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, TEXT_ALIGN_LEFT);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconAlignLeft />
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, TEXT_ALIGN_CENTER);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconAlignCenter />
          </Button>
          <Button
            onClick={() => {
              BlockEditor.toggleBlock(editor, TEXT_ALIGN_RIGHT);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconAlignRight />
          </Button>
          {/*<Button*/}
          {/*  onClick={() => {*/}
          {/*    ListEditor.toggleList(editor, NUMBER_LIST);*/}
          {/*  }}*/}
          {/*  className={`flex border border-gray-300 px-3 py-0.5 italic`}*/}
          {/*>*/}
          {/*  Number*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  onClick={() => {*/}
          {/*    ListEditor.toggleList(editor, BULLETED_LIST);*/}
          {/*  }}*/}
          {/*  className={`flex border border-gray-300 px-3 py-0.5 italic`}*/}
          {/*>*/}
          {/*  Bullet*/}
          {/*</Button>*/}
          <ImageButton>
            <Button
              className={`rounded-[4px] px-1.5 py-0.5 italic text-grayscale-white hover:bg-primary-dark`}
            >
              <IconFile />
            </Button>
          </ImageButton>
          <Button
            onClick={() => {
              HREditor.toggleHR(editor);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconHr />
          </Button>
          <div className={"border-l text-grayscale-white"} />
          <Button
            title={`ctrl+b`}
            onClick={() => {
              MarkEditor.toggleMark(editor, MARK_BOLD);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconBold />
          </Button>
          <Button
            onClick={() => {
              MarkEditor.toggleMark(editor, MARK_CODE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconCode />
          </Button>
          <Button
            onClick={() => {
              MarkEditor.toggleMark(editor, MARK_UNDERLINE);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconUnderLined />
          </Button>
          <Button
            onClick={() => {
              MarkEditor.toggleMark(editor, MARK_ITALIC);
            }}
            className={`rounded-[4px] px-3 py-0.5 italic text-grayscale-white hover:bg-primary`}
          >
            <IconItalic />
          </Button>
        </div>
      </div>
    </div>
  );
};

function asdsdaafsfa() {
  return (
    // 그림자
    <div>
      <div></div>
      <div></div>
    </div>
  );
}
