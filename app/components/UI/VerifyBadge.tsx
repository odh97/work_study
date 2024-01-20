"use client";
import Row from "@/components/Layout/Row";
import { cn } from "@/app/lib/utills";
import IconCertification from "@/assets/svg/dynamic/certification";
import { useText } from "@/hook/useText";

export default function VerifyBadge({ className }: { className?: string }) {
  const { t } = useText("common");
  return (
    <Row
      className={cn(
        "emphasis-5 h-[30px] w-[87px] items-center gap-[6px] rounded-[6px] bg-grayscale-black pl-[6px] text-grayscale-white",
        className,
      )}
    >
      <IconCertification className={"h-[20px] w-[20px] text-grayscale-black"} />
      <Row>{t("authorized")}</Row>
    </Row>
  );
}
