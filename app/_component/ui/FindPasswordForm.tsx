"use client";
import Card from "@/components/Layout/Card";
import { Input } from "@/components/UI/Input";
import React, { useState } from "react";
import Form from "@/components/Layout/Form";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import Image from "next/image";
import LoginIcon from "@/assets/images/login-icon.png";
import { Timer } from "@/components/UI/InputIcon";
import { useToastStore } from "@/store/toastStore";
import { sendTempPwd } from "@/service/authService";
import { useText } from "@/hook/useText";

export default function FindPasswordForm() {
  const { t } = useText("account");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [timer, setTimer] = useState(() => {
    return {
      time: 180,
      state: "wait",
    };
  });
  const { showToast } = useToastStore((state) => state);
  function timerHandler(state: string) {
    setTimer(() => {
      return {
        time: 180,
        state: state,
      };
    });
  }
  async function onSubmit(e: any) {
    e.preventDefault();
    setEmailError("");
    const isEmailError = !email ? t("error_email_null") : "";
    setEmailError(isEmailError);
    if (isEmailError) return;
    try {
      await sendTempPwd(email);
      timerHandler("running");
      showToast({
        title: t("toast_send_temppwd"),
        description: t("toast_send_temppwd_description"),
        type: "success",
      });
    } catch (error: any) {
      setEmailError(error.message);
    }
  }
  return (
    <Card
      className={
        "max-w-[29.375rem] gap-[0.625rem] px-[1.25rem] py-[1.875rem] md:px-[2.5rem]"
      }
    >
      <Image
        src={LoginIcon}
        alt={"find-password"}
        width={150}
        height={100}
        className={"mx-auto"}
        priority
      />
      <Form onSubmit={(e) => onSubmit(e)}>
        <Input
          id={"email"}
          value={email}
          valueHandler={setEmail}
          label={t("email")}
          placeholder={t("email_placeholder")}
          maxWidth={"max-w-full"}
          errorMessage={emailError}
          otherIcon={<Timer timer={timer} setTimer={setTimer} />}
        />
        <p
          className={
            "body-3 mb-[1.875rem] mt-[1.25rem] text-center text-grayscale-deep"
          }
        >
          {t("temppwd_description")}
        </p>
        <ButtonLargeCp
          className={"md:max-w-full"}
          type={"submit"}
          disabled={timer.state === "running"}
        >
          {t("temppwd_button")}
        </ButtonLargeCp>
      </Form>
    </Card>
  );
}
