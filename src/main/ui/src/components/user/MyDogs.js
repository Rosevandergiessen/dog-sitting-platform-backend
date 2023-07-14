import AuthService from "../../services/AuthService";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DogAdd from "../dog/DogsAdd";
import RequestAdd from "../request/RequestAdd";
import '../../styles/DogCard.css';
import '../../styles/DogList.css';

export const MyDogs = () => {
    const currentUser = AuthService.getCurrentUser();
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        fetchDogs();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${currentUser.id}/dogs`);
            const data = await response.json();
            setDogs(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    }

    return (
        <div className="my-dog-list-container">
            <div className="dog-grid">
                {dogs.map((dog) => (
                        <div className="dog-card" key={dog.id}>
                            <Link to={`/dogs/${dog.id}`} className="dog-card-link dog-card-name">{dog.name.toUpperCase()}</Link>
                            {dog.imageData && (
                                <img
                                    className="dog-card-image"
                                    src={`data:image/*;base64,${dog.imageData}`}
                                    alt="Dog"
                                />
                            )}
                            <p className="dog-card-breed">{dog.breed.toUpperCase()}</p>
                            <p className="dog-card-age">{dog.age} YEARS OLD</p>
                            <p className="dog-card-description">{dog.description.toUpperCase()}</p>
                            <RequestAdd dogId={dog.id}/>
                        </div>
                ))}
                <div className="dog-card">
                    <p className='add-dog-card'>+</p>
                    <DogAdd id={currentUser.id} className="add-dog-card"/>
                </div>
            </div>

        </div>
    )}