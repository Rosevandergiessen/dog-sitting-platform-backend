import React, { useState } from 'react';
import  '../../styles/ModalForm.css';

const RequestAdd = ({dogId}) => {

    const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, -8));
    const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, -8));
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            startTime,
            endTime,
        };

        try {
            const response = await fetch(`http://localhost:8080/requests/${dogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // Handle successful dog creation
                console.log('Request created successfully');
                setIsAdding(false);
                window.location.reload();
            } else {
                // Handle error response
                console.error('Error creating request:', response.status);
            }
        } catch (error) {
            console.error('Error creating request:', error);
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
            <button onClick={openModal}>MAKE NEW REQUEST</button>
            {isAdding && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Start Time:
                                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            </label>
                            <label>
                                End Time:
                                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </label>
                            <button type="submit">Add Request</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RequestAdd;