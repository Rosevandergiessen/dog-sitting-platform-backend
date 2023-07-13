import AuthService from "../../services/AuthService";
import React, {useState} from "react";

export const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', imageFile);

        try {
            const response = await fetch(`http://localhost:8080/users/${currentUser.id}`, {
                method: 'PUT',

                body: formData,
            });
            if (response.ok) {
                // Handle successful dog update
                console.log('User updated successfully');
                setIsUpdating(false);
            } else {
                // Handle unsuccessful dog update
                console.log('User update failed');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    const openModal = () => {
        setIsUpdating(true);
    }

    const closeModal = () => {
        setIsUpdating(false);
    }


 return (
     <div>
        <h1>MY PROFILE</h1>
        <h3>{currentUser.username.toUpperCase()}</h3>
        <h3>{currentUser.email.toUpperCase()}</h3>
         <>
             <button onClick={openModal}>Add Image</button>
             {isUpdating && (
                 <div className="modal">
                     <div className="modal-content">
                         <span className="close" onClick={closeModal}>&times;</span>
                         <form onSubmit={handleSubmit}>
                             <label>
                                 Image:
                                 <input type="file" name="image" accept="image/*" required={false}
                                        onChange={(e) => setImageFile(e.target.files[0])}/>
                             </label>
                             <button type="submit">Add Image</button>
                         </form>
                     </div>
                 </div>
             )}
         </>
     </div>
 )}
