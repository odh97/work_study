"use client";
import React from "react";
import ExcelComponent from "./excelDownload";
import CsvDownload from "./csvDownload";
import TestComponent from "./testComponent";

function DataDownload() {
  return (
    <>
      <CsvDownload />
      <ExcelComponent />
      <TestComponent />
    </>
  );
}

export default DataDownload;
