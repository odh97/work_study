import { cn } from "@/app/lib/utills";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[10px] bg-grayscale-weak",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
