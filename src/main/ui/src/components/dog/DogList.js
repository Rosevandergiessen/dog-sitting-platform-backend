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
            <h1>DOGS</h1>
            <div className="dog-grid">
                {dogs.map((dog) => {
                    const isFriendAdded = userFriends.some((friend) => friend.username === dog.user.username);
                    const showLink = isFriendAdded || currentUser.username === dog.user.username;

                    return (
                        <div className="dog-card" key={dog.id}>
                            <Link
                                to={showLink ? `/dogs/${dog.id}` : '#'}
                                className={`dog-card-name dog-card-link ${showLink ? '' : 'disabled'}`}
                            >
                                {dog.name.toUpperCase()}
                            </Link>
                            <img
                                className="dog-card-image"
                                src={`https://source.unsplash.com/100x100/?${dog.breed}`}
                                alt="Dog"
                            />
                            <p className="dog-card-content">{dog.description.toUpperCase()}</p>
                            <p className="dog-card-content">{dog.breed.toUpperCase()}</p>
                            <p className="dog-card-content">{dog.age} YEARS OLD</p>
                            {currentUser && currentUser.username === dog.user.username ? (
                                <p className="own-dog">THIS IS YOUR DOG!</p>
                            ) : (
                                <p>THIS IS {dog.user.username.toUpperCase()}'S DOG</p>
                            )}
                            {isFriendAdded ? (
                                <>
                                    {showLink && <Link to={`/dogs/${dog.id}`} className="requests-link">SEE SITTING REQUESTS FOR {dog.name.toUpperCase()}</Link>}
                                </>
                            ) : dog.user.username !== currentUser.username ? (
                                <>
                                    <button onClick={() => handleAddFriend(dog.user.id)}>ADD AS A FRIEND </button>
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