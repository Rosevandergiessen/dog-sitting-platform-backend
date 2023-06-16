import { Link, Route, Routes } from "react-router-dom"
import DogList from "./components/DogList";
import UserList from "./components/UserList";
import DogDetails from "./components/DogDetails";
import UserDetails from "./components/UserDetails";
import RequestList from "./components/RequestList";
import DogsAdd from "./components/DogsAdd";
import Home from "./components/Home";
import Nav from "./components/Nav";

export default function App() {
  return (
      <>
        <header>
            <Nav />
        </header>
        <main>
          <Routes>
            <Route path='' element={<Home />}/>
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