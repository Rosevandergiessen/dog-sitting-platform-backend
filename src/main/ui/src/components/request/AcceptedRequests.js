import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import moment from "moment";

export const AcceptedRequests = () => {
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
    const acceptedRequests = requestArray.filter((request) => request.accepted);
    const filteredRequests = acceptedRequests.filter(request => request.sitter.id === currentUser.id);

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    return(
        <div>
            <h1>Accepted Requests</h1>
            <ul>
                {filteredRequests.length > 0 ? (filteredRequests.map((request) => (
                    <li key={request.id}>
                        <p>Sitter: {request.sitter.username}</p>
                        <p>Start Time: {formatTime(request.startTime)}</p>
                        <p>End Time: {formatTime(request.endTime)}</p>
                    </li>
                ))) : (<h2>You don't have accepted any requests yet</h2>)}
            </ul>
        </div>)
}