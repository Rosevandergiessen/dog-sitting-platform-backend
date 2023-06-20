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
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dogs">Dogs</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/requests">Requests</NavLink>
                </div>
                <div className="navbar-right">
                    {currentUser ? (
                        <div className="user-info">
                            <Link className="username" to="/">{currentUser.username}</Link>
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