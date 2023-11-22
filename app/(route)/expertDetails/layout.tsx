import React from "react";
import Script from "next/script";

export default function ExpertDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAPS_CLIENT_ID}`}
        strategy="beforeInteractive"
      />
    </>
  );
}
