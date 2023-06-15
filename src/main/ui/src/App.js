import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import DogList from "./components/DogList";

export default function App() {
  const [isLoading, setIsLoading] = useState(true)



  return (
      <>
        <nav>
          <h2>Menu</h2>
          <ul>
            {/* TODO: Make these links */}
            <li><Link to='/'>Go to homepage</Link></li>
            <li><Link to='/dogs'>See all Dogs</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            {/* TODO: Add routes here  */}
            <Route path='/dogs' element={<DogList isLoading={{isLoading}}/>}/>
          </Routes>
        </main>
      </>
  )
}
