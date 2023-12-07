import { UnsplashImage } from "@/app/_types/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "static image title",
};

export default async function Static() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
  );
  const image: UnsplashImage = await response.json();
  console.log(image);

  return (
    <>
      <div>static page</div>
      <Image
        src={image.urls.raw}
        width={image.width}
        height={image.height}
        alt={image.description}
      />
    </>
  );
}
