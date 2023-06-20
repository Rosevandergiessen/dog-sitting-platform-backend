import React from 'react';
import AuthService from '../services/AuthService';

export const Welcome = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <h2>Welcome, {currentUser && currentUser.username}!</h2>
            <p>Thank you for logging in.</p>
        </div>
    );
};



