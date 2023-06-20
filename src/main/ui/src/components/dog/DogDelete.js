import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const DogDelete = () => {
    const { id } = useParams();
    const [isConfirming, setIsConfirming] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dogs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Handle successful deletion
                console.log('Dog deleted successfully');
                navigate(-1)
            } else {
                // Handle error response
                console.error('Error deleting dog:', response.status);
            }
        } catch (error) {
            console.error('Error deleting dog:', error);
        }
    };

    const confirmDelete = () => {
        setIsConfirming(true);
    };

    const cancelDelete = () => {
        setIsConfirming(false);
    };

    return (
        <>
            {isConfirming ? (
                <>
                    <p>Are you sure you want to delete this dog?</p>
                    <button onClick={handleDelete}>Yes, delete</button>
                    <button onClick={cancelDelete}>Cancel</button>
                </>
            ) : (
                <button onClick={confirmDelete}>Delete Dog</button>
            )}
        </>
    );
};

export default DogDelete;