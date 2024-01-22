import { request } from "@/service/axios";

export async function getUserDetail(params: string) {
  return await request({
    url: "/users/info/" + params,
    method: "GET",
  });
}

export async function postUserIconUpdate(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return await request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/users/info/icon/update",
    method: "POST",
    data: formData,
  });
}
