import AuthService from "../../services/AuthService";

export const Profile = () => {
    const currentUser = AuthService.getCurrentUser();


    return (
        <div>
            <h2>Profile</h2>

        </div>
    );
}