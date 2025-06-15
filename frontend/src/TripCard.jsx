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
            console.log(trip);
            setSpot(data);
        };
        getSpot();
    }, []);

    if (!spot) {
        return <div>Loading...</div>;
    }

    return (
        <div class="card shadow mb-2">
            <h4 class="card-title">{spot.river_name}</h4>
            <MapComponent latitude={spot.latitude} longitude={spot.longitude} />
            <p class="card-text">{trip.notes}</p>
            <p class="card-text">Date: {trip.date}</p>
            <a href="#" class="btn btn-primary">View</a>
        </div>
    );
}

export default TripCard;    
