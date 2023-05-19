import React from "react";
import L from 'leaflet';


const Map = ({ latitude, longitude }) => {
  const mapUrl = `https://www.openstreetmap.org/#map=13/${latitude}/${longitude}`;
  return (
    <div>
      <iframe width="100%" height="400px" src={mapUrl} title="Map" />
    </div>
  );
};

export default Map;
