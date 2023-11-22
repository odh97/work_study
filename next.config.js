/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env["GOOGLE_MAPS_API_KEY"],
    NAVER_MAPS_CLIENT_ID: process.env["NAVER_MAPS_CLIENT_ID"],
    NAVER_MAPS_CLIENT_SECRET: process.env["NAVER_MAPS_CLIENT_SECRET"],
    NAVER_SEARCH_CLIENT_ID: process.env["NAVER_MAPS_CLIENT_ID"],
    NAVER_SEARCH_CLIENT_SECRET: process.env["NAVER_SEARCH_CLIENT_SECRET"],
  },
};

module.exports = nextConfig;
