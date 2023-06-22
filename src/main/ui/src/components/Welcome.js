import React from 'react';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

export const Welcome = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="welcome-container">
            <h2>WELCOME {currentUser && currentUser.username.toUpperCase()}.</h2>
            <div className="card-container">
                <div className="card-row">
                    <Link to="/my-profile" className="card">
                        <div className="card-content">MY PROFILE</div>
                    </Link>
                    <Link to="/my-dogs" className="card">
                        <div className="card-content">MY DOGS</div>
                    </Link>
                    <Link to="/my-friends" className="card">
                        <div className="card-content">MY FRIENDS</div>
                    </Link>
                </div>
                <div className="card-row">
                    <Link to="/my-requests" className="card">
                        <div className="card-content">MY REQUESTS</div>
                    </Link>
                    <Link to="/accepted-requests" className="card">
                        <div className="card-content">ACCEPTED REQUESTS</div>
                    </Link>
                    <Link to="/dogs" className="card">
                        <div className="card-content">SEE ALL DOGS</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
