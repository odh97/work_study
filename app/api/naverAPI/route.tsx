import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  console.log("route in, naver api protocol");
  const addressLookupQuery = request.nextUrl.searchParams.get("query");

  try {
    const axiosPromise = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${addressLookupQuery}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_MAPS_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_MAPS_CLIENT_SECRET,
        },
      },
    );
    console.log(axiosPromise.data);
    return NextResponse.json({ message: axiosPromise.data });
  } catch (error) {
    console.log(error);
    console.log("===에러 발생===");
    return NextResponse.json({ message: error });
  }
}
