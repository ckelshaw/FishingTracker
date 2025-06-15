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
      <div id="test">
        {trips.map((trip) => (
          <div>
            <div href="#">
              <TripCard key={trip.id} trip={trip} />
            </div>
            <div>
            </div>
          </div>
        ))}
        <br/>
        </div>
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
