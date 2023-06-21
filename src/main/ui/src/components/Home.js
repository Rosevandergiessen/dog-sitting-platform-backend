import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/paw.json';
import '../styles/Home.css';
import {Link} from "react-router-dom";

const Home = () => {
    useEffect(() => {
        // Define the lottieOptions inside the useEffect hook
        const lottieOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
        };

        setAnimationOptions(lottieOptions);
    }, []);

    const [animationOptions, setAnimationOptions] = useState(null);

    return (
        <div className="home">
            {animationOptions && <Lottie
                options={animationOptions}
                height={200}
                speed={0.4}
                color={'#FFD700'}
            />}
            <h1>Unleash the Paw Pact</h1>
            <p>Where Happy Dogs and Helpful Friends Collide</p>
            <Link to={'/get-started'} className="cta-button">Get Started! </Link>
        </div>
    );
};

export default Home;