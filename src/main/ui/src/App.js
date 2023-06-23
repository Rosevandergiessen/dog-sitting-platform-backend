import {Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom"
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
import './App.css';
import {MyFriends} from "./components/user/MyFriends";
import {MyRequests} from "./components/request/MyRequests";
import {AcceptedRequests} from "./components/request/AcceptedRequests";
import {MyDogs} from "./components/user/MyDogs";
import {Logo} from "./components/Logo";
import {BackButton} from "./components/BackButton";



export default function App() {
    const location = useLocation();
    const showNav = location.pathname !== '/';
    const showBack = location.pathname !== '/';
    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <>
            {showNav && (
                <header>
                    <NavBar />
                </header>
            )}
            {showBack && (
                <div className="logo-back-button-container">
                    <BackButton />
                    <Logo />
                </div>
            )}
            <main>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/get-started"
                           element={<GetStarted/>} />
                    <Route path="/login"
                           element={currentUser ? <Navigate to="/my-profile" /> : <LoginForm />}
                    />
                    <Route path="/my-profile"
                           element={currentUser ? (<Profile />) : (<GetStarted />)} />
                    <Route path="/my-friends" element={<MyFriends />} />
                    <Route path="/my-requests" element={<MyRequests />} />
                    <Route path="/my-dogs" element={<MyDogs />} />
                    <Route path="/logout" element={<Navigate to="/" />} />
                    <Route path="/accepted-requests" element={<AcceptedRequests />} />
                    <Route path="register" element={<RegisterForm />} />
                    <Route path="/dogs" element={<DogList />} />
                    <Route path="/dogs/:id" element={<DogDetails />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/requests" element={<RequestList />} />
                    <Route path="/users/:id/dogs/add" element={<DogsAdd />} />
                    <Route path="/add-a-friend" element={<UserList />} />
                </Routes>
            </main>
        </>
    );
}
