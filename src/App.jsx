import './App.css';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// img
import currentLocation from './assets/currentLocation.svg';

export default function App() {
  // useRef
  const mapContainer = useRef(null);
  const currentLocationCoordinate = useRef({ latitude: 37.506214, longitude: 127.053397 });
  const pointList = useRef([
    { id: 1, name: '바나프레소', coordinate: { latitude: 37.505926, longitude: 127.052625 } },
    { id: 2, name: '이차돌', coordinate: { latitude: 37.503442, longitude: 127.051681 } },
    { id: 3, name: '지구당', coordinate: { latitude: 37.505252, longitude: 127.050335 } },
  ]);

  // useState
  const [map, setMap] = useState(null);
  const [centerCoordinate, setCenterCoordinate] = useState('');

  const [overlayList, setOverlayList] = useState([]);

  // 지도 생성
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(
        currentLocationCoordinate.current.latitude,
        currentLocationCoordinate.current.longitude,
      ), //지도의 중심좌표.
      level: 3,
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(mapContainer.current, options);

    // 축척 제한
    map.setMinLevel(1);
    map.setMaxLevel(12);

    // 내 위치 마커(image) 세팅
    const imageSize = new window.kakao.maps.Size(125, 125);
    const imageOption = { offset: new window.kakao.maps.Point(62.5, 62.5) };

    const markerImage = new window.kakao.maps.MarkerImage(currentLocation, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        currentLocationCoordinate.current.latitude,
        currentLocationCoordinate.current.longitude,
      ),
      image: markerImage,
    });

    marker.setMap(map);

    // 지도에 이벤트 등록
    // 중심좌표 변경
    window.kakao.maps.event.addListener(map, 'center_changed', () => {
      setCenterCoordinate(`중심좌표의 위도 : ${map.getCenter().getLat()} 경도 ${map.getCenter().getLng()}`);
    });

    // setState
    setMap(map);
  }, []);

  // 커스텀 오버레이 onClick 함수 window 객체에 선언
  useEffect(() => {
    window.customOverlayOnClick = (id) => {
      console.log(id);
    };

    return () => delete window.customOverlayOnClick;
  }, []);
  // 커스텀 오버레이 생성
  useEffect(() => {
    if (!!map) {
      // 커스텀 오버레이 생성 함수
      const makeCustomOverlay = (point) => {
        console.log(point);

        return `
        <div class="bubble_wrap" onClick="customOverlayOnClick(${point.id})">
          <div class="bubble ${point.isClicked ? 'sky' : 'black'}">
            <p>${point.name}</p>
          </div>
        </div>
        `;
      };

      pointList.current.forEach((point) => {
        const overlay = new window.kakao.maps.CustomOverlay({
          map,
          clickable: true,
          position: new window.kakao.maps.LatLng(point.coordinate.longitude, point.coordinate.latitude),
          content: makeCustomOverlay(point),
        });

        setOverlayList((prevList) => [...prevList, overlay]);
      });
    }
  }, [map]);

  // function
  const onClickMoveCurrentLocation = useCallback(() => {
    const moveLatLon = new window.kakao.maps.LatLng(
      currentLocationCoordinate.current.latitude,
      currentLocationCoordinate.current.longitude,
    );
    map.panTo(moveLatLon);
  }, [map]);

  return (
    <div className="App">
      <div className="map-container" ref={mapContainer} />
      <button onClick={() => map.setLevel(map.getLevel() - 1)}>확대</button>
      <button onClick={() => map.setLevel(map.getLevel() + 1)}>축소</button>
      <button onClick={onClickMoveCurrentLocation}>내 위치로 위동</button>
      <p>{centerCoordinate && centerCoordinate}</p>
    </div>
  );
}
