"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";

export default function MyMap() {
  // 구글 지도
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      // google maps api load
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

    initMap();
  }, []);

  // 네이버 지도
  const mapRef2 = useRef<HTMLDivElement>(null);
  const initMap2 = () => {
    if (mapRef2.current === null) return;
    // naverMap
    const options = { lat: 37.71344096516783, lng: 126.8666797982575 };
    const naverMap = new naver.maps.Map(mapRef2.current, {
      center: new naver.maps.LatLng(options),
      zoom: 15,
      zoomControl: true,
    });
    let breweryMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(options),
      map: naverMap,
    });
  };

  useEffect(() => {
    initMap2();
  }, []);

  //네이버 검색
  const [addressLookup, setAddressLookup] = useState<null | string>(null);
  async function addressLookupFn() {
    const axiosData = await axios.get(
      "http://localhost:3000/api/naverAPI?query=" + addressLookup,
    );
    const axiosDataJson = axiosData.data;
    console.log(axiosDataJson);
  }
  return (
    <div className={"mt-3"}>
      <h2>구글 지도</h2>
      <div ref={mapRef} className={"h-[600px] w-full"}></div>
      <h2>네이버 주소 조회</h2>
      <div>
        <input
          onChange={(e) => {
            setAddressLookup(e.target.value);
          }}
        />
        <button onClick={addressLookupFn}>주소 조회하기</button>
      </div>
      <h2>네이버 지도</h2>
      <div ref={mapRef2} className={"h-[600px] w-full"}></div>
    </div>
  );
}
