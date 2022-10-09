import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_KAKAO_MAP_API_KEY);
  }, []);

  return <div className="App"></div>;
}

export default App;
