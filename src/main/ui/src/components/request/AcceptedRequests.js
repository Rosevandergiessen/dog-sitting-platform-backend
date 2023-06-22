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


    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    if (!requests) {
        return <h3>Loading...</h3>;
    }

    if (requests.length === 0) {
        return <h3>You have not accepted any requests yet</h3>;
    }

    return(
        <div>
            <h1>Accepted Requests</h1>
            <ul>
                {acceptedRequests.length > 0 ? (acceptedRequests.map((request) => (
                            <div key={request.id}>
                            {request.sitter && request.sitter.username === currentUser.username ? (
                            <div>
                            <p>Dog: {request.dog.name}</p>
                            <p>Start Time: {formatTime(request.startTime)}</p>
                            <p>End Time: {formatTime(request.endTime)}</p>
                            <p>Duration: {
                                moment.duration(moment(request.endTime)
                                    .diff(moment(request.startTime)))
                                    .asHours() >= 24 ? moment.duration(moment(request.endTime)
                                    .diff(moment(request.startTime)))
                                    .asDays() + ' days' : moment.duration(moment(request.endTime)
                                    .diff(moment(request.startTime)))
                                    .asHours() + ' hours'
                            }</p>
                            </div>)
                                : null}
                            </div>
                ))) : (<h2>You don't have accepted any requests yet</h2>)}
            </ul>
        </div>)
}