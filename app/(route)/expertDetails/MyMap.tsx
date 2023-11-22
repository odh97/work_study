"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useExpertStore } from "@/app/_store/store";

export default function MyMap() {
  const { state, infoAdd } = useExpertStore();

  // 구글 지도
  const mapRef = useRef<HTMLDivElement>(null);
  const initMap = async () => {
    // google maps API load
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    // Map 생성 및 추가 기능 구현
    const { Map } = await loader.importLibrary("maps");
    const { Marker } = await loader.importLibrary("marker");
    const Geometry = new google.maps.Geocoder();

    const position = {
      lat: 37.5665,
      lng: 126.978,
    };

    // navigator 위치 값 가져오기
    navigator.geolocation.getCurrentPosition((val: GeolocationPosition) => {
      position.lat = val.coords.latitude;
      position.lng = val.coords.longitude;

      // map options
      const mapOption: google.maps.MapOptions = {
        center: position,
        zoom: 15,
      };

      // map 생성
      // marker 생성
      const map = new Map(mapRef.current as HTMLDivElement, mapOption);
      // const marker = new Marker({
      //   position,
      //   map,
      // });
      const marker = new Marker({
        map: map,
        position: position,
        title: "Uluru",
      });
    });
  };

  // 네이버 지도
  const mapRef2 = useRef<HTMLDivElement>(null);
  const initMap2 = () => {
    try {
      if (mapRef2.current === null) return;
      // naverMap
      // useExpertStore의 state.addressObj의 mapX, mapY 가져와서 네이버 지도에 표시
      // x: "127.1063239" === lng;
      // y: "37.3646140" === lat
      const options = { lat: 37.364614, lng: 127.1063239 };
      const naverMap = new naver.maps.Map(mapRef2.current, {
        center: new naver.maps.LatLng(options),
        zoom: 17,
        zoomControl: true,
      });
      let myMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(options),
        map: naverMap,
      });

      // 마커 html 생성
      // useExpertStore의 state.addressObj의 address, roadAddress, detailAddress 가져와서 마커 html에 표시
      let contentString = [
        '<div class="iw_inner p-3">',
        "   <h3>서울특별시청</h3>",
        "   <p>이곳은 address<br></p>",
        "   <p>이곳은 roadAddress<br></p>",
        "   <p>이곳은 detailAddress<br></p>",
        "</div>",
      ].join("");

      let infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });
      infowindow.open(naverMap, myMarker);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initMap();
    initMap2();
  }, []);

  return (
    <div className={"mt-3"}>
      <h2>구글 지도</h2>
      <div ref={mapRef} className={"h-[600px] w-full"}></div>

      <h2>네이버 지도</h2>
      <div ref={mapRef2} className={"h-[600px] w-full"}></div>
    </div>
  );
}
