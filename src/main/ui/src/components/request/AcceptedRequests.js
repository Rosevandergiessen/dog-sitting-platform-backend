import React, { useEffect, useState } from "react";
import moment from "moment";
import '../../styles/Requests.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createEvent } from 'ics';
import AuthService from "../../services/AuthService";
import '../../styles/Calendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaw, faPencilAlt} from '@fortawesome/free-solid-svg-icons';

const localizer = momentLocalizer(moment);

export const AcceptedRequests = () => {
    const [requests, setRequests] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

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

    const acceptedRequests = requests.filter((request) => request.accepted && request.sitter && request.sitter.username === currentUser.username);

    useEffect(() => {
        const calendarEvents = acceptedRequests.map((request) => {
            return {
                title: `Paw Pact Dog Sitting Appointment - ${request.dog.name}`,
                start: new Date(request.startTime),
                end: new Date(request.endTime),
                id: request.id,
            };
        });

        setEvents(calendarEvents);
    }, [acceptedRequests]);

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
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

    const handleEventClick = (event) => {
        const clickedRequest = acceptedRequests.find((request) => request.id === event.id);
        setSelectedRequest(clickedRequest);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const views = {
        month: true,
        week: true,
        day: true,
        agenda: acceptedRequests.length > 0 // Set agenda view to true only if there are accepted requests
    };

    return (
        <div className="request-container">
            <h1>Accepted Requests</h1>
            {events.length > 0 ? (
                <div className="calendar-container">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        className="rbc-calendar"
                        style={{ height: 500 }}
                        tooltipAccessor={() => null} // Disable default tooltip
                        onSelectEvent={handleEventClick} // Event click handler
                        views={views}
                    />
                </div>
            ) : (
                <h3>Loading....</h3>
            )}
            {selectedRequest && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
                        <FontAwesomeIcon className="fas fa-paw" icon={faPaw} />
                        <h3>Sitting Details</h3>
                        <p><span>Dog: </span> {selectedRequest.dog.name}</p>
                        <p><span>Start Time: </span> {formatTime(selectedRequest.startTime)}</p>
                        <p><span>End Time: </span> {formatTime(selectedRequest.endTime)}</p>
                        <p><span>Duration: </span>{moment.duration(moment(selectedRequest.endTime)
                            .diff(moment(selectedRequest.startTime)))
                            .asHours() >= 24 ? moment.duration(moment(selectedRequest.endTime)
                            .diff(moment(selectedRequest.startTime)))
                            .asDays() + ' days' : moment.duration(moment(selectedRequest.endTime)
                            .diff(moment(selectedRequest.startTime)))
                            .asHours() + ' hours'}</p>
                        <button onClick={() => generateICS(selectedRequest.startTime, selectedRequest.endTime, selectedRequest.dog.name)}>
                            Download .ics
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
