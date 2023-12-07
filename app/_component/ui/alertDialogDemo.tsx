"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

/**
 * 버튼 클릭시 경고창 띄우기
 * 경고창은 취소, 확인 버튼으로 구성
 * */
export default function AlertDialogDemo() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="Button violet">등록 버튼</button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?`
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="Button red">Yes, delete account</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
