import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const UserList = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:8080/requests');
            const data = await response.json();
            setRequests(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    if (!requests) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>All Requests</h1>
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>
                            <p>Dog: {request.dog.name}</p>
                            <p>Sitter: {request.sitter ? request.sitter.username : 'Accept this request?'}</p>
                            <p>Start Time: {request.startTime}</p>
                            <p>End Time: {request.endTime}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserList;