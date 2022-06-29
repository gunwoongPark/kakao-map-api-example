import './App.css';

import React, { useRef, useEffect } from 'react';

function App() {
  const mapContainer = useRef(null);

  // 지도 생성
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(37.506214, 127.053397), //지도의 중심좌표.
      level: 3,
    };

    // 지도 생성
    new window.kakao.maps.Map(mapContainer.current, options);
  }, []);

  return (
    <div className="App">
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}

export default App;
