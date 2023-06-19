import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;