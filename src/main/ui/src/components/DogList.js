import React, { useState, useEffect } from 'react';

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
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    return (
        <div>
            <h1>Dogs</h1>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>{dog.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DogList;