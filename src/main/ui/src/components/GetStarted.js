import React from 'react';
import { RegisterForm } from './auth/RegisterForm';
import { LoginForm } from './auth/LoginForm';
import '../styles/GetStarted.css';
import AuthService from '../services/AuthService';
import {Welcome} from "./Welcome";

export const GetStarted = () => {
    const currentUser = AuthService.getCurrentUser();


    return (
        <div className="get-started-container">
            {currentUser ? (
                <Welcome /> ) : (
               <>
               <div>
                    <RegisterForm classname="form-register"/>
                </div>
                <div>
                    <LoginForm classname="form-login"/>
                </div>
               </>
            )}
        </div>
    );
};