
import {Route, Routes} from "react-router-dom";
import Home from "./src/Home";
import About from "./src/About";
import Projects from "./src/Projects";
import Education from "./src/Education";
import Services from "./src/Services";
import Contact from "./src/Contact";
import LayoutHeader from "./components/Layout";

const MainRouter = () => {
    return (
        <div>
        <LayoutHeader/>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/education" element={<Education />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/contact" element={<Contact />} />
        </Routes>
        </div>
    );
};
export default MainRouter;
