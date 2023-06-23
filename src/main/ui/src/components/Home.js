import '../styles/Home.css';
import {Link} from "react-router-dom";

const Home = () => {

    return (
        <div className="home">
            <h1>Paw Pact</h1>
            <Link to={'/get-started'} className="cta-button">Get Started! </Link>
        </div>
    );
};

export default Home;