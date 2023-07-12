import React, { useEffect, useState } from "react"
import AuthService from "../../services/AuthService";
import '../../styles/MyFriends.css';
import {Link, NavLink} from "react-router-dom";

export const MyFriends = () =>  {
    const [friends, setFriends] = useState([])
    const currentUser = AuthService.getCurrentUser();
    const currentUserId = currentUser.id;

    useEffect(() => {
        fetchFriends();
    }, []);

   const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${currentUserId}/friends`);
            const data = await response.json();
            setFriends(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    }

    if (!friends) {
        return <p>Loading...</p>
    }

    return (
        <>
            {friends.length === 0 ? (
                <h3>
                    YOU DON'T HAVE ANY FRIENDS YET,{" "}
                    <NavLink to={"/add-a-friend"}>ADD A FRIEND!</NavLink>
                </h3>
            ) : (
                <h1>MY FRIENDS</h1>
            )}
            <div className="friends-container">
                <ul className="friends-list">
                    {friends.map((friend) => (
                        <li key={friend.id}>
                            <div className="friend-avatar">
                                <img
                                    src={`https://source.unsplash.com/100x100/?portrait?id=${friend.id}`}
                                    alt="Friend Avatar"
                                />
                            </div>
                            <Link to={`/users/${friend.user2.id}`}>{friend.user2.username.toUpperCase()}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}