import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthService from '../services/AuthService';
import '../styles/Nav.css';

export const NavBar = () => {
    const currentUser = AuthService.getCurrentUser();
    const [user, setUser] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${currentUser.id}`);
            const data = await response.json();
            setUser(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleLogout = () => {
        AuthService.logout();
    };

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-left">
                    <NavLink to="/get-started">HOME</NavLink>
                    <NavLink to="/dogs">DOGS</NavLink>
                    <NavLink to="/my-friends">FRIENDS</NavLink>
                    <NavLink to="/my-requests">MY REQUESTS</NavLink>
                    <NavLink to="/accepted-requests">ACCEPTED REQUESTS</NavLink>
                </div>
                <div className="navbar-right">
                    {user.imageData && (
                        <img
                            className="nav-bar-image"
                            src={`data:image/*;base64,${user.imageData}`}
                            alt="User photo"
                        />
                    )}
                    {currentUser ? (
                        <div className="user-info">
                            <Link className="username" to="/my-profile">{currentUser.username.toUpperCase()}</Link>
                            <Link onClick={handleLogout} to="/get-started">LOGOUT</Link>
                        </div>
                    ) : (
                        <Link to="/login">LOGIN</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};