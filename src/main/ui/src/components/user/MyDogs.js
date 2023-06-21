import AuthService from "../../services/AuthService";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DogAdd from "../dog/DogsAdd";
import RequestAdd from "../request/RequestAdd";

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
        <div>
            <h1>{currentUser.username}</h1>
            <h2>My dogs</h2>
            <div className="dog-grid">
                {dogs.map((dog) => (
                        <div className="dog-card">
                            <Link to={`/dogs/${dog.id}`} className="dog-card-link dog-card-name" key={dog.id}>{dog.name}</Link>
                            <p className="dog-card-breed">{dog.breed}</p>
                            <p className="dog-card-age">{dog.age} years old</p>
                            <p className="dog-card-description">{dog.description}</p>
                            <RequestAdd dogId={dog.id}/>
                        </div>
                ))}
            </div>
            <DogAdd id={currentUser.id}/>
        </div>
    )}