"use client";
import Card from "@/components/Layout/Card";
import { Input } from "@/components/UI/Input";
import React, { useState } from "react";
import Form from "@/components/Layout/Form";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import Row from "@/components/Layout/Row";
import { useText } from "@/hook/useText";
import {
  ProviderBtn,
  ProviderBtnList,
} from "@/components/UI/button/ProviderBtn";
import { useUserStore } from "@/store/userStore";
import { emailLogin } from "@/service/authService";
import { useToastStore } from "@/store/toastStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { oauthLogin } = useUserStore((state) => state);
  const { t } = useText("account");
  const { showToast } = useToastStore((state) => state);

  async function onSubmit(e: any) {
    e.preventDefault();
    const isEmailError = !email ? t("error_email_null") : "";
    const isPasswordError = !password ? t("error_pwd_null") : "";
    setEmailError(isEmailError);
    setPasswordError(isPasswordError);
    await emailLogin(email, password)
      .then(() => {
        const addCase = localStorage.getItem("addCase");
        if (!!addCase) {
          window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/add-case`;
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}`;
        }
      })
      .catch((e) => {
        console.log(e);
        showToast({
          type: "error",
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      });
  }
  return (
    <>
      <Card
        className={
          "max-w-[29.375rem] gap-[1.875rem] px-[1.25rem] py-[1.875rem] md:px-[2.5rem]"
        }
      >
        <Form className={"gap-[1.25rem]"} onSubmit={(e) => onSubmit(e)}>
          <Input
            id={"email"}
            value={email}
            valueHandler={setEmail}
            label={t("email")}
            placeholder={t("email_placeholder")}
            maxWidth={"max-w-full"}
            errorMessage={emailError}
          />
          <Input
            id={"password"}
            type={"password"}
            value={password}
            valueHandler={setPassword}
            label={t("pwd")}
            placeholder={t("pwd_placeholder")}
            maxWidth={"max-w-full"}
            errorMessage={passwordError}
          />
          <ButtonLargeCp className={"md:max-w-full"} type={"submit"}>
            {t("login")}
          </ButtonLargeCp>
        </Form>
        <Row className={"h-[21px] items-center justify-center"}>
          <a className={"body-4"} href={"/account/reset-password"}>
            {t("find_pwd")}
          </a>{" "}
          <div className={"mx-[1.25rem] w-[1px] text-grayscale-light"}>|</div>
          <a className={"body-4"} href={"/account/register"}>
            {t("email_register")}
          </a>
        </Row>
      </Card>
      <ProviderBtnList>
        <ProviderBtn type={"naver"} onClick={() => oauthLogin("naver")}>
          {t("naver")}
        </ProviderBtn>
        <ProviderBtn type={"kakao"} onClick={() => oauthLogin("kakao")}>
          {t("kakao")}
        </ProviderBtn>
        <ProviderBtn type={"google"} onClick={() => oauthLogin("google")}>
          {t("google")}
        </ProviderBtn>
        {/*<ProviderBtn type={"apple"} onClick={() => alert("apple")}>*/}
        {/*  {t("apple")}*/}
        {/*</ProviderBtn>*/}
      </ProviderBtnList>
    </>
  );
}
