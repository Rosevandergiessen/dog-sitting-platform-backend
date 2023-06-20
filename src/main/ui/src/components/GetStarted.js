import React from 'react';
import { RegisterForm } from './auth/RegisterForm';
import { LoginForm } from './auth/LoginForm';
import '../styles/GetStarted.css';

export const GetStarted = () => {
    return (
        <div className="get-started-container">
            <div>
                <RegisterForm />
            </div>
            <div>
                <LoginForm />
            </div>
        </div>
    );
};