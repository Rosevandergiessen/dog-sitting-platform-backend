import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

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
        <>
            <h1>Dogs</h1>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>
                        <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DogList;