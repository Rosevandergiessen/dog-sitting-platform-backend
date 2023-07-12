import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DogUpdate = () => {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchDog = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`);
            const dogData = await response.json();

            setName(dogData.name);
            setBreed(dogData.breed);
            setAge(dogData.age.toString());
            setDescription(dogData.description);
            setImageFile(dogData.image);
        } catch (error) {
            console.error('Error fetching dog:', error);
        }
    };

    useEffect(() => {
        fetchDog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('age', age);
        formData.append('description', description);
        formData.append('image', imageFile);

        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                // Handle successful dog update
                console.log('Dog updated successfully');
                setIsEditing(false);
                window.location.reload();
            } else {
                // Handle error response
                console.error('Error updating dog:', response.status);
            }
        } catch (error) {
            console.error('Error updating dog:', error);
        }
    };

    const openModal = () => {
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsEditing(false);
    };

    return (
        <>
            <button onClick={openModal}>Edit Dog</button>
            {isEditing && (
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
                            <label>
                                Image:
                                <input type="file" name="image" accept="image/*" required={false} onChange={(e) => setImageFile(e.target.files[0])} />
                            </label>
                            <button type="submit">Update Dog</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DogUpdate;