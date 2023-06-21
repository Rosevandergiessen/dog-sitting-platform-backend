import AuthService from "../../services/AuthService";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DogAdd from "../dog/DogsAdd";

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
                    <Link to={`/dogs/${dog.id}`} className="dog-card-link" key={dog.id}>
                        <div className="dog-card">
                            <h3 className="dog-card-name">{dog.name}</h3>
                            <p className="dog-card-description">{dog.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <DogAdd id={currentUser.id}/>
        </div>
    )}