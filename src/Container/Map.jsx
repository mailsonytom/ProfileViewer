import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";

const Map = ({ latitude, longitude }) => {
  const [geo, setgeo] = useState([]);

  useEffect(() => {
    latitude &&
      longitude &&
      geo.push(parseFloat(latitude), parseFloat(longitude));
  }, [latitude, longitude]);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <p className="text-right ml-52 text-gray-500">
        Lat: {latitude} Long: {longitude}
      </p>
    </div>
  );
};

export default Map;
