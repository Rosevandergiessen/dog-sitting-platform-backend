import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import '../../styles/Form.css'

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
        if (name === 'email') setEmail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthService.register(username, email, password)
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};
