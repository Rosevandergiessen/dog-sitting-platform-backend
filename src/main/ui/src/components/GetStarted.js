import React from 'react';
import { RegisterForm } from './auth/RegisterForm';
import { LoginForm } from './auth/LoginForm';
import '../styles/GetStarted.css';
import AuthService from '../services/AuthService';

export const GetStarted = () => {
    const currentUser = AuthService.getCurrentUser();



    return (
        <div className="get-started-container">
            {currentUser ? (
                <div>
                    <h2>Welcome, {currentUser.username}!</h2>
                    {/* Add additional components or content for logged-in users */}
                </div> )  : (
               <>
               <div>
                    <RegisterForm />
                </div>
                <div>
                    <LoginForm />
                </div>
               </>
            )}
        </div>
    );
};