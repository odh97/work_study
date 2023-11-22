import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request);
  console.log("middleware");
  console.log("middleware");
  console.log("middleware");
  console.log("middleware111");
}

export const config = {
  matcher: "/read/:path*",
};
