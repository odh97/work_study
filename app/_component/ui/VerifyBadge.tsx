import Row from "@/components/Layout/Row";
import { cn } from "@/lib/utils";
import IconCertification from "@/assets/svg/dynamic/certification";

export default function VerifyBadge({ className }: { className?: string }) {
  return (
    <Row
      className={cn(
        "emphasis-5 h-[30px] w-[87px] items-center gap-[6px] rounded-[6px] bg-grayscale-black pl-[6px] text-grayscale-white",
        className,
      )}
    >
      <IconCertification className={"h-[20px] w-[20px] text-grayscale-black"} />
      <Row>인증완료</Row>
    </Row>
  );
}
