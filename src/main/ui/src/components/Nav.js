import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthService from '../services/AuthService';
import '../styles/Nav.css';

export const NavBar = () => {
    const currentUser = AuthService.getCurrentUser();

    const handleLogout = () => {
        AuthService.logout();
        // Perform any additional logout logic or redirection
    };

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-left">
                    <NavLink to="/get-started">Home</NavLink>
                    <NavLink to="/dogs">Dogs</NavLink>
                    <NavLink to="/my-friends">Friends</NavLink>
                    <NavLink to="/requests">Requests</NavLink>
                </div>
                <div className="navbar-right">
                    {currentUser ? (
                        <div className="user-info">
                            <Link className="username" to="/my-profile">{currentUser.username}</Link>
                            <Link onClick={handleLogout} to="/get-started">Logout</Link>
                        </div>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};