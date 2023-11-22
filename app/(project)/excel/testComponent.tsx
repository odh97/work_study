"use client";

import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import logo from "./../../../public/the-solve.svg";

// TH에 들어갈 텍스트 데이터
const headers = [
  { header: "주문번호", key: "orderNum", width: 40 },
  { header: "메뉴", key: "menu", width: 16 },
  { header: "금액", key: "price", width: 16 },
  { header: "주문날짜", key: "date", width: 24 },
];
// 데이터 배열
const list = [
  {
    orderNum: "A309012",
    menu: "햄버거",
    price: 12000,
    date: "2023-05-01",
  },
  {
    orderNum: "B882175",
    menu: "아메리카노(ice)",
    price: 1900,
    date: "2023-05-17",
  },
  {
    orderNum: "B677919",
    menu: "떡볶이",
    price: 6000,
    date: "2023-05-28",
  },
  {
    orderNum: "A001092",
    menu: "마라탕",
    price: 28000,
    date: "2023-06-12",
  },
  {
    orderNum: "A776511",
    menu: "후라이드치킨",
    price: 18000,
    date: "2023-06-12",
  },
  {
    orderNum: "A256512",
    menu: "고급사시미",
    price: 289900,
    date: "2023-06-12",
  },
  {
    orderNum: "C114477",
    menu: "단체도시락",
    price: 1000000,
    date: "2023-06-19",
  },
];

export default function TestComponent() {
  // workbook 생성
  // sheet 생성
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet("배달 주문 내역");
  console.log(sheet);

  const downloadList = async () => {
    try {
      // header
      sheet.columns = headers;

      // sub header
      sheet.insertRow(2, ["머리", "자리 바꾸기"]);

      // 각 Data cell에 데이터 삽입 및 스타일 지정
      sheet.insertRows(3, list);

      // 헤더 행 위치 변경 (1번째 행과 2번째 행의 위치를 바꿈)
      const header1Row = sheet.getRow(1);
      const header2Row = sheet.getRow(2);

      // 1번째 행을 2번째 행 다음에 추가
      sheet.spliceRows(3, 0, [header1Row.values]);

      // 파일 생성
      const fileData = await wb.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
      const blob = new Blob([fileData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `배달 주문 내역`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button
        onClick={() => downloadList()}
        className={"cursor-pointer bg-green-400 p-10 text-white"}
      >
        엑셀 추출
      </button>
    </div>
  );
}
