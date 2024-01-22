import { request } from "@/service/axios";
import SimilarCases from "@/app/cases-search/_components/SimilarCases";
import axios from "axios";

export function getCaseData(
  sort: string,
  category: string,
  page: number,
  search: string | null,
) {
  return request({
    url: "/scam-case",
    method: "GET",
    params: {
      sort,
      category,
      page,
      search,
    },
  });
}

export function getInitCaseData(
  sort?: string,
  category?: string,
  search?: string,
) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scam-case`, {
    params: {
      sort: sort,
      category: category,
      page: 1,
      search: search,
    },
  });
}

export function getSimilarCasesData(category: string, take: number) {
  return request({
    url: "/scam-case/similar",
    method: "GET",
    params: {
      category,
      take,
    },
  });
}

export function getSuggestions() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scam-case/suggestions`);
}

export function getCurrentCases() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/scam-case/current-cases`,
  );
}

export function getExpertComments(page: number, pid: string) {
  return request({
    url: "/scam-case/expert-comments",
    method: "GET",
    params: {
      page,
      pid,
    },
  });
}

export function getUserComments({
  page,
  pid,
  listRows,
}: {
  page: number;
  pid: string;
  listRows: number;
}) {
  return request({
    url: "/scam-case/user-comments",
    method: "GET",
    params: {
      page,
      pid,
      listRows,
    },
  });
}

export function addUserComment({
  comment,
  pid,
}: {
  comment: string;
  pid: string;
}) {
  return request({
    url: "/scam-case/user-comments",
    method: "POST",
    data: {
      comment: comment,
      pid: pid,
    },
  });
}

export function createCase(question: any) {
  const { content, ...props } = question;
  return request({
    url: "/scam-case/add-case",
    method: "POST",
    data: {
      contents: content,
      ...props,
    },
  });
}

export function getScamPostDetails(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/scam-case/p/${id}`);
}
