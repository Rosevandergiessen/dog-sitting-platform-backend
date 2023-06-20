import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom"
import DogList from "./components/dog/DogList";
import UserList from "./components/user/UserList";
import DogDetails from "./components/dog/DogDetails";
import UserDetails from "./components/user/UserDetails";
import RequestList from "./components/request/RequestList";
import DogsAdd from "./components/dog/DogsAdd";
import Home from "./components/Home";
import {NavBar} from "./components/Nav";
import {LoginForm} from "./components/auth/LoginForm";
import {RegisterForm} from "./components/auth/RegisterForm";
import {GetStarted} from "./components/GetStarted";
import {Profile} from "./components/user/Profile";
import AuthService from "./services/AuthService";

export default function App() {
    const location = useLocation();
    const showNav = location.pathname !== '/';
    const currentUser = AuthService.getCurrentUser();

    return (
        <>
            {showNav && (
                <header>
                    <NavBar />
                </header>
            )}
            <main>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/get-started"
                           element={<GetStarted/>} />
                    <Route path="/login"
                           element={currentUser ? <Navigate to="/my-profile" /> : <LoginForm />}
                    />
                    <Route path="/my-profile" element={<Profile />} />
                    <Route path="register" element={<RegisterForm />} />
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
