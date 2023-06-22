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
                    <NavLink to="/get-started">HOME</NavLink>
                    <NavLink to="/dogs">DOGS</NavLink>
                    <NavLink to="/my-friends">FRIENDS</NavLink>
                    <NavLink to="/requests">REQUESTS</NavLink>
                </div>
                <div className="navbar-right">
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