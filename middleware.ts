import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // api 요청 처리
  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("api 요청");
    return NextResponse.next();
  }

  // page 요청
  if (request.nextUrl.pathname.startsWith("/read")) {
    return NextResponse.rewrite(new URL("/read/1", request.url));
  }
}

export const config = {
  matcher: ["/read/:path*", "/api/:path*"],
};
