import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
    onClickCustomOverlay: (id: number) => void;
  }
}

type PointType = {
  id: number;
  name: string;
  coordinate: { latitude: number; longitude: number };
  isClicked: boolean;
};

function App() {
  // useRef
  const mapContainer = useRef(null);
  const currentLocationCoordinate = useRef({
    latitude: 37.506214,
    longitude: 127.053397,
  });
  const pointList = useRef([
    {
      id: 1,
      name: "바나프레소",
      coordinate: { latitude: 37.505926, longitude: 127.052625 },
      isClicked: false,
    },
    {
      id: 2,
      name: "이차돌",
      coordinate: { latitude: 37.503442, longitude: 127.051681 },
      isClicked: false,
    },
    {
      id: 3,
      name: "지구당",
      coordinate: { latitude: 37.505252, longitude: 127.050335 },
      isClicked: false,
    },
  ]);

  // useState
  const [map, setMap] = useState<any>(null);
  const [centerCoordinate, setCenterCoordinate] = useState<string>("");

  // useEffect
  useEffect(() => {
    // 지도 옵션
    const options = {
      center: new window.kakao.maps.LatLng(
        currentLocationCoordinate.current.latitude,
        currentLocationCoordinate.current.longitude
      ),
      level: 4,
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

    // 이벤트 등록
    window.kakao.maps.event.addListener(map, "center_changed", () => {
      setCenterCoordinate(
        `중심좌표의 위도 : ${map.getCenter().getLat()} 경도 : ${map
          .getCenter()
          .getLng()}`
      );
    });

    setMap(map);
  }, []);

  useEffect(() => {
    window.onClickCustomOverlay = (id: number) => {
      console.log(id);
    };
  }, []);

  // 커스텀 오버레이 생성
  useEffect(() => {
    if (!!map) {
      const makeCustomOverlay = (point: PointType) => {
        return `
        <div class="bubble_wrap" onClick="onClickCustomOverlay(${point.id})">
          <div class="bubble ${point.isClicked ? "sky" : "black"}">
            <p>${point.name}</p>
          </div>
        </div>
        `;
      };

      pointList.current.forEach((point) => {
        new window.kakao.maps.CustomOverlay({
          map,
          clickable: true,
          position: new window.kakao.maps.LatLng(
            point.coordinate.latitude,
            point.coordinate.longitude
          ),
          content: makeCustomOverlay(point),
        });
      });
    }
  }, [map]);

  // function
  const onClickMoveCurrentLocation = useCallback(() => {
    const moveLatLng = new window.kakao.maps.LatLng(
      currentLocationCoordinate.current.latitude,
      currentLocationCoordinate.current.longitude
    );
    map.panTo(moveLatLng);
  }, [map]);

  // TSX
  return (
    <div className="App">
      <div className="map-container" ref={mapContainer} />
      <button onClick={() => map.setLevel(map.getLevel() - 1)}>확대</button>
      <button onClick={() => map.setLevel(map.getLevel() + 1)}>축소</button>
      <button onClick={() => onClickMoveCurrentLocation()}>
        내 위치로 이동
      </button>
      <p>{centerCoordinate}</p>
    </div>
  );
}

export default App;
