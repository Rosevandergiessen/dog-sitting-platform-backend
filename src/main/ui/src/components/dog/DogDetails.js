import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import DogDelete from "./DogDelete";
import DogUpdate from "./DogUpdate";
import AuthService from "../../services/AuthService";

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

    return (
        <div>
            <h1>{dog.name}</h1>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Human: {dog.user.username}</p>
            <p>Description: {dog.description}</p>

            {currentUser.id === dog.user.id ? (  <>
                <DogDelete id={id} />
                <DogUpdate id={id} />
            </>) : null}


            <h2>Active Request(s)</h2>
            <ul>
                {activeRequests.map((request) => (
                    <li key={request.id}>
                        <p>Dog: {request.dog.name}</p>
                        <p>Sitter: {request.sitter ? request.sitter.username : 'Accept this request?'}</p>
                        <p>Start Time: {request.startTime}</p>
                        <p>End Time: {request.endTime}</p>
                    </li>
                ))}
            </ul>
            <h2>Pending Request(s)</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request.id}>
                        <p>Dog: {request.dog.name}</p>
                        <p>Sitter: {request.sitter ? request.sitter.username : 'Accept this request?'}</p>
                        <p>Start Time: {request.startTime}</p>
                        <p>End Time: {request.endTime}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default DogDetails;
