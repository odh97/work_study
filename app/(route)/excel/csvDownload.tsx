"use client";

import React from "react";
import { CSVLink } from "react-csv";

import ExcelComponent from "./xlsxjs";

export default function CsvDownload() {
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ];

  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Aezzi", lastname: "Min l3b", email: "abc@cocococo.com" },
    { firstname: "Bezzi", lastname: "Min l312314b", email: "def@cocococo.com" },
    { firstname: "Cezzi", lastname: "Mie3233b", email: "aswq@ococo.com" },
    { firstname: "Dezzi", lastname: "fdff3b", email: "qqq@cocococo.com" },
    { firstname: "Eezzi", lastname: "asdfasdfasdw", email: "eee@cocococo.com" },
  ];
  const handleClick = () => {
    const downloadCheck = confirm("엑셀을 다운로드 하시겠습니까?");

    if (!downloadCheck) {
      return false;
    }
  };

  return (
    <>
      <CSVLink
        filename="data.xlsx"
        headers={headers}
        data={data}
        onClick={handleClick}
      >
        CSV 다운로드
      </CSVLink>
    </>
  );
}
