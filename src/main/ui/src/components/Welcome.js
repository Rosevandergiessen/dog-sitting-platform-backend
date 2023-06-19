import React from 'react';
import {useLocation} from "react-router-dom";

export const Welcome = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    return <h2>Welcome {username}!</h2>;
};