import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import moment from "moment";

export const MyRequests = () => {
    const [dogs, setDogs] = useState([]);
    const [requests, setRequests] = useState([]);
    const currentUser = AuthService.getCurrentUser();


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
    }

    const requestArray = Object.values(requests)
    // const filteredRequests = requestArray.filter(request => request.dog.user.id === currentUser.id);
    const activeRequests = requestArray.filter((request) => request.accepted);
    const pendingRequests = requestArray.filter((request) => !request.accepted);

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    return(
        <div>
            <h1>My Requests</h1>
            <h2>Active Request(s)</h2>
            <ul>
                {activeRequests.map((request) => (
                    <li key={request.id}>
                        <p>Sitter: {request.sitter.username}</p>
                        <p>Start Time: {formatTime(request.startTime)}</p>
                        <p>End Time: {formatTime(request.endTime)}</p>
                    </li>
                ))}
            </ul>
            <h2>Pending Request(s)</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request.id}>
                        <p>Start Time: {request.startTime}</p>
                        <p>End Time: {request.endTime}</p>
                        <button>Accept request</button>
                    </li>
                ))}
            </ul>
        </div>)
}