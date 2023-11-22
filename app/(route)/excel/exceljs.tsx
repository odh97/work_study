"use client";

import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type listType = {
  orderNum: string;
  menu: string;
  price: number;
  date: string;
  style?: {
    theme: string;
    showRowStripes: boolean;
  };
};

export default function Exceljs() {
  // 헤더 / 차트 데이터 / 파일명
  const headers = [
    { header: "주문번호", key: "orderNum", width: 40 },
    { header: "메뉴", key: "menu", width: 20 },
    { header: "금액", key: "price", width: 16 },
    { header: "주문날짜", key: "date", width: 24 },
  ];
  const list: listType[] = [
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
  const fileName = "몇월 부터 몇월까지 데이터";

  // workbook / sheet 생성
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet("배달 주문 내역");

  const downloadList = async () => {
    try {
      // header
      // 각 Data cell에 데이터 삽입 및 스타일 지정
      sheet.columns = headers;
      sheet.insertRows(2, list);

      // 셀 추카
      // sheet.spliceRows(1, 0, ["머리", "자리 바꾸기"]);

      //바디 라인에 스타일 적용
      sheet.eachRow((row, rowNo) => {
        row.height = 18;
        row.eachCell((cell, colNo) => {
          row.getCell(colNo).font = { size: 14 };
        });
      });

      // 헤더 라인에만 스타일 적용
      sheet.getRow(1).height = 26;
      for (let i = 1; i <= sheet.columnCount; i++) {
        const headerEachCell = sheet.getCell(`${String.fromCharCode(i + 64)}1`);
        headerEachCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "cce6ff" },
        };
        headerEachCell.border = {
          top: { style: "thin", color: { argb: "rgba(30, 97, 229, 1)" } },
          bottom: { style: "thin", color: { argb: "rgba(30, 97, 229, 1)" } },
          left: { style: "thin", color: { argb: "rgba(30, 97, 229, 1)" } },
          right: { style: "thin", color: { argb: "rgba(30, 97, 229, 1)" } },
        };
        headerEachCell.font = { size: 16, color: { argb: "282828" } };
        headerEachCell.alignment = { horizontal: "center", vertical: "middle" };
      }

      // 파일 생성
      const fileData = await wb.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
      const blob = new Blob([fileData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    } catch (error) {
      console.log(error);
      console.log("터짐");
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
