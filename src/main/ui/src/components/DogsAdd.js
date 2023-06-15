import React, { useState } from 'react';
import {useParams} from "react-router-dom";

const DogAdd = () => {
    const { id } = useParams()

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dogData = {
            name,
            breed,
            age: parseInt(age),
            description,
        };

        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dogData),
            });

            if (response.ok) {
                // Handle successful dog creation
                console.log('Dog created successfully');
            } else {
                // Handle error response
                console.error('Error creating dog:', response.status);
            }
        } catch (error) {
            console.error('Error creating dog:', error);
        }
    };

    return (
        <>
        <h2>Add your dog</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Breed:
                <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
            </label>
            <label>
                Age:
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <button type="submit">Add Dog</button>
        </form>
        </>
    );
};
export default DogAdd;