import React, {useEffect, useState} from "react";
import { APIProvider, Map, Marker} from "@vis.gl/react-google-maps";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function MapComponent(props) {

    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [markerLocation, setMarkerLocation] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        getSpots();
    }, []);

    async function getSpots(){
        const{data} = await supabase.from("fishing_spot").select('*').eq('id', 1);
        setSpots(data);
        setLoading(false);
        const lat = Number(data[0].latitude);
        const lng = Number(data[0].longitude);
        let latlng = {
            lat: lat,
            lng: lng
        }
        setMarkerLocation(latlng);
    }

  //const markerLocation = {lat: spots[0].latitude, long: props.longitude}
//      const [markerLocation, setMarkerLocation] = useState({
//      lat: spots[0].latitude,
//      lng: spots[0].longitude,
//    });

   if(loading){
    return <div>Loading... </div>
   }

  return (
    <div className="map-container">
        <APIProvider apiKey="AIzaSyA9coR0QtDBdvz9HxupAXoYkIfEnppfKRA">
        <Map
            style={{ borderRadius: "20px" }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI
        >
            <Marker position={markerLocation} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapComponent;