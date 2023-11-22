import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";

// 폰트 기본제공 세팅 (지워도 무관)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "브라우저 타이틀 이름",
  description: "브라우저 상세살명란",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <header className={"bg-blue text-center"}>
          <div
            className={
              "mx-auto flex h-[50px] w-[95%] items-center justify-between"
            }
          >
            <h1 className={"inline-block w-[150px]"}>
              <Link href={"/"}>Logo</Link>
            </h1>
            <ul className={"flex w-[400px] items-center justify-between"}>
              <li>
                <Link href={"/read/1"}>메인페이지</Link>
              </li>
              <li>
                <Link href={"/read/2"}>서브페이지</Link>
              </li>
              <li>
                <Link href={"/read/2"}>서브페이지</Link>
              </li>
              <li>
                <Link href={"/read/2"}>서브페이지</Link>
              </li>
            </ul>
            <Link className={"card"} href={"/login"}>
              로그인 / 회원가입
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

/** layout page
 * 공통으로 들어가는 컴포넌트 구성하는 페이지
 * 헤더, 풋털, 사이드바 등등 정의하는 페이지
 * 컴포넌트 중복성 해결하기 위한 페이지
 * */
