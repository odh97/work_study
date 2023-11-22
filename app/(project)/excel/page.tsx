"use client";
import React from "react";
import Xlsxjs from "./xlsxjs";
import CsvDownload from "./csvDownload";
import Exceljs from "./exceljs";

function DataDownload() {
  return (
    <>
      <CsvDownload />
      <Xlsxjs />
      <Exceljs />
    </>
  );
}

export default DataDownload;
