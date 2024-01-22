import axios from "axios";
import { request } from "@/service/axios";

export function postExpertReview({
  expertID,
  star,
  reviewText,
}: {
  expertID: string;
  star: number;
  reviewText: string;
}) {
  return request({
    url: "/expert/" + expertID + "/review/add",
    method: "POST",
    data: {
      starCnt: star,
      comment: reviewText,
    },
  });
}

export function getExpertReviewMore(expertID: string, reviewCount: number) {
  return request({
    url: "/expert/" + expertID + "/review/more",
    method: "GET",
    params: {
      reviewCount: reviewCount,
    },
  });
}
