import React, { useState } from "react";
import { IconLeft, IconRight } from "../../assets/svg/svgList";
import calendarIcon from "../../../public/icon/icon-calendar.svg";

// dayPicker
import { format, isSameMonth } from "date-fns";
import {
  DateRange,
  DayPicker,
  CaptionProps,
  useNavigation,
} from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import "../../app/uiguide/daypicker.css";
import { cn } from "@/app/lib/utills";
import Image from "next/image";

/**
 *   기본 옵션
 *   className = {스타일 정의}<br/>
 *   disabled = {true}<br/>
 *   size = {"lg"}<br/>
 *   <br/>
 *   캘린더 옵션<br/>
 *   단일 선택 옵션<br/>
 *   multiple = {false}<br/>
 *   singleState<br/>
 *   setSingleState<br/>
 *   다중 선택 옵션<br/>
 *   multiple = {true}<br/>
 *   rangeState <br/>
 *   setRangeState <br/>
 * */
export default function Calendar({
  disabled = false,
  className,
  size = "small",
  multiple = false,
  singleState,
  setSingleState,
  rangeState,
  setRangeState,
}: DayPickerType) {
  const MainClassName =
    "cursor-pointer relative mx-auto flex items-center w-full justify-between rounded-[9999px] border border-grayscale-neutral px-[15px] text-grayscale-dark outline-none placeholder:text-grayscale-neutral hover:border-grayscale-black focus:border-grayscale-black";

  const boxSize = size === "small" ? "h-[31px]" : "h-[45px]";
  const [calendarToggle, setCalendarToggle] = useState<boolean>(false);

  // 오늘 날짜로 이동 버튼
  // const [month, setMonth] = useState<Date>(nextMonth);
  return (
    <div className={cn("w-full max-w-[328px]", className)}>
      {/* 범위 날짜 선택 */}
      <div
        className={
          disabled === false
            ? cn(MainClassName, boxSize)
            : cn(MainClassName, "pointer-events-none opacity-20")
        }
        onClick={() => setCalendarToggle(!calendarToggle)}
      >
        {multiple === false ? (
          <p>{singleState ? format(singleState, "yyyy-MM-dd") : "날짜 선택"}</p>
        ) : null}
        {multiple === true ? (
          <p>
            {rangeState?.from
              ? format(rangeState.from, "yyyy-MM-dd")
              : "날짜 선택"}
            {rangeState?.to ? format(rangeState.to, " ~ yyyy-MM-dd") : ""}
          </p>
        ) : null}

        <Image
          className={"select-none"}
          src={calendarIcon}
          alt={"calendarIcon"}
        />
      </div>
      <div
        className={"relative mx-auto block w-full min-w-[228px] max-w-[328px]"}
      >
        {multiple ? (
          <DayPicker
            // lang
            locale={ko}
            // style
            style={{
              pointerEvents: calendarToggle ? "auto" : "none",
              opacity: calendarToggle ? 1 : 0,
              zIndex: 100,
              position: "absolute",
              top: calendarToggle ? "5px" : "-5px",
              maxWidth: "328px",
              minWidth: "228px",
              width: "100%",
              margin: "0 auto",
              padding: "16px 10px",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)",
              borderRadius: "15px",
              transition: "all 0.3s ease-in-out",
            }}
            styles={{
              months: {},
              month: {
                margin: "0 auto",
                width: "100%",
              },
              // table
              table: {
                fontWeight: "400",
                margin: "0 auto",
                width: "100%",
                maxWidth: "258px",
              },
              head: {
                fontWeight: "300",
                fontFamily: "SpoqaHanSansNeo Regular",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "-0.42px",
                color: "#B0B0B9",
              },
              tbody: {},
            }}
            // 범위 날짜 선택
            mode={"range"}
            selected={rangeState}
            onSelect={(Date) => {
              if (setRangeState !== undefined) {
                setRangeState(Date);
              }
              if (Date?.to !== undefined) {
                setCalendarToggle(false);
              }
            }}
            // 오늘 날짜로 이동 버튼
            // month={month}
            // onMonthChange={setMonth}
            // footer={footer({ today, month, setMonth })}
            // css 커스텀
            components={{
              Caption: CustomHeader,
            }}
          />
        ) : (
          //   단일 날짜 선택
          <DayPicker
            // lang
            locale={ko}
            // style
            style={{
              pointerEvents: calendarToggle ? "auto" : "none",
              opacity: calendarToggle ? 1 : 0,
              zIndex: 100,
              position: "absolute",
              top: calendarToggle ? "5px" : "-5px",
              maxWidth: "328px",
              minWidth: "228px",
              width: "100%",
              margin: "0 auto",
              padding: "16px 10px",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)",
              borderRadius: "15px",
              transition: "all 0.3s ease-in-out",
            }}
            styles={{
              months: {},
              month: {
                margin: "0 auto",
                width: "100%",
              },
              // table
              table: {
                fontWeight: "400",
                margin: "0 auto",
                width: "100%",
                maxWidth: "258px",
              },
              head: {
                fontWeight: "300",
                fontFamily: "SpoqaHanSansNeo Regular",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "-0.42px",
                color: "#B0B0B9",
              },
              tbody: {},
            }}
            // 단일 날짜 선택
            mode={"single"}
            selected={singleState}
            onSelect={(date) => {
              if (setSingleState !== undefined) {
                setSingleState(date);
                setCalendarToggle(false);
              }
            }}
            // 오늘 날짜로 이동 버튼
            // month={month}
            // onMonthChange={setMonth}
            // footer={footer({ today, month, setMonth })}
            // css 커스텀
            components={{
              Caption: CustomHeader,
            }}
          />
        )}
      </div>
    </div>
  );
}

function CustomHeader(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className={"mb-[17px] flex h-[23px] w-full justify-between text-lg"}>
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <IconLeft />
      </button>
      <h2>{format(props.displayMonth, "yyyy-MM")}</h2>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <IconRight />
      </button>
    </div>
  );
}
function footer({ today, month, setMonth }: footerPropsType) {
  return (
    <button
      className={
        "bg-primary text-grayscale-white mt-5 w-full rounded px-4 py-2 font-bold hover:bg-blue-700"
      }
      disabled={isSameMonth(today, month)}
      onClick={() => setMonth(today)}
    >
      Go to Today
    </button>
  );
}

interface DayPickerType {
  className?: string;
  disabled?: boolean;
  size?: "small" | "lg";
  multiple?: boolean;
  singleState?: Date | undefined;
  rangeState?: DateRange | undefined;
  setSingleState?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setRangeState?: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}
interface footerPropsType {
  today: Date;
  month: Date;
  setMonth: React.SetStateAction<any>;
}
