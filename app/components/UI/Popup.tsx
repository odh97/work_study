"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Col from "@/components/Layout/Col";
import IconFaceBook from "@/assets/images/icon-facebook-dark.png";
import IconKakao from "@/assets/images/icon-kakaotalk-light.png";
import IconTwitter from "@/assets/images/icon-twitter-dark.png";
import Image from "next/image";
import { cn } from "@/app/lib/utills";
import { IconClose } from "@/assets/svg/dynamic/svgList";
import ButtonLarge from "@/components/UI/button/ButtonLarge";
import RadioBox from "@/components/UI/RadioBox";
import IconStarLinear from "@/assets/svg/static/icon-star-linear.svg";
import IconStarSolid from "@/assets/svg/static/icon-star-solid.svg";
import Row from "../Layout/Row";
import Textarea from "@/components/UI/Textarea";
import Search from "@/components/UI/Search";
import Hashtag from "@/components/UI/Hashtag";
import ButtonLargeCp from "@/components/UI/button/ButtonLarge";
import useDebounce from "@/hook/useDebounce";
import { applyTag, findTags, reportComment } from "@/service/shareService";
import {
  ProviderBtn,
  ProviderBtnList,
} from "@/components/UI/button/ProviderBtn";
import { useUserStore } from "@/store/userStore";
import { useText } from "@/hook/useText";
import Loading from "@/components/UI/Loading";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toastStore";

declare global {
  interface Window {
    Kakao: any;
  }
}
interface PopupType {
  className?: string;
  children: React.ReactNode;
  title?: string;
  content?: React.ReactNode;
  handlerPopup?: string;
  resetSetString?: React.Dispatch<React.SetStateAction<string>>;
  resetSetNumber?: React.Dispatch<React.SetStateAction<number>>;
  resetSetBoolean?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Popup({
  className,
  children,
  title,
  content,
  resetSetString,
  resetSetNumber,
  resetSetBoolean,
}: PopupType) {
  const [popupOpen, setPopupOpen] = useState(true);

  function handleOpenChange() {
    setPopupOpen(!popupOpen);
    if (!popupOpen) {
      if (resetSetString) {
        resetSetString("");
      }
      if (resetSetNumber) {
        resetSetNumber(0);
      }
      if (resetSetBoolean) {
        resetSetBoolean(false);
      }
    }
  }

  return (
    <Dialog.Root
      onOpenChange={handleOpenChange}
      data-state={popupOpen ? "open" : "closed"}
    >
      <Dialog.Trigger className={className} asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            "fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center bg-[#00000030] backdrop-blur-sm"
          }
        >
          <Dialog.Content
            onOpenAutoFocus={(event) => {
              event.preventDefault();
            }}
            className={
              "relative w-[90%] overflow-hidden rounded-[10px] bg-grayscale-white px-[30px] pb-[30px] pt-[40px] text-center md:w-auto"
            }
          >
            {title && (
              <Dialog.Title className={"display-4 mb-[30px]"}>
                {title}
              </Dialog.Title>
            )}
            {content}
            <Dialog.Close
              asChild
              className={"absolute right-[20px] top-[20px]"}
            >
              <button className="IconButton" aria-label="Close">
                <IconClose className={"h-[26px] w-[26px]"} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ShareContentType {
  title?: string;
  summary?: string;
}
function ShareContent({ title, summary }: ShareContentType) {
  const { t } = useText("common");
  useEffect(() => {
    // 카카오 SDK 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // SDK 로드 완료 후 초기화
      if (window?.Kakao) {
        const Kakao = window?.Kakao;
        if (!Kakao.isInitialized()) {
          Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS);
        }
      }
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);
  const shareOnKakao = () => {
    if (window?.Kakao) {
      const Kakao = window?.Kakao;
      const imageUrl =
        window.location.origin + "/images/card-key-visual-lg.png";
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: summary,
          imageUrl: imageUrl, // 적절한 이미지 URL 사용
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };
  const buttonIcon = [
    {
      className: " mb-[10px] bg-[#FEE500]",
      image: IconKakao,
      alt: "IconKakao",
      text: t("share_kakao"),
      event: shareOnKakao,
    },
    {
      className: " mb-[10px] text-grayscale-white bg-[#0062E0]",
      image: IconFaceBook,
      alt: "IconFaceBook",
      text: t("share_facebook"),
      event: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href,
        )}`;
        window.open(shareUrl, "_blank");
      },
    },
    {
      className: "text-grayscale-white bg-[#4D4D53]",
      image: IconTwitter,
      alt: "IconTwitter",
      text: t("share_twitter"),
      event: () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href,
        )}`;
        window.open(shareUrl, "_blank");
      },
    },
  ];
  return (
    <Col className={"emphasis-3 items-center overflow-hidden md:w-[330px]"}>
      {buttonIcon.map(({ image, alt, text, className, event }, index) => (
        <button
          key={index}
          className={cn(
            "relative h-[45px] w-full max-w-[330px] rounded-[9999px] bg-grayscale-light leading-[45px]",
            className,
          )}
          onClick={event}
        >
          <Image
            className={
              "max-fd:hidden absolute left-[20px] top-[9px] h-[26px] w-[26px]"
            }
            src={image}
            alt={alt}
          />
          {text}
        </button>
      ))}
    </Col>
  );
}
interface ReportContentType {
  reportType: "ScamPostComment" | "ScamDictionaryComment" | "Review";
  pid: string | number;
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
}
function ReportContent({
  reportType,
  pid,
  radioValue,
  setRadioValue,
}: ReportContentType) {
  const { showToast } = useToastStore();

  const ReportList = [
    {
      id: "1",
      text: "원치 않는 상업성 콘텐츠 또는 스팸",
    },
    {
      id: "2",
      text: "포르노 또는 음란물",
    },
    {
      id: "3",
      text: "아동 학대",
    },
    {
      id: "4",
      text: "증오심 표현 또는 폭력적인 어휘",
    },
    {
      id: "5",
      text: "범죄 조장",
    },
    {
      id: "6",
      text: "괴롭힘 또는 폭력",
    },
    {
      id: "7",
      text: "자살 또는 자해",
    },
    {
      id: "8",
      text: "잘못된 정보",
    },
  ];

  const { mutate } = useMutation({
    mutationFn: reportComment,
    onSuccess: (res) => {
      showToast({
        title: "신고가 접수되었습니다.",
        description: res.result,
        type: "success",
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        return showToast({
          title: "신고가 접수되지 않았습니다.",
          description: err.message,
          type: "error",
        });
      }
      showToast({
        title: "신고가 접수되지 않았습니다.",
        description: "This comment was previously reported.",
        type: "error",
      });
    },
  });
  function handleReviewReport() {
    mutate({ msg: radioValue, reportType: reportType, pid: pid.toString() });
  }
  return (
    <div className={"w-full overflow-hidden md:w-[330px]"}>
      <RadioBox
        className={"max-fd:whitespace-nowrap"}
        containerClassName={"flex flex-col gap-[15px] mb-[30px]"}
        list={ReportList}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />
      <Dialog.Close asChild>
        <ButtonLarge onClick={handleReviewReport} disabled={!radioValue}>
          신고
        </ButtonLarge>
      </Dialog.Close>
      <Dialog.Close asChild>
        <button
          className={"IconButton mt-[25px] text-primary"}
          aria-label="Close"
        >
          취소
        </button>
      </Dialog.Close>
    </div>
  );
}

function TagContent({
  myList,
  myListHandler,
  optionTags,
  optionTagsHandler,
}: {
  myList: { index: number; tag: string }[] | undefined;
  myListHandler: Function;
  optionTagsHandler: Function;
  optionTags: { index: number; tag: string }[];
}) {
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<{ index: number; tag: string }[]>([]);
  const [newTag, setNewTag] = useState<{ index: number; tag: string }>({
    index: -1,
    tag: "",
  });

  const debouncedValue = useDebounce(search);

  useEffect(() => {
    getTags();
    setNewTag({ index: -1, tag: "" });
  }, [debouncedValue]);

  useEffect(() => {
    if (!!myList) {
      optionTagsHandler([...myList, ...optionTags]);
    }
    return () => {
      optionTagsHandler([]);
      setNewTag({ index: -1, tag: "" });
    };
  }, []);

  async function getTags() {
    if (debouncedValue.length > 0) {
      try {
        const res = await findTags(debouncedValue);
        setList(res);
      } catch (e) {
        setList([]);
      }
    }
  }

  async function applyNewTag() {
    if (newTag.index !== -1) {
      optionTagsHandler((myList1: any) => [...myList1, newTag]);
      return;
    }
    try {
      const res = await applyTag(debouncedValue);
      optionTagsHandler((myList1: any) => [...myList1, res]);
      setNewTag(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Col className={"w-[540px] max-w-full gap-[30px]"}>
      <Search
        placeholderText={"키워드를 입력해주세요."}
        value={search}
        valueHandler={setSearch}
      />
      <Col className={"gap-[10px]"}>
        <Row>검색결과</Row>
        <Row className={"flex-wrap gap-[10px]"}>
          {list.length > 0 ? (
            <>
              {debouncedValue.length > 0 &&
                !list.find((item1) => item1.tag === debouncedValue) && (
                  <Hashtag
                    key={"newTag"}
                    onClick={applyNewTag}
                    disabled={optionTags?.some(
                      (item1) => item1.index === newTag.index,
                    )}
                  >
                    {debouncedValue}
                  </Hashtag>
                )}
              {list.map((item, index) => {
                return (
                  <Hashtag
                    key={index}
                    onClick={() =>
                      optionTagsHandler((myList1: any) => [...myList1, item])
                    }
                    disabled={optionTags?.some(
                      (item1) => item1.index === item.index,
                    )}
                  >
                    {item.tag}
                  </Hashtag>
                );
              })}
            </>
          ) : debouncedValue.length > 0 ? (
            <Row>
              <Hashtag
                onClick={applyNewTag}
                disabled={optionTags?.some(
                  (item1) => item1.index === newTag.index,
                )}
              >
                {debouncedValue}
              </Hashtag>
            </Row>
          ) : (
            <Row>키워드를 입력해주세요</Row>
          )}
        </Row>
      </Col>
      <Col className={"gap-[10px]"}>
        <Row>태그</Row>
        <Row className={"flex-wrap gap-[10px]"}>
          {optionTags.length === 0 ? (
            <Row>선택된 태그가 없습니다.</Row>
          ) : (
            optionTags.map((item, index) => {
              return (
                <Hashtag
                  key={index}
                  deleteIcon={true}
                  onClick={() => {
                    optionTagsHandler((myList1: any) =>
                      myList1.filter(
                        (item1: any) => item1.index !== item.index,
                      ),
                    );
                  }}
                >
                  {item.tag}
                </Hashtag>
              );
            })
          )}
        </Row>
      </Col>
      <Dialog.Close asChild>
        <ButtonLargeCp
          aria-label="Close"
          onClick={() => myListHandler(optionTags)}
        >
          확인
        </ButtonLargeCp>
      </Dialog.Close>
    </Col>
  );
}

interface ReviewContentType {
  expertName?: string;
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
  errorText?: string;
  textareaError: boolean;
  setTextareaError?: React.Dispatch<React.SetStateAction<boolean>>;
}
function ReviewContent({
  expertName,
  star,
  setStar,
  textValue,
  setTextValue,
  onClick,
  errorText,
  textareaError,
  setTextareaError,
}: ReviewContentType) {
  const reviewStar = [1, 2, 3, 4, 5];

  function handlerReviewStar(star: number, item: number) {
    if (star === item) {
      return setStar(0);
    }
    setStar(item);
  }

  return (
    <div
      className={"relative w-full items-center overflow-hidden md:w-[540px]"}
    >
      <Row className={"justify-center gap-[5px]"}>
        {reviewStar.map((item, index) => {
          return (
            <Image
              key={index}
              className={"score cursor-pointer"}
              src={star < item ? IconStarLinear : IconStarSolid}
              alt={"starImg"}
              onClick={() => handlerReviewStar(star, item)}
            />
          );
        })}
      </Row>
      <p className={"display-5 mt-[10px] text-grayscale-dark"}>{star}.0</p>
      <Textarea
        placeholder={expertName + "님에 대한 의뢰 후기를 작성해주세요."}
        inputClassName={"mt-[30px] border-[#00000030] h-[300px] md:h-[200px]"}
        setInputValue={setTextValue}
        errorText={errorText ?? "error"}
        errorToggle={textareaError}
        setErrorToggle={setTextareaError}
      />
      <div>
        {textValue.length >= 5 && textValue.length <= 300 ? (
          <Dialog.Close asChild>
            <ButtonLarge
              aria-label="Close"
              disabled={!textValue}
              onClick={onClick}
              className={"mt-[30px]"}
            >
              작성하기
            </ButtonLarge>
          </Dialog.Close>
        ) : (
          <ButtonLarge
            disabled={!textValue}
            onClick={onClick}
            className={"mt-[30px]"}
          >
            작성하기
          </ButtonLarge>
        )}
      </div>
    </div>
  );
}

function AddCase() {
  const { oauthLogin } = useUserStore((state) => state);
  const { t } = useText("account");
  return (
    <Col className={"max-w-full gap-[30px] md:w-[330px]"}>
      <Col>
        <ProviderBtnList className={"max-w-full"}>
          <ProviderBtn type={"naver"} onClick={() => oauthLogin("naver")}>
            {t("naver")}
          </ProviderBtn>
          <ProviderBtn type={"kakao"} onClick={() => oauthLogin("kakao")}>
            {t("kakao")}
          </ProviderBtn>
          <ProviderBtn
            type={"google"}
            style={{ border: "1px solid gray" }}
            onClick={() => oauthLogin("google")}
          >
            {t("google")}
          </ProviderBtn>
        </ProviderBtnList>
      </Col>
      <Row className={"h-[21px] items-center justify-center"}>
        <a className={"body-4"} href={"/account/login"}>
          {t("login")}
        </a>
        <div className={"mx-[1.25rem] w-[1px] text-grayscale-light"}>|</div>
        <a className={"body-4"} href={"/account/register"}>
          {t("email_register")}
        </a>
        <div className={"mx-[1.25rem] w-[1px] text-grayscale-light"}>|</div>
        <a className={"body-4"} href={"/account/reset-password"}>
          {t("find_pwd")}
        </a>{" "}
      </Row>
    </Col>
  );
}

Popup.displayName = "Popup";
Popup.AddCase = AddCase;
Popup.Share = ShareContent;
Popup.Report = ReportContent;
Popup.Tag = TagContent;
Popup.Review = ReviewContent;
