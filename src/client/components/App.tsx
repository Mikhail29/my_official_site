import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Header from "./Header";

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </main>
        </div>
);
};

export default App;