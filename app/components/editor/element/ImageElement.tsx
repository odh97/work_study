import { useFocused, useSelected } from "slate-react";
import { ElementProps } from "@/components/editor/element/ChangeElement";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ImageHoverToolbar from "@/components/editor/plugins/ImageHoverToolbar";
import {
  IMAGE_SIZE_ADD_CASE_LG,
  IMAGE_SIZE_ADD_CASE_MD,
  IMAGE_SIZE_LARGE,
  IMAGE_SIZE_MIDDLE,
} from "@/constant/slate";
import { useEditorStore } from "@/store/editorStore";

export const ImageElement = ({
  attributes,
  children,
  element,
}: ElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const { isOnlyRead } = useEditorStore((state) => state);
  // shadow("shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]");
  // const boxShadow = selected && focused ? `shadow-[0_0_0_3px_#B4D5FF]` : `none`;
  const width =
    element.size === IMAGE_SIZE_LARGE
      ? `w-[90%]`
      : element.size === IMAGE_SIZE_MIDDLE
      ? `w-[70%]`
      : element.size === IMAGE_SIZE_MIDDLE
      ? `w-[40%]`
      : element.size === IMAGE_SIZE_ADD_CASE_LG
      ? `w-full max-w-[1000px]`
      : element.size === IMAGE_SIZE_ADD_CASE_MD
      ? `w-full max-w-[700px]`
      : `w-full max-w-[400px]`;
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={`relative my-6 flex cursor-default justify-center`}
      >
        <Image
          src={
            isOnlyRead || element?.url.includes("upload/")
              ? `https://kr.object.ncloudstorage.com/thesolve/${element?.url}`
              : (element?.url as string)
          }
          width={700}
          height={3000}
          className={cn(
            `box-border block shadow-[0_0_0_3px_#B4D5FF]`,
            // boxShadow,
            width,
          )}
          alt={`insert`}
          priority
        />
        {/*<ImageHoverToolbar element={element} />*/}
      </div>
    </div>
  );
};
