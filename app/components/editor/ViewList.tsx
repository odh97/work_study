"use client";
import Contents from "@/components/Layout/Contents";
import Table from "@/components/UI/Table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { cn, getBeforeDate } from "@/lib/utils";
import { LEGAL_CATEGORIES, PAGE_SIZE, PAGINATION } from "@/constant/constant";
import { usePosts } from "@/hook/usePosts";
import Col from "@/components/Layout/Col";
import Image from "next/image";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useText } from "@/hook/useText";
import Row from "@/components/Layout/Row";

export default function ViewList() {
  const { isLoading, error, posts: postList, count } = usePosts();
  return (
    <Contents className={"flex flex-col items-center"}>
      <Table>
        <Table.Header>
          <div className={"flex w-full justify-between"}>
            <Select />
            <SortBy />
          </div>
        </Table.Header>

        <Table.Body
          isLoading={isLoading}
          data={postList}
          render={(post: any) => <PostRow post={post} key={post.id} />}
        />

        <Table.Footer>
          <Pagination
            count={count}
            pageSize={PAGE_SIZE}
            pagination={PAGINATION}
          />
        </Table.Footer>
      </Table>
    </Contents>
  );
}
type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  firstImg: string;
  createAt: string;
};
function PostRow({ post }: { post: Post }) {
  const res = `https://kr.object.ncloudstorage.com/thesolve/${post?.firstImg}`;
  const pathName = usePathname();
  const author = pathName?.split("/")[2];
  const { t } = useText("category");
  const date = getBeforeDate(post?.createAt);
  return (
    <Table.TRow>
      <div
        className={"flex w-[850px] cursor-pointer gap-[30px] py-[30px]"}
        onClick={() =>
          (window.location.href = `/guide/${author}/detail?id=${post.id}`)
        }
      >
        <Col className={"w-[100px] items-center overflow-hidden "}>
          <Image
            style={{ height: "100%" }}
            src={!!post?.firstImg ? res : "/next.svg"}
            width={100}
            height={100}
            alt={"image"}
            priority
          />
          <h2>{t(post.category)}</h2>
          <Row className={""}>
            <Row className={"emphasis-4"}>
              {date?.value}
              <p>&nbsp;</p>
            </Row>
            <Row className={"body-5"}>{date?.unit} 작성됨</Row>
          </Row>
        </Col>
        <Col className={"max-w-[45rem]"}>
          <h2 className={"text-[30px] font-bold"}>{post.title}</h2>
          <p className={"text-[20px]"}>{post.description.slice(0, 110)}</p>
        </Col>
      </div>
    </Table.TRow>
  );
}
function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortBy = searchParams.get("sortBy") || "desc";

  const createQuery = useCallback(
    (sortBy: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", sortBy);
      return params.toString();
    },
    [searchParams],
  );

  const options = [
    { label: "최신순", value: "desc" },
    { label: "오래된순", value: "asc" },
  ];

  return (
    <div className={"flex gap-[30px]"}>
      {options.map((option) => (
        <button
          className={cn("", sortBy === option.value && "text-primary-light")}
          key={option.label}
          onClick={() =>
            router.push(pathname + "?" + createQuery(option.value))
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Select() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useText("category");
  const category = searchParams.get("category") || "all";
  const newArray = ["all", ...LEGAL_CATEGORIES];
  const createQuery = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", category);
      params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );

  return (
    <select
      value={category}
      onChange={(e) => {
        router.push(pathname + "?" + createQuery(e.target.value));
      }}
      id="cars"
      className={
        "border-gray-300 h-[40px] w-auto rounded-[4px] border px-[10px]"
      }
    >
      {newArray.map((category) => (
        <option value={category} key={category}>
          {t(category)}
        </option>
      ))}
    </select>
  );
}
