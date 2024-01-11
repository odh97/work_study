import Row from "@/components/Layout/Row";
import React from "react";

export default function ValueAndUnitText({
  containerClassName,
  prevClassName,
  valueClassName,
  unitClassName,
  prev,
  value,
  unit,
}: {
  containerClassName?: string;
  prevClassName?: string;
  valueClassName?: string;
  unitClassName?: string;
  prev?: string;
  value?: any;
  unit?: string;
}) {
  return (
    <Row className={containerClassName}>
      <Prev prev={prev} className={prevClassName} />
      <Value value={value} className={valueClassName} />
      <Unit unit={unit} className={unitClassName} />
    </Row>
  );
}

function Prev({ prev, className = "" }: { prev?: string; className?: string }) {
  if (!prev) return null;
  return (
    <Row className={className}>
      {prev}
      <p>&nbsp;</p>
    </Row>
  );
}

function Value({ value, className = "" }: { value?: any; className?: string }) {
  if (!value && value !== 0) return null;
  return <Row className={className}>{value}</Row>;
}

function Unit({ unit, className = "" }: { unit?: string; className?: string }) {
  if (!unit) return null;
  return <Row className={className}>{unit}</Row>;
}
