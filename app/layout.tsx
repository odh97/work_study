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
        <header>
          <h1>
            <Link href={"/"}>Web</Link>
          </h1>
          <ul>
            <li>
              <Link href={"/read/1"}>html5</Link>
            </li>
            <li>
              <Link href={"/read/2"}>css3</Link>
            </li>
          </ul>
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
