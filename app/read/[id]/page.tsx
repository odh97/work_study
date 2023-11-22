"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function Read(props: any) {
  const router = useRouter();

  const handleSearch = async () => {
    let axiosData = await axios.get("http://localhost:3000/api/search");
    console.log(axiosData);
  };

  return (
    <>
      <div>안녕하세요~~~</div>
      <div>{props.params.id}번째 카테고리 입니다.</div>
      <button onClick={() => router.push("/")}>메인페이지 이동 버튼</button>
      <button className={"block pt-32"} onClick={handleSearch}>
        middleware test
      </button>
    </>
  );
}
