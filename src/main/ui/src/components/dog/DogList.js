import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import  '../../styles/DogCard.css';
import AuthService from '../../services/AuthService';
import addFriend from "../../services/UserService";


const DogList = () => {
    const [dogs, setDogs] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDogs();
        fetchFriends();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await fetch('http://localhost:8080/dogs');
            const data = await response.json();
            setDogs(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
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

    if (!dogs) {
        return <div>Loading...</div>;
    }

    const userFriends = friends.map((friend) => friend.user2);

    return (
        <>
            <h1>Dogs</h1>
            <div className="dog-grid">
                {dogs.map((dog) => {
                    const isFriendAdded = userFriends.some((friend) => friend.username === dog.user.username);
                    const showLink = isFriendAdded && currentUser.username !== dog.user.username;

                    return (
                        <div className="dog-card" key={dog.id}>
                            <Link
                                to={showLink ? `/dogs/${dog.id}` : '#'}
                                className={`dog-card-name dog-card-link ${showLink ? '' : 'disabled'}`}
                            >
                                {dog.name}
                            </Link>
                            <p className="dog-card-description">{dog.description}</p>
                            {currentUser && currentUser.username === dog.user.username ? (
                                <p className="own-dog">This is your dog!</p>
                            ) : (
                                <p>This is {dog.user.username}'s Dog!</p>
                            )}
                            {isFriendAdded ? (
                                <>
                                    <p>{dog.user.username} is your friend!</p>
                                    {showLink && <Link to={`/dogs/${dog.id}`}>See sitting requests for {dog.name}</Link>}
                                </>
                            ) : dog.user.username !== currentUser.username ? (
                                <>
                                    <p>{dog.user.username} is not your friend</p>
                                    <button onClick={() => handleAddFriend(dog.user.id)}>Add {dog.user.username} as a Friend</button>
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default DogList;