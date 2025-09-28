import { TypeAnimation } from 'react-type-animation';

export default function Contact() {
    return (
        <div>
            {/* Contact information and animation */}
            <h2>Contact Me</h2>
            <TypeAnimation
                sequence={[
                    'Mail: fostersquid@gmail.com', 4000,
                    'GitHub: https://github.com/FosterSQL', 4000,
                    'https://www.linkedin.com/in/fostersq-diego-emiliano-gonzalez-martinez/', 4000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
}