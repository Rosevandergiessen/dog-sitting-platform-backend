import React from 'react';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

export const Welcome = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <h2>Welcome, {currentUser && currentUser.username}!</h2>
            <div className="card-container">
                <div className="card-row">
                    <Link to="/my-profile" className="card">
                        <div className="card-content">My Profile</div>
                    </Link>
                    <Link to="/my-dogs" className="card">
                        <div className="card-content">My Dogs</div>
                    </Link>
                    <Link to="/my-friends" className="card">
                        <div className="card-content">My Friends</div>
                    </Link>
                </div>
                <div className="card-row">
                    <Link to="/my-requests" className="card">
                        <div className="card-content">My Requests</div>
                    </Link>
                    <Link to="/accepted-requests" className="card">
                        <div className="card-content">Accepted Requests</div>
                    </Link>
                    <Link to="/dogs" className="card">
                        <div className="card-content">See All Dogs</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};



