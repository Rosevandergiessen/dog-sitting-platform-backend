import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DogAdd from "../dog/DogsAdd";
import AuthService from "../../services/AuthService";

function UsersDetails() {
    const [user, setUser] = useState(false);
    const [friends, setFriends] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    const { id } = useParams();

    useEffect(() => {
        fetchUser();
        fetchFriends();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`);
            const data = await response.json();
            setUser(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchFriends = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/users/${id}/friends`
            );
            const data = await response.json();
            setFriends(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="users-details-container">
            <h2 className="users-details-username">{user.username}</h2>
            <p className="users-details-email">{user.email}</p>
            <h3 className="users-details-heading">Dogs</h3>
            {currentUser && currentUser.id === Number(id) ? <DogAdd /> : null}
            <ul className="users-details-dog-list">
                {user.dogs.map((dog) => (
                    <li key={dog.id}>
                        <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                    </li>
                ))}
            </ul>
            <h3 className="users-details-heading">Friends</h3>
            <ul className="users-details-friends-list">
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <Link to={`/users/${friend.user2.id}`}>
                            {friend.user2.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersDetails;