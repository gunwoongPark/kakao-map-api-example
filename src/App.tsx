import { useEffect, useRef, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  // useRef
  const mapContainer = useRef(null);
  const currentLocationCoordinate = useRef({
    latitude: 37.506214,
    longitude: 127.053397,
  });

  // useState
  const [map, setMap] = useState<any>(null);

  // useEffect
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(
        currentLocationCoordinate.current.latitude,
        currentLocationCoordinate.current.longitude
      ),
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(mapContainer.current, options);

    // 축척 제한
    map.setMinLevel(1);
    map.setMaxLevel(12);

    // 내 위치 마커 세팅
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        currentLocationCoordinate.current.latitude,
        currentLocationCoordinate.current.longitude
      ),
    });

    marker.setMap(map);

    setMap(map);
  }, []);

  return (
    <div className="App">
      <div className="map-container" ref={mapContainer} />
      <button onClick={() => map.setLevel(map.getLevel() - 1)}>확대</button>
      <button onClick={() => map.setLevel(map.getLevel() + 1)}>축소</button>
    </div>
  );
}

export default App;
