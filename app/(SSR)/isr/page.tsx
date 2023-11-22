import { UnsplashImage } from "@/app/models/unsplash-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic static image title2",
};

export default async function Static() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    { cache: "no-cache" },
  );
  const image: UnsplashImage = await response.json();
  console.log(image);

  return (
    <>
      <div>Dynamic static page</div>
      <img
        src={image.urls.raw}
        width={image.width}
        height={image.height}
        alt={image.description}
      />
    </>
  );
}
