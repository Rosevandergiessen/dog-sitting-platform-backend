import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import  '../styles/DogCard.css';

const DogList = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        fetchDogs();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await fetch('http://localhost:8080/dogs');
            const data = await response.json();
            setDogs(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    if (!dogs) {
        return <div>Loading...</div>;
    }

    return (
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
    );
};

export default DogList;