import React from "react";
import { APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

function MapComponent(props) {

  const markerLocation = {
    lat: parseFloat(props.latitude),
    lng: parseFloat(props.longitude)
  };

  return (
    <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
            style={{ borderRadius: "20px", height: "500px", width: "100%" }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI
        >
            <Marker position={markerLocation} />
        </Map>
      </APIProvider>
    </>
  );
}

export default MapComponent;