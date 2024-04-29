import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <section className="start">
            <div className="container">
                <div className="start-wrap">
                    <div className="start-text">
                        <h1>This is the home page</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;