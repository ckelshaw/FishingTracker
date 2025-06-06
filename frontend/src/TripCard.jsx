import React from "react";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import MapComponent from "./MapComponent";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function TripCard({ trip }) {
    const [spot, setSpot] = useState();

    useEffect(() => {
        async function getSpot() {
            const { data } = await supabase.from("fishing_spot").select().eq('id', trip.fishing_spot).single();
            console.log(data);
            setSpot(data);
        };
        getSpot();
    }, []);

    if (!spot) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trip-card">
            <h3>Trip Date: {trip.date}</h3>
            <p>Notes: {trip.notes}</p>
            <MapComponent latitude={spot.latitude} longitude={spot.longitude} />
        </div>
    );
}

export default TripCard;    
