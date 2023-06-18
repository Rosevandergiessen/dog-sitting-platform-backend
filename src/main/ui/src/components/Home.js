import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/dog-animation.json';
import '../styles/Home.css';

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
            <button className="cta-button">Get Started</button>
        </div>
    );
};

export default Home;