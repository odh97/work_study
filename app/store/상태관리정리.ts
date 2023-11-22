import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

//사용법 정리
interface StoreType {
  name: string;
  age: number;
  add: (by: any) => void;
}
export const useStore = create<StoreType>((set) => ({
  name: "Michel",
  age: 30,
  // 함수를 통해 특정 기능을 구현할 수 있다.
  // 클라이언트의 값을 파라미터 값으로 받아와서 상태를 업데이트하는데 사용한다.
  add: (by: any) => {
    console.log("add in by: " + by);
    // set 함수는 상태를 업데이트하는 함수이다.
    // set 파라미터로 업데이틀할 상태를 받는다.
    // return 값을 통해 업데이트할 상태를 반환한다.
    // 반환 값의 타입을 지정해줘야 한다.
    set((pram): { age: number } => {
      console.log("set in pram: " + pram.age);
      console.log("set in pram: " + pram.age);
      return { age: pram.age + by };
    });
  },
}));
interface StoreObjType {
  state: {
    id: number | null;
    name: string;
    phone: number | null;
    gender: string;
    portfolio: File | null;
    field: string;
    week_work: boolean[] | null;
    addressObj: {
      address: string;
      roadAddress: string;
      detailAddress: string;
      mapX: number | null;
      mapY: number | null;
    };
  };
  textAdd: (actionPayload: string) => void;
  numberAdd: (actionPayload: number) => void;
  fetch: (actionPayload: string) => void;
}
export const useStoreObj = create<StoreObjType>((set) => ({
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
  textAdd: (actionPayload) => {
    set((state) => {
      return {
        state: { ...state.state, name: actionPayload },
      };
    });
  },
  numberAdd: (actionPayload) => {
    set((state) => {
      return {
        state: { ...state.state, age: actionPayload },
      };
    });
  },
  fetch: async (actionPayload) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    set({ state: await response.json() });
  },
}));
