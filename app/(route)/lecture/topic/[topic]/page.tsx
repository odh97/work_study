import Image from "next/image";
import style from "./TopicPage.module.css";
import { UnsplashImage } from "@/app/_types/unsplash-image";
import { Metadata } from "next";
import { param } from "ts-interface-checker";

interface TopicProps {
  params: { topic: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

//export const revalidate = 0;

export function generateMetadata(prop: TopicProps): Metadata {
  return { title: prop.params.topic + "메타 데이터" };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function topic(props: TopicProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${props.params.topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
  );
  const images: UnsplashImage[] = await response.json();
  console.log("images 데이터 완료");

  // @ts-ignore
  return (
    <>
      <div>topic {props.params.topic} page 입니다.</div>
      {images.map((val) => (
        <Image
          key={val.urls.raw}
          src={val.urls.raw}
          width={250}
          height={250}
          alt={val.description}
          className={style.image}
          style={{ background: "grin" }}
        />
      ))}
    </>
  );
}
