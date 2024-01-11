"use client";
import useScrollTopZero from "@/hook/useScrollTopZero";
import Row from "@/components/Layout/Row";
import { useCallback, useState } from "react";
import Search from "@/components/UI/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useParamsToUrl from "@/hook/useParamsToUrl";

export default function ScrollSearch() {
  const { scrollTopZero } = useScrollTopZero();
  const [value, setValue] = useState("");
  const { setKeyAndValue } = useParamsToUrl();
  const router = useRouter();

  return (
    <Row
      data-scroll={!scrollTopZero}
      className={
        "group relative h-[0px] bg-grayscale-white transition-all duration-500 data-[scroll=true]:h-[65px]"
      }
    >
      <Row
        className={
          "mx-auto w-full max-w-[1230px] items-center gap-[10px] px-[16px] md:gap-[20px]"
        }
      >
        <Row
          className={
            "md:heading-5 heading-6 min-w-[94px] text-grayscale-black group-data-[scroll=false]:hidden"
          }
        >
          유사 사례 찾기
        </Row>
        <Search
          className={
            "max-w-[790px] transition-all delay-[2s] group-data-[scroll=false]:hidden"
          }
          classNameInput={"body-4"}
          value={value}
          valueHandler={setValue}
          onsubmit={() => {
            router.push("/cases-search?search=" + value);
          }}
        />
      </Row>
    </Row>
  );
}
