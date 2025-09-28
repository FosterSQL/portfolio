import {Link} from 'react-router-dom';
import Logo from '../src/assets/envolve.jpg';
import './Layout.css';
{/* navegation bar component and Title */}
const Layout = () => {
    return (
        <nav>
            <Link to="/">
                        <img src={Logo} alt="Logo" className="logo-image" width={250} height={150}/>
            </Link> 
            <h1>My portfolio 1.0</h1>
                    
                   // <Link to="about"> About Me </Link>\\
                    <Link to="projects"> My Projects </Link>//
                    <Link to="education"> Education </Link>\\
                    <Link to="services"> Services </Link>//
                    <Link to="contact"> Contact Me </Link>\\
        </nav>
    );
}
export default Layout;