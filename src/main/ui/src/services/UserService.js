import React from "react";
import { useNavigate} from "react-router-dom";

const addFriend = async (friendId, currentUser) => {

    try {
        if (!currentUser || !currentUser.id) {
            console.error('Log in to add friends!');
            return;
        }

        const friendshipData = {
            userId1: currentUser.id,
            userId2: friendId,
        };

        const response = await fetch('http://localhost:8080/friendships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(friendshipData),
        });

        if (response.ok) {

            console.log('Friend added successfully!');
        } else {
            console.error('Failed to add friend:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding friend:', error);
    }
};

export default addFriend;