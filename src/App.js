import './App.css';

import React, { useState, useEffect, useRef } from 'react';

function App() {
  const mapContainer = useRef(null);

  const [map, setMap] = useState(null);
  const [centerCoordinate, setCenterCoordinate] = useState('');

  // 지도 생성
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(37.506214, 127.053397), //지도의 중심좌표.
      level: 3,
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(mapContainer.current, options);

    // 축척 제한
    map.setMinLevel(1);
    map.setMaxLevel(12);

    // 지도에 이벤트 등록
    // 중심좌표 변경
    window.kakao.maps.event.addListener(map, 'center_changed', () => {
      setCenterCoordinate(`중심좌표의 위도 : ${map.getCenter().getLat()} 경도 ${map.getCenter().getLng()}`);
    });

    // setState
    setMap(map);
  }, []);

  // function
  const onClickMoveCurrentLocation = () => {
    const moveLatLon = new window.kakao.maps.LatLng(37.506214, 127.053397);
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

export default App;
