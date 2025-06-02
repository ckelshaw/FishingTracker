import { useEffect, useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import ListOfTrips from './ListOfTrips'
import NavBar from './NavBar'
import MapComponent from './MapComponent'
import { APIProvider } from '@vis.gl/react-google-maps'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("user").select();
    console.log(data);
    setUsers(data);
  }

  return (
    <>
      <NavBar></NavBar>
      <div>
        <ListOfTrips>
          <MapComponent></MapComponent>
        </ListOfTrips>
        
      </div>
      <br/>
      <ul>
      {users.map((user, index) => (
        <li key={index}>First Name: {user.first_name}, Last Name: {user.last_name}, Email: {user.email}</li>
      ))}
    </ul>
    </>
  )
}

export default App
