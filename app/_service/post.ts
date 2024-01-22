import { request } from "@/service/axios";
import { LEGAL_CATEGORIES, PAGE_SIZE } from "@/constant/constant";

export function getPostList({
  filter,
  page,
  search,
  pageSize = PAGE_SIZE,
}: {
  filter: any;
  page: any;
  search: string;
  pageSize?: number;
}) {
  return request({
    method: "get",
    url: "/post/list",
    params: {
      filter: filter,
      page: page,
      search: search,
      pageSize: pageSize,
    },
  });
}

export function getPost({ id }: { id: any }) {
  return request({
    method: "get",
    url: "/post",
    params: {
      id: id,
    },
  });
}

export function savePost({
  title,
  category = LEGAL_CATEGORIES[0],
  contents,
  author,
  localStorageId,
}: {
  title: string;
  category: string;
  contents: any;
  author: string;
  localStorageId: string | null;
}) {
  return request({
    method: "post",
    url: "/post",
    data: {
      title,
      category,
      contents,
      author,
      localStorageId,
    },
  });
}
