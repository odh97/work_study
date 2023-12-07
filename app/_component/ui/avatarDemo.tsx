"use client";

import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import nextImage from "./../../../public/user.png";
import Image from "next/image";

/**
 * 아바타 기능으로 이미지가 없을 경우 텍스트 및 이미지로 대체
 * 프로필 이미지 등에 사용
 * */
export default function AvatarDemo() {
  const object = [
    {
      url: "https://images.unsplash.com/photo-14926asdfsf33423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      alt: "Colm Tuite",
    },
    {
      url: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
      alt: "Pedro Duarte",
    },
  ];

  return (
    <div className={"flex h-[50px] w-[150px] justify-between overflow-hidden"}>
      {object.map((item, index) => {
        return (
          <Avatar.Root key={index} className="AvatarRoot">
            <Avatar.Image
              className="h-[50px] w-[50px] rounded-full"
              src={item.url}
              alt={item.alt}
            />
            <Avatar.Fallback className="AvatarFallback" delayMs={600}>
              <div className={"h-[50px] w-[50px] rounded-full bg-green-400"}>
                <Image
                  className={"ml-[10px] w-[30px] pt-[8px]"}
                  src={nextImage}
                  alt={"대체이미지"}
                />
              </div>
            </Avatar.Fallback>
          </Avatar.Root>
        );
      })}
    </div>
  );
}
