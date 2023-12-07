import { UnsplashImage } from "@/app/_types/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dynamic static image title2",
};

export default async function Dynamic() {
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
      <Image
        src={image.urls.raw}
        width={image.width}
        height={image.height}
        alt={image.description}
      />
    </>
  );
}
