import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/dog-animation.json';
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
                width={400} // Set the desired width
                height={300} // Set the desired height
            />}
            <h1>Unleash the Paw Pact</h1>
            <p>Where Happy Dogs and Helpful Friends Collide</p>
            <Link to={'/login'} className="cta-button">Get Started! </Link>
        </div>
    );
};

export default Home;