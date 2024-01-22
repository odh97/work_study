import axios from "axios";
import { request } from "@/service/axios";

export async function getDiagnoseData(pathName: string) {
  return request({
    url: `/diagnose?type=${pathName}`,
    method: "GET",
  });
}

export async function getResultData(type: string, version: string, data: any) {
  console.log("type", type);
  return request({
    url: "/diagnose/result",
    method: "POST",
    data: {
      type: type.replace("Sheet", ""),
      answers: data,
      version: version,
    },
  });
}
