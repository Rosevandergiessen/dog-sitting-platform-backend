import { Link, Route, Routes, useLocation } from "react-router-dom"
import DogList from "./components/dog/DogList";
import UserList from "./components/user/UserList";
import DogDetails from "./components/dog/DogDetails";
import UserDetails from "./components/user/UserDetails";
import RequestList from "./components/request/RequestList";
import DogsAdd from "./components/dog/DogsAdd";
import Home from "./components/Home";
import Nav from "./components/Nav";

export default function App() {
    const location = useLocation();

    const showNav = location.pathname !== '/';

    return (
        <>
            {showNav && (
                <header>
                    <Nav />
                </header>
            )}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dogs" element={<DogList />} />
                    <Route path="/dogs/:id" element={<DogDetails />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/requests" element={<RequestList />} />
                    <Route path="/users/:id/dogs/add" element={<DogsAdd />} />
                </Routes>
            </main>
        </>
    );
}
