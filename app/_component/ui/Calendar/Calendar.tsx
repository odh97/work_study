import React, { useState } from "react";
import {
  IconCalendar,
  IconLeft,
  IconRight,
} from "@/assets/svg/dynamic/svgList";

// dayPicker
import { format, isSameMonth } from "date-fns";
import {
  DateRange,
  DayPicker,
  CaptionProps,
  useNavigation,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./daypicker.css";
import { cn } from "@/lib/utils";

/**
 *   기본 옵션
 *   className = {스타일 정의}<br/>
 *   disabled = {true}<br/>
 *   size = {"lg"}<br/>
 *   dateInputClassName = {input className}<br/>
 *   titleText = {titleText}<br/>
 *   titleTExtClassName = {titleTExtClassName}<br/>
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
  dateInputClassName,
  titleText,
  titleTExtClassName,
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
  console.log(typeof singleState);
  console.log(singleState);
  // 오늘 날짜로 이동 버튼
  // const [month, setMonth] = useState<Date>(nextMonth);
  return (
    <div className={cn("w-full max-w-[328px]", className)}>
      <div
        className={
          disabled === false
            ? cn(MainClassName, boxSize, dateInputClassName)
            : cn(
                MainClassName,
                "pointer-events-none opacity-20",
                dateInputClassName,
              )
        }
        onClick={() => setCalendarToggle(!calendarToggle)}
      >
        {titleText && (
          <p className={cn("pr-[15px]", titleTExtClassName)}>{titleText}</p>
        )}
        <div className={"flex-1 overflow-x-hidden pr-[15px]"}>
          {multiple === false ? (
            <p>
              {singleState &&
                format(
                  typeof singleState !== "object"
                    ? new Date(singleState)
                    : singleState,
                  "yyyy-MM-dd",
                )}
            </p>
          ) : null}
          {multiple === true && (
            <p className={"truncate"}>
              {rangeState?.from && format(rangeState.from, "yyyy-MM-dd")}
              {rangeState?.to && format(rangeState.to, " ~ yyyy-MM-dd")}
            </p>
          )}
        </div>
        <IconCalendar className={"select-none"} />
      </div>
      <div
        className={"relative mx-auto block w-full min-w-[228px] max-w-[328px]"}
      >
        {multiple ? (
          // 범위 날짜 선택
          <DayPicker
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
          // 단일 날짜 선택
          <DayPicker
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
        "hover:bg-blue-700 rounded mt-5 w-full bg-primary px-4 py-2 font-bold text-grayscale-white"
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
  dateInputClassName?: string;
  titleText?: string;
  titleTExtClassName?: string;
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
