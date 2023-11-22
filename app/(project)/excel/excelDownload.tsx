"use client";

import React from "react";
import XLSX from "xlsx-js-style";
import logo from "./../../../public/the-solve.svg";

export default function ExcelComponent() {
  // STEP 1: 새로운 workbook을 만든다
  const wb = XLSX.utils.book_new();

  // 이미지 크기 및 위치 지정
  const image = {
    "!type": "image",
    "!pos": {
      start: { col: 2, row: 2 },
      end: { col: 3, row: 3 },
    },
    "!url": logo,
    "!offset": { x: 5, y: 5 },
  };

  // STEP 2: 데이터 rows에 대한 value와 style을 지정해준다.
  let header = [
    {
      v: image,
    },

    {
      v: "날짜",
      t: "s",
    },
    {
      v: "고객수",
      t: "s",
    },
    {
      v: "정산금",
      t: "s",
    },
    {
      v: "상세페이지 조회수",
      t: "s",
    },
  ];

  // 전문가 데이터 가져오기 (API로 가져오기)
  let expertData = [
    {
      date: "2021-09-01",
      customer: "100",
      settlement: "100000",
      pageView: "312",
    },
    {
      date: "2021-08-01",
      customer: "80",
      settlement: "80000",
      pageView: "162",
    },
    {
      date: "2021-07-01",
      customer: "70",
      settlement: "70000",
      pageView: "142",
    },
    {
      date: "2021-06-01",
      customer: "30",
      settlement: "90000",
      pageView: "160",
    },
  ];

  // 전문가 데이터 내보내기 array 자료
  const sheetData = [header];

  for (let i = 0; i < expertData.length; i++) {
    let copy = [
      {
        v: expertData[i].date,
        t: "s",
      },
      {
        v: expertData[i].customer,
        t: "s",
      },
      {
        v: expertData[i].settlement,
        t: "s",
      },
      {
        v: expertData[i].pageView,
        t: "s",
      },
    ];
    sheetData.push(copy);
  }

  // STEP 3: header와 body로 worksheet를 생성한다.
  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // worksheet를 workbook에 추가한다.
  XLSX.utils.book_append_sheet(wb, ws, "readme demo");

  return (
    <div>
      <h1 className={"mt-10"}>다운로드 카테고리</h1>

      <button
        onClick={() => {
          // STEP 4: Write Excel file to browser (2번째 인자에는 파일명을 지정)
          XLSX.writeFile(wb, "table-demo.xlsx");
        }}
      >
        Excel로 내려받기
      </button>
    </div>
  );
}
