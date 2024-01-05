"use client";
import {
  IconCheck,
  IconEyeOff,
  IconEyeOn,
  IconX,
} from "@/assets/svg/dynamic/svgList";
import Row from "@/components/Layout/Row";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { sendAuthCodeByEmail } from "@/service/authService";

function SendMailButton({
  label,
  value,
  setErrorMessage,
  trigger,
}: {
  label: "발송" | "인증하기";
  value: string;
  setErrorMessage: any;
  trigger: any;
}) {
  const [isLoad, setIsLoad] = React.useState(false);
  async function sendEmail() {
    try {
      setIsLoad(true);
      const res = await sendAuthCodeByEmail(value);
      setErrorMessage(() => "");
      return res;
    } catch (e: any) {
      setErrorMessage(() => e.message);
      return false;
    } finally {
      setIsLoad(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isLoad}
      onClick={async (e) => {
        e.preventDefault();
        const res = await sendEmail();
        if (res) {
          trigger("running");
        }
      }}
      className={cn(
        "emphasis-5 absolute right-[7px] top-[52%] box-content h-[32px] w-full translate-y-[-50%] rounded-[9999px] bg-primary text-grayscale-white",
        label === "발송" ? "max-w-[70px]" : "max-w-[80px]",
      )}
    >
      {isLoad ? "발송중" : label}
    </button>
  );
}

function Timer({ timer, setTimer }: { timer?: any; setTimer?: any }) {
  useEffect(() => {
    let interval: any;

    if (timer.state === "running") {
      interval = setInterval(() => {
        setTimer((prevTimer: any) => {
          if (prevTimer.time === 1) {
            clearInterval(interval);
            return { time: 0, state: "stopped" };
          }
          return { ...prevTimer, time: prevTimer.time - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const minutes = Math.floor(timer.time / 60);
  const seconds = timer.time % 60;
  return (
    <Row
      className={cn(
        "body-4 absolute right-[23px] top-[52%] box-content h-[32px] w-full max-w-[40px] translate-y-[-50%] items-center justify-center text-grayscale-dark",
        (timer.state === "wait" || timer.state === "success") &&
          "text-grayscale-light",
      )}
    >
      {`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}
    </Row>
  );
}

function MaxLengthView({
  maxLength,
  inputLength,
}: {
  maxLength: number;
  inputLength: number;
}) {
  return (
    <Row
      className={cn(
        "body-4 absolute right-[23px] top-[52%] box-content h-[32px] w-full max-w-[40px] translate-y-[-50%] items-center justify-center text-grayscale-dark",
      )}
    >
      {inputLength === 0
        ? `0/ ${maxLength}`
        : `${inputLength?.toString().padStart(2, "0")}/${maxLength}`}
    </Row>
  );
}

function ToggleShowPassword({
  TransTypeHandler,
  transType,
  type,
  value,
  disabled,
}: any) {
  if (type !== "password" || disabled) return null;

  if (!!value)
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          TransTypeHandler((type: string) =>
            type === "password" ? "text" : "password",
          );
        }}
        className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}
      >
        {transType === "password" ? <IconEyeOn /> : <IconEyeOff />}
      </button>
    );
}
function ErrorMessage({ errorMessage }: { errorMessage?: string }) {
  if (!errorMessage) return;
  return (
    <Row className={"body-7 ml-[15px] text-secondary-red"}>{errorMessage}</Row>
  );
}
export function CheckButton() {
  return (
    <Row className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}>
      <IconCheck />
    </Row>
  );
}

function TextIconButton({
  valueHandler,
  disable,
  value,
  type,
  errorMessage,
}: {
  valueHandler: any;
  type: string;
  disable?: boolean;
  value: string;
  errorMessage?: string;
}) {
  if (disable || type !== "text") return null;
  if (!!errorMessage) return <CheckButton />;
  if (!!value)
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          valueHandler("");
        }}
        className={"absolute right-[15px] top-[50%] translate-y-[-50%]"}
      >
        <IconX />
      </button>
    );
}

export {
  SendMailButton,
  Timer,
  ToggleShowPassword,
  ErrorMessage,
  TextIconButton,
  MaxLengthView,
};
