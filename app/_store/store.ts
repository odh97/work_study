import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";
import { ExpertStoreType } from "./storeCreateType";

export const useExpertStore = create<ExpertStoreType>()(
  devtools((set) => ({
    state: {
      id: null,
      name: "",
      phone: null,
      gender: "",
      portfolio: null,
      field: "",
      week_work: null,
      addressObj: {
        address: "",
        roadAddress: "",
        detailAddress: "",
        mapX: null,
        mapY: null,
      },
    },
    getInfo: () => {
      return set((state) => {
        // 미진행
        // db 데이터 조회
        // 없을 경우 로컬 데이터 조회
        // 로컬에도 없을 경우 초기값 리턴
        return state;
      });
    },
    setInfo: () => {
      return set((state) => {
        // 미진행
        // 로컬에 데이터 저장
        // 완성시 로컬 데이터 삭제 및 db에 데이터 저장
        return state;
      });
    },
    infoAdd: (actionPayload) => {
      set((state) => {
        const { data, type } = actionPayload;
        console.log(data, type);
        let copy = { ...state.state };

        switch (type) {
          case "basicInfo":
            const formDataFile =
              data.portfolio.size <= 1 ? null : data.portfolio;
            copy.name = data.name;
            copy.phone = data.phone;
            copy.gender = data.gender;
            copy.portfolio = formDataFile;
            copy.field = data.field;
            copy.week_work = data.week_work;

            break;
          case "addressInfo":
            copy.addressObj = {
              address: data.address,
              roadAddress: data.roadAddress,
              detailAddress: data.detailAddress,
              mapX: data.mapX,
              mapY: data.mapY,
            };

            alert("비교하려는 값과 일치합니다.");
            break;
          default:
            alert("필수 입력란이 비어 있습니다.");
        }

        return {
          state: { ...state.state, ...copy },
        };
      });
    },
  })),
);
