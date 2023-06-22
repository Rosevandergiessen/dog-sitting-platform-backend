import React, { useState } from 'react';
import  '../../styles/ModalForm.css';

const DogAdd = ({id}) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);

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
                setIsAdding(false);
                window.location.reload();
            } else {
                // Handle error response
                console.error('Error creating dog:', response.status);
            }
        } catch (error) {
            console.error('Error creating dog:', error);
        }
    };

    const openModal = () => {
        setIsAdding(true);
    };

    const closeModal = () => {
        setIsAdding(false);
    };

    return (
        <>
            <button onClick={openModal}>ADD NEW DOG</button>
            {isAdding && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
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
                            <button type="submit">ADD DOG</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DogAdd;