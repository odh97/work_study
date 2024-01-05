"use client";
import Card from "@/components/Layout/Card";
import { Input } from "@/components/UI/Input";
import React, { useEffect, useState } from "react";
import Form from "@/components/Layout/Form";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import Col from "@/components/Layout/Col";
import CheckBox from "@/components/UI/CheckBox";
import Row from "@/components/Layout/Row";
import { SendMailButton, Timer } from "@/components/UI/InputIcon";
import useDebounce from "@/hook/useDebounce";
import { localRegister, verifyAuthCode } from "@/service/authService";
import { useToastStore } from "@/store/toastStore";
import { useText } from "@/hook/useText";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(() => {
    return {
      time: 300,
      state: "wait",
    };
  });
  const [emailError, setEmailError] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [certificationNumberError, setCertificationNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(certificationNumber);
  const { showToast, setOpen, open } = useToastStore((state) => state);
  const { t } = useText("account");

  useEffect(() => {
    if (debouncedValue.length < 6) return;
    verifyAuthCode(email, debouncedValue, "email")
      .then((r) => {
        setCertificationNumberError("");
        setTimer((timer) => {
          return {
            ...timer,
            state: "success",
          };
        });
      })
      .catch((e) => {
        setCertificationNumberError(e.message);
      });
  }, [debouncedValue]);

  useEffect(() => {
    if (checkAll) {
      setCheck1(true);
      setCheck2(true);
      setCheck3(true);
    } else {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
    }
  }, [checkAll]);

  async function onSubmit(e: any) {
    e.preventDefault();
    const isEmailError = !email ? t("error_email_null") : "";
    const isCertificationNumberError = !certificationNumber
      ? t("error_authcode_null")
      : "";
    const isPasswordError = !password ? t("error_pwd_null") : "";
    const isPasswordCheckError = !passwordCheck
      ? t("error_pwdcheck_null")
      : passwordCheck !== password
      ? t("error_pwdcheck_notsame")
      : "";

    setEmailError(isEmailError);
    setCertificationNumberError(isCertificationNumberError);
    setPasswordError(isPasswordError);
    setPasswordCheckError(isPasswordCheckError);

    if (
      !!email &&
      !!certificationNumber &&
      !!password &&
      !!passwordCheck &&
      isPasswordCheckError === "" &&
      isPasswordError === "" &&
      isCertificationNumberError === "" &&
      isEmailError === "" &&
      check3 &&
      check2 &&
      check1
    ) {
      setIsLoading(true);
      // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register?email=${email}&password=${password}&passwordCheck=${passwordCheck}&check3=${check3}&check2=${check2}&check1=${check1}&authCode=${certificationNumber}`;

      await localRegister({
        email,
        password,
        passwordCheck,
        check3,
        check2,
        check1,
        authCode: certificationNumber,
      })
        .then(() => {
          window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}`;
        })
        .catch((e) => {
          showToast({
            description: e.message,
            title: "오류발생",
            type: "fail",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function timerHandler(state: string) {
    setTimer(() => {
      return {
        time: 300,
        state: state,
      };
    });
    showToast({
      description: t("toast_authcode_send"),
      title: t("mail_send"),
      type: "success",
    });
  }

  return (
    <Card
      className={"max-w-[29.375rem] px-[1.25rem] py-[1.875rem] md:px-[2.5rem]"}
    >
      <Form onSubmit={(e) => onSubmit(e)} className={"gap-[1.25rem]"}>
        <Input
          id={"email"}
          value={email}
          valueHandler={setEmail}
          label={t("email")}
          placeholder={t("email_placeholder")}
          maxWidth={"max-w-full"}
          errorMessage={emailError}
          otherIcon={
            <SendMailButton
              value={email}
              label={t("button_send")}
              setErrorMessage={setEmailError}
              trigger={timerHandler}
            />
          }
        />
        {timer.state !== "wait" && (
          <Input
            id={"certification-number"}
            value={certificationNumber}
            valueHandler={setCertificationNumber}
            label={t("authcode")}
            placeholder={t("error_authcode_null")}
            maxWidth={"max-w-full"}
            disabled={timer.state === "success"}
            errorMessage={certificationNumberError}
            otherIcon={<Timer timer={timer} setTimer={setTimer} />}
          />
        )}
        <Input
          id={"password"}
          value={password}
          type={"password"}
          valueHandler={setPassword}
          label={t("pwd")}
          placeholder={t("pwd_placeholder")}
          maxWidth={"max-w-full"}
          errorMessage={passwordError}
        />
        <Input
          id={"password-check"}
          type={"password"}
          value={passwordCheck}
          valueHandler={setPasswordCheck}
          label={t("pwd_check")}
          placeholder={t("error_pwdcheck_null")}
          maxWidth={"max-w-full"}
          errorMessage={passwordCheckError}
        />
        <Row className={"ml-[0.938rem]"}>
          <CheckBox
            id={"checkBox"}
            labelToggle={true}
            checked={check1 && check2 && check3}
            setChecked={() => {
              setCheckAll((check) => !check);
            }}
          >
            {t("all_agree")}
          </CheckBox>
        </Row>

        <hr />
        <Col className={"ml-[0.938rem] gap-[0.938rem]"}>
          <CheckBox
            id={"checkBox1"}
            labelToggle={true}
            checked={check1}
            setChecked={setCheck1}
          >
            {t("agree_1")}
          </CheckBox>
          <CheckBox
            id={"checkBox2"}
            labelToggle={true}
            checked={check2}
            setChecked={setCheck2}
          >
            {t("agree_2")}
          </CheckBox>
          <CheckBox
            id={"checkBox3"}
            labelToggle={true}
            checked={check3}
            setChecked={setCheck3}
          >
            {t("agree_3")}
          </CheckBox>
        </Col>
        <ButtonLargeCp
          className={"md:max-w-full"}
          type={"submit"}
          disabled={
            !(
              check1 &&
              check2 &&
              check3 &&
              !!email &&
              !!password &&
              !!passwordCheck &&
              !!certificationNumber
            )
          }
        >
          {isLoading ? "" : t("register_success")}
        </ButtonLargeCp>
      </Form>
    </Card>
  );
}
