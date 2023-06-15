import { Link, Route, Routes } from "react-router-dom"
import DogList from "./components/DogList";
import UserList from "./components/UserList";
import DogDetails from "./components/DogDetails";
import UserDetails from "./components/UserDetails";
import RequestList from "./components/RequestList";
import DogsAdd from "./components/DogsAdd";

export default function App() {
  return (
      <>
        <nav>
          <h2>Menu</h2>
          <ul>
            <li><Link to=''>Go to homepage</Link></li>
            <li><Link to='/dogs'>See all Dogs</Link></li>
            <li><Link to='/users'>See all Users</Link></li>
            <li><Link to='/requests'>See all Sitting Requests</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path='' element={<h1>Home</h1>} />
            <Route path='/dogs' element={<DogList />}/>
            <Route path='/dogs/:id' element={<DogDetails />} />
            <Route path='/users' element={<UserList />}/>
            <Route path='/users/:id' element={<UserDetails />}/>
            <Route path='/requests' element={<RequestList />}/>
            <Route path='/users/:id/dogs/add' element={<DogsAdd />} />
          </Routes>
        </main>
      </>
  )
}