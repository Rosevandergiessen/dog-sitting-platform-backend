import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import DogDelete from "./DogDelete";
import DogUpdate from "./DogUpdate";
import AuthService from "../../services/AuthService";
import moment from "moment/moment";
import acceptRequest from "../../services/RequestService";
import '../../styles/DogDetails.css';

const DogDetails = () => {
    const [dog, setDog] = useState(false);
    const [requests, setRequests] = useState(false);
    const { id } = useParams();
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        fetchDog();
        fetchRequests();
    }, []);

    const fetchDog = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`);
            const data = await response.json();
            setDog(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dog:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}/requests`);
            const data = await response.json();
            setRequests(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    }

    if (!dog) {
        return <div>Loading...</div>;
    }

    const requestArray = Object.values(requests)
    const activeRequests = requestArray.filter((request) => request.accepted);
    const pendingRequests = requestArray.filter((request) => !request.accepted);

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    const handleAcceptRequest = async (id, userId) => {
        try {
            await acceptRequest(id, userId);
            window.location.reload();
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    return (
        <div className="dog-details-container">
            <h1>{dog.name.toUpperCase()}</h1>
            {dog.image && (
                <img
                    className="dog-details-container-image"
                    src={`data:image/*;base64,${dog.image}`}
                    alt="Dog"
                />
            )}
            <h3>INFO</h3>
            <span>breed</span>
            <p> {dog.breed.toUpperCase()}</p>
            <span>age</span>
            <p> {dog.age} YEARS OLD</p>
            <span>description</span>
            <p> {dog.description.toUpperCase()}</p>

            {currentUser && currentUser.id === dog.user.id ? (  <>
                <p className="own-dog">THIS IS YOUR DOG</p>
                <DogDelete id={id} />
                <DogUpdate id={id} />
            </>) :
                <>
                <span>human</span>
                <Link to={`/users/${dog.user.id}`}>{dog.user.username.toUpperCase()}</Link>
                </>}

            <h3 className="accepted-requests">ACCEPTED REQUEST(S)</h3>
            <ul>
                {activeRequests.length === 0 && <p>No accepted requests</p>}
                {activeRequests.map((request) => (
                    <li key={request.id}>
                        <p>Sitter: {request.sitter.username}</p>
                        <p>Start Time: {formatTime(request.startTime)}</p>
                        <p>End Time: {formatTime(request.endTime)}</p>
                        <p>Accepted: ✅ </p>
                        <p>--------------------------------------</p>
                    </li>
                ))}
            </ul>
            <h3>PENDING REQUEST(S)</h3>
            <ul>
                {pendingRequests.length === 0 && <p>No pending requests</p>}
                {pendingRequests.map((request) => (
                    <li key={request.id}>
                        <p>Start Time: {formatTime(request.startTime)}</p>
                        <p>End Time: {formatTime(request.endTime)}</p>
                        {currentUser && currentUser.id === dog.user.id ? null : (<button onClick={() => handleAcceptRequest(request.id, currentUser.id)}>Accept Request</button>)}
                        <p>--------------------------------------</p>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default DogDetails;