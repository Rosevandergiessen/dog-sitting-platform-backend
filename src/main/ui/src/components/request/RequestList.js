import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

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

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    return (
        <div>
            <div>
                <h1>All Requests</h1>
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>
                            <p>Dog: {request.dog.name}</p>
                            {request.sitter ? <><span>Sitter: </span><Link to={`/users/${request.sitter.id}`}>{request.sitter.username}</Link></> : null}
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
                            <p>{request.accepted ? <span>Accepted: ✅</span> : <button>Accept request</button>}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserList;