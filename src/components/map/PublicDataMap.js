import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
  Polyline,
  Rectangle,
  useMap,
  useMapEvent,
} from "react-leaflet";
import SearchBar from "./fragments/SearchBar";
import { blueMarker, redMarker, circleMarker } from "./fragments/mapIcon";
import "./PublicDataMap.css";

const MapRefComponent = (props) => {
  const { searchResult, handleAddMarker, setCenter } = props;
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;
      setCenter([latitude, longitude]);
      map.setView({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    if (searchResult.position) {
      map.flyTo(searchResult.position);
    }
  }, [searchResult]);
  //map click event
  useMapEvent("click", (e) => {
    handleAddMarker(e.latlng);
  });
  return null;
};

const PublicDataMap = (props) => {
  const [center, setCenter] = useState([10.7725104, 106.6575988]);
  const [searchResult, setSearchResult] = useState({});
  const [startMarkerPosition, setStartMarkerPosition] = useState({});
  const [endMarkerPosition, setEndMarkerPosition] = useState({});
  const [linePosition, setLinePosition] = useState([]);
  const rectangleRef = useRef(null);
  const { setMapDataPosition, positionChoose } = props;
  useEffect(() => {
    if (searchResult.position) {
      const { position } = searchResult;
      setStartMarkerPosition(position);
    } else {
      setStartMarkerPosition({});
    }
  }, [searchResult]);
  // when update position of 2 marker
  useEffect(() => {
    if (startMarkerPosition.lat && endMarkerPosition.lat) {
      const startPoint = [startMarkerPosition.lat, startMarkerPosition.lng];
      const endPoint = [endMarkerPosition.lat, endMarkerPosition.lng];
      setLinePosition([startPoint, endPoint]);
      setMapDataPosition({ startPoint, endPoint }); // position to send request
    } else {
      setLinePosition([]);
    }
  }, [startMarkerPosition, endMarkerPosition]);
  // log position of rectangle
  useEffect(() => {
    if (linePosition.length > 0) {
      console.log("rectangleRef.current", rectangleRef.current);
    }
  }, [linePosition]);
  const handleSearchResult = (item) => {
    setSearchResult(item);
  };
  const handleAddMarker = (position) => {
    if (startMarkerPosition.lat && !endMarkerPosition.lat) {
      setEndMarkerPosition(position);
    } else {
      setStartMarkerPosition(position);
    }
  };
  return (
    <div className="map-container">
      <SearchBar handleSearchResult={handleSearchResult} />
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        minZoom={5}
        zoomControl={false}
      >
        <TileLayer url="https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
        <ZoomControl position="bottomright" />
        <MapRefComponent
          setCenter={setCenter}
          searchResult={searchResult}
          handleAddMarker={handleAddMarker}
        />
        {startMarkerPosition.lat && startMarkerPosition.lng && (
          <Marker
            position={[startMarkerPosition.lat, startMarkerPosition.lng]}
            icon={blueMarker}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                setStartMarkerPosition(e.target["_latlng"]);
              },
            }}
          >
            <Tooltip>Điểm đầu</Tooltip>
          </Marker>
        )}
        {endMarkerPosition.lat && endMarkerPosition.lng && (
          <Marker
            position={[endMarkerPosition.lat, endMarkerPosition.lng]}
            icon={redMarker}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                setEndMarkerPosition(e.target["_latlng"]);
              },
            }}
          >
            <Tooltip>Điểm cuối</Tooltip>
          </Marker>
        )}
        {linePosition.length > 0 && positionChoose === "rectangle" && (
          <>
            <Rectangle
              bounds={linePosition}
              pathOptions={{ color: "#000" }}
              ref={rectangleRef}
            />
            {/* <Polyline positions={linePosition} pathOptions={{ color: "red" }} /> */}
          </>
        )}
        {linePosition.length > 0 && positionChoose === "line" && (
          <>
            <Polyline positions={linePosition} pathOptions={{ color: "red" }} />
          </>
        )}
        <Marker position={center} icon={circleMarker}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default PublicDataMap;
