import React, { useState, useEffect } from 'react';
import '../../styles/UserList.css';
import AuthService from "../../services/AuthService";
import addFriend from "../../services/UserService";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchFriends();
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

    const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${currentUser.id}/friends`);
            const data = await response.json();
            setFriends(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    }

    const handleAddFriend = async (friend) => {
        try {
            await addFriend(friend, currentUser);
            window.location.reload()
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    if (!users) {
        return <div>Loading...</div>;
    }

    const userFriends = friends.map((friend) => friend.user2);

    return (
        <div className="user-list">
            <h2>User List</h2>

            <div>
                {users.map((user) => {
                    const isFriendAdded = userFriends.some((friend) => friend.username === user.username);

                    return (
                        <div>
                            {user.id !== currentUser.id && (
                                <div key={user.id}>
                                    <p>{user.username}<span>{isFriendAdded && '   👥'}</span></p>
                                    {isFriendAdded ? null : (
                                        <button onClick={() => addFriend(user.id, currentUser)}>
                                            Add {user.username} as a Friend
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default UserList;