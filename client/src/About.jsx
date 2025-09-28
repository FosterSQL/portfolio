import { TypeAnimation } from 'react-type-animation';

import picture from './assets/profile-picture.png';
import resumePDF from './assets/Resume.pdf';
const About = () => {
    
    return (
        <div>
            <TypeAnimation
                sequence={[
                    'About me', 2000,
                    'About me.', 2000,
                    'About me..', 2000,
                    'About me...', 2000,
                    'About me..', 2000,
                    'About me.', 2000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
            {/* Description */}
            <h2>Hey! My name is Diego Emiliano Gonzalez Martinez</h2>
            <h2>Im a Software Developer graduated from CETI
                Colomos, Mexico. I am currently seeking new
                opportunities to apply my skills, grow
                professionally and contribute to impactful
                projects.
                To this day, I'm currently enrolled in Software
                Engineering at the Centennial college, Canada.</h2>
                
            {/* profile picture */}
            <div image-container>
                <img src={picture} alt="Profile" className="profile-image"  height={400}/> 
            </div>

            {/* resume link */}
             <a 
                href={resumePDF} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', marginTop: '20px' }} // Optional styling
            >
                Download My Resume (PDF) 📄
            </a>
        </div>
    );
}
export default About;