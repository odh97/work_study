import { request } from "@/service/axios";

export function reportComment({
  msg,
  reportType,
  pid,
}: {
  msg: string;
  reportType: string;
  pid: string;
}) {
  return request({
    url: "/report",
    method: "POST",
    data: { msg, reportType, pid },
  });
}

export function findTags(search: string) {
  return request({
    url: "/find-tags",
    method: "GET",
    params: {
      search,
    },
  });
}

export function applyTag(tag: string) {
  return request({
    url: "/apply-tag",
    method: "POST",
    data: {
      tag,
    },
  });
}
