"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import "@/components/UI/Pagination/pagination.css";
import { cn } from "@/lib/utils";
import { PAGE_SIZE, PAGINATION } from "@/constant/constant";
import {
  IconChevronLeft,
  IconChevronRight,
} from "@/assets/svg/dynamic/svgList";
import Row from "@/components/Layout/Row";

export default function Pagination({
  count,
  pageSize,
  pagination,
}: {
  count: number;
  pageSize: number;
  pagination: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pathname = usePathname();
  const router = useRouter();

  const pageCount = Math.ceil(count / pageSize);
  const currentMaxPage = Math.ceil(currentPage / pagination) * pagination;
  const createQuery = useCallback(
    (page: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      return params.toString();
    },
    [searchParams],
  );

  function nextPage() {
    const next = (Math.ceil(currentPage / pagination) + 1) * pagination;
    const data = next - (pagination - 1);
    router.push(pathname + "?" + createQuery(data.toString()));
  }

  function prevPage() {
    const prev = (Math.ceil(currentPage / pagination) - 1) * pagination;
    router.push(pathname + "?" + createQuery(String(prev.toString())));
  }

  if (pageCount < currentPage) return null;
  if (!currentPage) return null;
  if (!pageCount) return null;

  const pageList = Array.from({ length: pagination }, (_, index) => {
    if (currentMaxPage - index > pageCount) return null;
    return currentMaxPage - index;
  })
    .filter((page) => page !== null)
    .reverse();

  return (
    <Row className={"gap-[10px]"}>
      <Button
        id={"prev"}
        disabled={currentMaxPage === pagination}
        onClick={() => prevPage()}
        className={"disabled:cursor-not-allowed"}
      >
        <IconChevronLeft />
      </Button>
      {pageList &&
        pageList?.map((page) => {
          if (page !== 0)
            return (
              <Button
                id={`b${page}`}
                key={`b${page}`}
                onClick={() => {
                  router.push(pathname + "?" + createQuery(String(page)));
                }}
                disabled={currentPage === page}
                className={
                  "text-grayscale-dark hover:bg-secondary-green hover:text-grayscale-white disabled:cursor-not-allowed disabled:bg-grayscale disabled:text-grayscale-white"
                }
              >
                {page}
              </Button>
            );
        })}
      <Button
        id={"next"}
        disabled={currentMaxPage >= pageCount}
        onClick={() => nextPage()}
        className={"disabled:cursor-not-allowed"}
      >
        <IconChevronRight />
      </Button>
    </Row>
  );
}
type ButtonProps = {
  onClick: () => void;
  id: string;
  disabled: boolean;
  className?: string;
  children?: React.ReactNode;
};
const Button = ({
  onClick,
  id,
  disabled,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-[2.25rem] w-[2.25rem] items-center justify-center border border-grayscale-light bg-transparent",
        className,
      )}
    >
      {children}
    </button>
  );
};
