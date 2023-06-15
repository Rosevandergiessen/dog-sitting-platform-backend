import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

const DogDetails = () => {
    const [dog, setDog] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        fetchDog();
    }, []);

    const fetchDog = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`);
            const data = await response.json();
            setDog(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching dog:', error);
        }
    };

    if (!dog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{dog.name}</h1>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Description: {dog.description}</p>
        </div>
    );
};

export default DogDetails;
