import { UnsplashImage } from "@/app/_types/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "incremental static regeneration",
};

// export const revalidate = 15;

export default async function Static() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    { next: { revalidate: 15 } },
  );
  const image: UnsplashImage = await response.json();

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
