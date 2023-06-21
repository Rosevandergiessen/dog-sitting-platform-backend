import React, { useState, useEffect } from 'react';
import '../../styles/UserList.css';
import AuthService from "../../services/AuthService";
import addFriend from "../../services/UserService";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();

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
        <div className="user-list">
            <h2>User List</h2>
            {users.map((user) => (
                user.id !== currentUser.id && (
                    <div key={user.id}>
                        <p>{user.username}</p>
                        <button onClick={() => addFriend(user.id)}>Add {user.username} as a Friend</button>
                    </div>
                )
            ))}
        </div>
    );
};

export default UserList;