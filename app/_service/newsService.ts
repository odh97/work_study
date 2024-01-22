import { request } from "@/service/axios";

export function getNewsData(
  sort: string,
  page: number,
  start: number,
  end: number,
) {
  console.log(sort, page, start, end);
  return request({
    url: "/scam-news",
    method: "GET",
    params: {
      sort,
      page,
      start,
      end,
    },
  });
}
