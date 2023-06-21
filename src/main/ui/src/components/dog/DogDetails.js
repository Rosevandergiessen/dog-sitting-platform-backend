import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import DogDelete from "./DogDelete";
import DogUpdate from "./DogUpdate";
import AuthService from "../../services/AuthService";
import moment from "moment/moment";
import '../../styles/DogDetails.css'
import acceptRequest from "../../services/RequestService";

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
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    return (
        <div>
            <h1>{dog.name}</h1>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Description: {dog.description}</p>

            {currentUser && currentUser.id === dog.user.id ? (  <>
                <p className="own-dog">This is your dog!</p>
                <DogDelete id={id} />
                <DogUpdate id={id} />
            </>) : <p>Human: {dog.user.username}</p>}


            <h2>Active Request(s)</h2>
            <ul>
                {activeRequests.map((request) => (
                    <li key={request.id}>
                        <p>Sitter: {request.sitter.username}</p>
                        <p>Start Time: {formatTime(request.startTime)}</p>
                        <p>End Time: {formatTime(request.endTime)}</p>
                        <p>Accepted: ✅ </p>
                    </li>
                ))}
            </ul>
            <h2>Pending Request(s)</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request.id}>
                        <p>Start Time: {request.startTime}</p>
                        <p>End Time: {request.endTime}</p>
                        <button onClick={() => handleAcceptRequest(request.id, currentUser.id)}>Accept Request</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default DogDetails;
