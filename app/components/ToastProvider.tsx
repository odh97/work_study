"use client";
import * as Toast from "@radix-ui/react-toast";
import React from "react";
import { useToastStore } from "@/store/toastStore";
import Col from "@/components/Layout/Col";

function ToastProvider() {
  const { setOpen, open, title, description } = useToastStore((state) => state);
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-[5px] bg-grayscale-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={setOpen}
      >
        <Col>
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-grayscale-black [grid-area:_title]">
            {title}
          </Toast.Title>
          <Toast.Description>{description}</Toast.Description>
        </Col>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        ></Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}

export { ToastProvider };
