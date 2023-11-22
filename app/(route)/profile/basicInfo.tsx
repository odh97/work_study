"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useExpertStore } from "@/app/_store/Zustand";
type addressesObj = {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: [];
  x: string;
  y: string;
  distance: number;
};

export function BasicInfo() {
  const { state, infoAdd } = useExpertStore();

  // ===데이터 조회===
  // 로컬 데이터 조회
  // 있으면 state에 반영
  // 없으면 빈칸으로 둠

  // ===데이터 저장===
  // 다음 버튼을 누르거나 중간까지 했으면 로컬에 저장
  // 비어있는 곳이 있으면 포커스 이동
  // 끝까지 작성이 끝났으면 서버에 저장

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formDataObj = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      portfolio: formData.get("portfolio"),
      field: formData.get("field"),
      week_work: [
        formData.get("week01"),
        formData.get("week02"),
        formData.get("week03"),
        formData.get("week04"),
        formData.get("week05"),
      ],
    };
    infoAdd({ data: formDataObj, type: "basicInfo" });
  }

  return (
    <div className={"mb-5 text-2xl"}>
      <h3 className={"mt-3"}>기본정보</h3>
      <form onSubmit={onSubmit}>
        <label>이름</label>
        <input type="text" name="name" />
        <label>연락처</label>
        <input type="tel" name="phone" maxLength={11} />
        <div className={"mt-3"}>성별</div>
        <div>
          <input type="radio" name="gender" value="남성" defaultChecked />
          남성
        </div>
        <div className="mb-5">
          <input type="radio" name="gender" value="여성" />
          여성
        </div>
        <label>포트폴리오 업로드</label>
        <input type="file" name="portfolio" />
        <label className="mt-5 block">전문분야</label>
        <select name="field">
          <optgroup label="field-option1">
            <option>마케팅</option>
            <option>번역</option>
            <option>문서</option>
          </optgroup>
          <optgroup label="field-option2">
            <option>디자인</option>
            <option>IT</option>
            <option>창업</option>
          </optgroup>
        </select>
        <label className={"mt-5 block"}>휴일</label>
        <div>
          <input type="checkbox" name="week01" />월
        </div>
        <div>
          <input type="checkbox" name="week02" />화
        </div>
        <div>
          <input type="checkbox" name="week03" />수
        </div>
        <div>
          <input type="checkbox" name="week04" />목
        </div>
        <div>
          <input type="checkbox" name="week05" />금
        </div>

        <button
          type="submit"
          className={"mt-3 rounded-xl bg-amber-300 px-10 py-5"}
        >
          저장 및 다음으로
        </button>
      </form>
      <h3>데이터 적용 확인란</h3>
      <p>이름 : {state.name}</p>
      <p>성별 : {state.gender}</p>
      <p>파일 : {state.portfolio ? state.portfolio.size : "없습니다."}</p>
      {state.week_work ? (
        state.week_work.map((item, index) => {
          return <p key={index}>근무일 {item}</p>;
        })
      ) : (
        <p>이분은 근무를 안해요</p>
      )}
    </div>
  );
}

export function AddressInfo() {
  //네이버 검색
  const { infoAdd } = useExpertStore();
  const [addressLookup, setAddressLookup] = useState<string>("");
  const [addressList, setAddressList] = useState<null | addressesObj[]>(null);
  async function handlerAddressLookup() {
    const axiosData = await axios.get(
      "http://localhost:3000/api/naverAPI?query=" + addressLookup,
    );
    const axiosDataJson = axiosData.data.message;
    console.log(axiosDataJson.addresses);
    if (axiosDataJson.meta.totalCount <= 0) {
      return console.log("검색 결과가 없습니다.");
    }
    setAddressList(axiosDataJson.addresses);
  }

  // 주소 입력 완료 및 저장
  const [addressSave, setAddressSave] = useState<addressesObj>();
  const [detailAddress, setDetailAddress] = useState<null | string>(null);
  function handlerAddressSave() {
    if (addressSave === undefined) return false;
    console.log(addressSave);

    const formDataObj = {
      address: addressSave.jibunAddress,
      roadAddress: addressSave.roadAddress,
      detailAddress: detailAddress,
      mapX: addressSave.x,
      mapY: addressSave.y,
    };
    infoAdd({ data: formDataObj, type: "addressInfo" });
  }
  return (
    <div className={"mb-5 mt-20 border-t-8 border-amber-600 text-2xl"}>
      <h3>네이버 주소 조회</h3>
      <div>
        <input
          type="text"
          value={addressLookup}
          onChange={(e) => {
            setAddressLookup(e.target.value);
          }}
        />
        <button
          className={"mt-3 rounded-xl bg-amber-300 px-10 py-5"}
          onClick={handlerAddressLookup}
        >
          주소 조회하기
        </button>
        {
          // 주소 조회 결과
          addressList === null
            ? null
            : addressList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={"mb-3 rounded border border-amber-500"}
                    onClick={() => {
                      setAddressLookup(item.roadAddress);
                      setAddressSave(item);
                    }}
                  >
                    <div>{item.roadAddress}</div>
                    <div>{item.jibunAddress}</div>
                    <div>{item.x}</div>
                    <div>{item.y}</div>
                  </div>
                );
              })
        }
        <div>상세주소</div>
        <input
          type="text"
          onChange={(e) => {
            setDetailAddress(e.target.value);
          }}
        />
        <button
          type="submit"
          className={"mt-3 block rounded-xl bg-amber-300 px-10 py-5"}
          onClick={handlerAddressSave}
        >
          주소 입력 완료
        </button>
      </div>
    </div>
  );
}
