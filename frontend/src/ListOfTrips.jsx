import React from "react";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import MapComponent from "./MapComponent";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function ListOfTrips(){
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getTrips();
    }, []);

    async function getTrips() {
        const { data } = await supabase.from("fishing_trip").select();
        setTrips(data)
        
    }

    return (
        <div>
            <div>Your Trips</div>
            <br/>
            <div>
                <ul>
                    {trips.map((trip) => (
                    <li key={trip.id}>Trip Date: {trip.date}, Trip Notes: {trip.notes}</li>
                ))}
                <MapComponent></MapComponent>
                </ul>
            </div>
        </div>
    )

}

export default ListOfTrips