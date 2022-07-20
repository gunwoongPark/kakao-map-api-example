import './App.css';

import React, { useState, useEffect, useRef } from 'react';

// dummy data
import { currentLocationCoordinate } from './dummy';

// img
import currentLocation from './assets/currentLocation.svg';

export default function App() {
  // useRef
  const mapContainer = useRef(null);

  // useState
  const [map, setMap] = useState(null);
  const [centerCoordinate, setCenterCoordinate] = useState('');

  const [overlayList, setOverlayList] = useState([]);

  // 지도 생성
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(currentLocationCoordinate.latitude, currentLocationCoordinate.longitude), //지도의 중심좌표.
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
      position: new window.kakao.maps.LatLng(currentLocationCoordinate.latitude, currentLocationCoordinate.longitude),
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

  useEffect(() => {
    if (!!map) {
      // 커스텀 오버레이 생성 함수
      const makeCustomOverlay = (name) => ``;
    }
  }, [map]);

  // function
  const onClickMoveCurrentLocation = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      currentLocationCoordinate.latitude,
      currentLocationCoordinate.longitude,
    );
    map.panTo(moveLatLon);
  };

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
