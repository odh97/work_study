import { request } from "@/service/axios";
import axios from "axios";

export function getDictionaryDetails(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dictionary/post/${id}`);
}

export function getDictionaryIndexPageList() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dictionary`);
}

export function getRecommends(category: string) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/dictionary/category/recommends`,
    {
      params: {
        category: category,
      },
    },
  );
}

export function getInitCurrents(category: string) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/dictionary/category/current`,
    {
      params: {
        category: category,
        page: 1,
      },
    },
  );
}

export function getCurrents(category: string, page: number) {
  return request({
    url: `${process.env.NEXT_PUBLIC_API_URL}/dictionary/category/current`,
    method: "GET",
    params: { category: category, page: page },
  });
}

export function getDictionaryComments({
  page,
  pid,
  listRows,
}: {
  page: number;
  pid: string;
  listRows: number;
}) {
  return request({
    url: "/dictionary/user-comments",
    method: "GET",
    params: {
      page,
      pid,
      listRows,
    },
  });
}

export function addDictionaryComment({
  comment,
  pid,
}: {
  comment: string;
  pid: string;
}) {
  return request({
    url: "/dictionary/user-comments",
    method: "POST",
    data: {
      comment: comment,
      pid: pid,
    },
  });
}
