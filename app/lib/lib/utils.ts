import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import atob from "atob";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePayload(access: string | undefined) {
  if (!access) return null;

  let payload = access?.split(".")[1];
  const binaryString = atob(payload);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  let userString = new TextDecoder("utf8").decode(bytes);
  return JSON.parse(userString);
}

export function getBeforeDate(datetime: number | string) {
  let date = new Date(datetime);
  let now = new Date();
  // 1시간 전 1일 전 1주일 전 1개월 전 1년 전
  let diff = now.getTime() - date.getTime();
  let sec = diff / 1000;
  let min = sec / 60;
  let hour = min / 60;
  let day = hour / 24;
  let week = day / 7;
  let month = day / 30;
  let year = day / 365;
  if (year >= 1) {
    return {
      value: Math.floor(year),
      unit: "년 전",
    };
  } else if (month >= 1) {
    return {
      value: Math.floor(month),
      unit: "개월 전",
    };
  } else if (week >= 1) {
    return {
      value: Math.floor(week),
      unit: "주 전",
    };
  } else if (day >= 1) {
    return {
      value: Math.floor(day),
      unit: "일 전",
    };
  } else if (hour >= 1) {
    return {
      value: Math.floor(hour),
      unit: "시간 전",
    };
  } else if (min >= 1) {
    return {
      value: Math.floor(min),
      unit: "분 전",
    };
  } else if (sec >= 1) {
    return {
      value: Math.floor(sec),
      unit: "초 전",
    };
  }
}

export function formatSummary(summary: string, length: number) {
  // length 이상일경우 자르고 ... 붙이기
  if (summary.length > length) {
    return summary.slice(0, length) + "...";
  } else {
    return summary;
  }
}
