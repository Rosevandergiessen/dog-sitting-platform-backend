import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import moment from "moment";
import '../../styles/Requests.css'

export const MyRequests = () => {
    const [dogs, setDogs] = useState([]);
    const [requests, setRequests] = useState([]);
    const currentUser = AuthService.getCurrentUser();


    useEffect(() => {
        fetchRequests();
        fetchDogs();
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

    const fetchDogs = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs`);
            const data = await response.json();
            setDogs(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    }

    const formatTime = (time) => {
        return moment(time).format('dddd MMMM Do YYYY h:mm a');
    }

    const filteredRequests = requests.filter((request) => {
        const dog = dogs.find((dog) => dog.id === request.dog.id);
        return dog && dog.user && dog.user.id === currentUser.id;
    });

    return (
        <div className="request-container">
            <ul>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <div key={request.id}>
                            <div>
                                <p>Dog: {request.dog.name}</p>
                                <p>Start Time: {formatTime(request.startTime)}</p>
                                <p>End Time: {formatTime(request.endTime)}</p>
                                <p>
                                    Duration:{" "}
                                    {moment.duration(moment(request.endTime).diff(moment(request.startTime))).asHours() >= 24
                                        ? moment.duration(moment(request.endTime).diff(moment(request.startTime))).asDays() +
                                        " days"
                                        : moment.duration(moment(request.endTime).diff(moment(request.startTime))).asHours() +
                                        " hours"}
                                </p>
                                {request.accepted ? ("Accepted: ✅") : ("Accepted: ❌")}
                                <p>----------------------------------------------</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>You don't have any pending requests.</h3>
                )}
            </ul>
        </div>
    );
};