import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Store the token in local storage or state management library
                // Example: localStorage.setItem('token', token);
                navigate('/welcome');
                console.log('Login successful');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                console.error('Login failed:', errorData.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account yet? <Link to="/register">Create an account</Link>
            </p>
        </div>
    );
};
