import React, { useEffect, useState } from "react"
import AuthService from "../../services/AuthService";
import {Link, useParams} from "react-router-dom";

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

            {friends.length === 0 ? <h3>You don't have any friends yet, <Link to={"/add-a-friend"}> add a friend!</Link></h3> : <h3>Friends</h3>  }
            {friends.map((friend) => (
                <li key={friend.id}>
                    <Link to={`/users/${friend.user2.id}`}>{friend.user2.username}</Link>
                </li>
            ))}
        </>
    )
}
