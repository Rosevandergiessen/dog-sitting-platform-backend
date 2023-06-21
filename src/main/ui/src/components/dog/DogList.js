import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import  '../../styles/DogCard.css';
import AuthService from '../../services/AuthService';
import addFriend from "../../services/UserService";


const DogList = () => {
    const [dogs, setDogs] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchDogs();
        fetchFriends();
        // const fetchFriendsData = async () => {
        //     const friendsData = await fetchFriends(currentUser.id);
        //    setFriends(friendsData);
        // };
        // fetchFriendsData();
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

    if (!dogs) {
        return <div>Loading...</div>;
    }

    const userFriends = friends.map((friend) => friend.user2);

    return (
        <>
        <h1>Dogs</h1>
        <div className="dog-grid">
            {dogs.map((dog) => (
                <Link to={`/dogs/${dog.id}`} className="dog-card-link" key={dog.id}>
                    <div className="dog-card">
                        <h3 className="dog-card-name">{dog.name}</h3>
                        <p className="dog-card-description">{dog.description}</p>
                        {currentUser && currentUser.username === dog.user.username ? (
                        <p className="own-dog">This is your dog!</p>) : (<p>This is {dog.user.username}'s Dog!</p>)}

                        {userFriends && userFriends.map((friend) => (
                            <p className="dog-card-friend" key={friend.id}>
                                {(() => {
                                    if (friend.username === dog.user.username) {
                                        return (
                                            <>
                                                <p>{dog.user.username} is your friend! </p>
                                                <Link to={"/"}>See sitting requests for {dog.name}</Link>
                                            </>
                                        );
                                    } else if (dog.user.username !== currentUser.username) {
                                        return (
                                            <>
                                                <p>{dog.user.username} is not your friend</p>
                                                <button onClick={() => addFriend(dog.user.id)}>Add {dog.user.username} as a Friend</button>
                                            </>
                                        );
                                    } else {
                                        return null;
                                    }
                                })()}
                            </p>
                        ))}
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
};

export default DogList;