import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import moment from "moment";
import '../../styles/Requests.css'
import { createEvent } from 'ics';

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

    const downloadICS = (text, filename) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const generateICS = (startDateString, endDateString, description) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const event = {
            start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes()],
            end: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()],
            title: 'Paw Pact Dog Sitting Appointment - ' + description,
        };

        createEvent(event, (error, value) => {
            if (error) {
                console.error(error);
                return;
            }

            downloadICS(value, 'event.ics');
        });
    };



    return(
        <div className="request-container">
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
                                <button onClick={() => generateICS(request.startTime, request.endTime, request.dog.name)}>
                                    Download .ics
                                </button>
                                <p>-------------------------------------------------------</p>
                            </div>)
                                : null}
                            </div>
                ))) : (<h2>You don't have accepted any requests yet</h2>)}
            </ul>
        </div>)
}