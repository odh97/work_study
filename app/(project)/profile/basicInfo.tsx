"use client";
import { FormEvent } from "react";

export function BasicInfo() {
  const object = {
    name: String,
    phone: Number,
    gender: String,
    portfolio: File,
    week: {
      week01: Boolean,
      week02: Boolean,
      week03: Boolean,
      week04: Boolean,
    },
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData.get("name"));
    console.log(formData.get("phone"));
    console.log(formData.get("gender"));
    console.log(formData.get("portfolio"));
    console.log(formData.get("week01"));
    console.log(formData.get("week02"));
    console.log(formData.get("week03"));
    console.log(formData.get("week04"));
  }

  return (
    <div className={"mb-5"}>
      <h3>기본정보</h3>
      <form onSubmit={onSubmit}>
        <label>이름</label>
        <input type="text" name="name" />
        <label>연락처</label>
        <input type="tel" name="phone" />
        <div>성별</div>
        <div>
          <input type="radio" name="gender" value="남성" />
          남성
        </div>
        <div className="mb-5">
          <input type="radio" name="gender" value="여성" />
          여성
        </div>
        <label>포트폴리오 업로드</label>
        <input type="file" name="portfolio" />
        <label className="mt-5 block">전문분야</label>
        <select id="dino-select">
          <optgroup label="옵션1">
            <option>마케팅</option>
            <option>번역</option>
            <option>문서</option>
          </optgroup>
          <optgroup label="옵션2">
            <option>디자인</option>
            <option>IT</option>
            <option>창업</option>
          </optgroup>
        </select>
        <label>휴일</label>
        <div>
          <input type="checkbox" name="week01" value="월" />월
        </div>
        <div>
          <input type="checkbox" name="week02" value="화" />화
        </div>
        <div>
          <input type="checkbox" name="week03" value="수" />수
        </div>
        <div>
          <input type="checkbox" name="week04" value="목" />목
        </div>
        <button type="submit" className={"mt-3 block bg-amber-300"}>
          다음
        </button>
      </form>
    </div>
  );
}

export function PersonalInfo() {
  return (
    <div>
      <h3>인적사항</h3>
      <ul>
        <li>이름</li>
        <li>이메일</li>
        <li>전화번호</li>
        <li>변호사사무소</li>
      </ul>
    </div>
  );
}
