import React, { useState } from "react";
import "./App.css";
import PublicDataMap from "./components/map/PublicDataMap";

function App() {
  const [positionChoose, setPositionChoose] = useState("rectangle");
  const [mapDataPosition, setMapDataPosition] = useState({});
  return (
    <div className="container">
      <PublicDataMap
        setMapDataPosition={setMapDataPosition}
        positionChoose={positionChoose}
      />
    </div>
  );
}

export default App;
