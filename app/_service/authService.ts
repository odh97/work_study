import { request } from "@/service/axios";

export function emailLogin(email: string, password: string) {
  return request({
    url: "/auth/login",
    method: "POST",
    data: {
      username: email,
      password: password,
    },
  });
}

export function sendAuthCodeByEmail(email: string) {
  return request({
    url: `/auth/send/authCode`,
    method: "POST",
    data: {
      email,
    },
  });
}

export function verifyAuthCode(
  email: string,
  authCode: string,
  authType: "email" | "phone",
) {
  return request({
    url: "/auth/authCode/verify",
    method: "POST",
    data: {
      email,
      authCode,
      authType,
    },
  });
}

export function localRegister({
  email,
  authCode,
  check1,
  check2,
  check3,
  passwordCheck,
  password,
}: {
  email: string;
  password: string;
  passwordCheck: string;
  authCode: string;
  check1: boolean;
  check2: boolean;
  check3: boolean;
}) {
  return request({
    url: "/auth/local/register",
    method: "POST",
    data: {
      email,
      password,
      passwordCheck,
      authCode,
      check1,
      check2,
      check3,
    },
  });
}

export function sendTempPwd(email: string) {
  return request({
    url: "/auth/send/tempPwd",
    method: "POST",
    data: {
      email,
    },
  });
}

export function refreshTokens() {
  return request({
    url: "/auth/refresh",
    method: "POST",
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "POST",
  });
}
