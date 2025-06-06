import { useEffect, useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import ListOfTrips from './ListOfTrips'
import NavBar from './NavBar'
import MapComponent from './MapComponent'
import { APIProvider } from '@vis.gl/react-google-maps'
import TripCard from './TripCard'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    const { data } = await supabase.from("fishing_trip").select();
    setTrips(data);
  }

  return (
    <>
      <NavBar></NavBar>
      <>
        {trips.map((trip) => (
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-1 m-2">
            <a href="#">
              <TripCard class="rounded-t-lg" key={trip.id} trip={trip} />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trip.notes}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{trip.date}</p>
            </div>
          </div>
        ))}
        <br/>
      </>
      {/* <div>
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <TripCard trip={trip} />
            </li>
          ))}
        </ul>
        
      </div> */}
      <br/>
    </>
  )
}

export default App
