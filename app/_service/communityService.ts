import axios from "axios";
import { request } from "@/service/axios";

export function getRecommendBoards() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/recommend`);
}

export function getInitFreeBoards(page: string, sort: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/free`, {
    params: {
      page: page,
      listRows: 8,
      sort: sort,
    },
  });
}

export function getTotalBoardsCnt(type: string) {
  return request({
    url: "/board/total-cnt",
    method: "GET",
    params: {
      type: type,
    },
  });
}

export function getPopularBoard(type: "week" | "month", rowCnt: number) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/popular`, {
    params: {
      type: type,
      rowCnt: rowCnt,
    },
  });
}

export function getBoardDetail(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/detail`, {
    params: {
      bid: id,
    },
  });
}

export function getBoardDetailMyLike(bid: string, userId: string | undefined) {
  return request({
    url: "/board/detail/my-like",
    method: "GET",
    params: {
      bid: bid,
      userId: userId,
    },
  });
}

export function updateLikeCnt({
  bid,
  likeType,
  isChecked,
}: {
  bid: string;
  likeType: string;
  isChecked: boolean;
}) {
  return request({
    url: "/board/like",
    method: "POST",
    data: {
      type: likeType,
      bid: Number(bid),
      isChecked: isChecked,
    },
  });
}

export function getNewestList() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/newest`);
}
