import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function UsersDetails() {
    const [user, setUser] = useState(false)
    const [friends, setFriends] = useState([])

    const { id } = useParams()

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
            console.error('Error fetching user:', error);
        }
    };

    const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}/friends`);
            const data = await response.json();
            setFriends(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <h3>Dogs</h3>
            <Link to={`/users/${id}/dogs/add`}>Add a dog</Link>

            {user.dogs.map((dog) => (
                <li key={dog.id}>
                    <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                </li>
            ))}
            <h3>Friends</h3>
            {friends.map((friend) => (
                <li key={friend.id}>
                    <Link to={`/users/${friend.user2.id}`}>{friend.user2.username}</Link>
                </li>
            ))}
        </>
    )
}

export default UsersDetails