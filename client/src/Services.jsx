import { TypeAnimation } from 'react-type-animation';

export default function Services() {
    return (
        <div>
            <TypeAnimation
                sequence={[
                    'Web', 8000,
                    'Database', 8000,
                    'Version control', 4000,
                    'Design', 4000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
            <TypeAnimation
                sequence={[
                    'React', 2000,
                    'Html', 2000,
                    'Css', 2000,
                    'node', 2000,

                    'My SQL', 2000,
                    'Oracle One', 2000,
                    'Mongo DB', 2000,
                    'Firebase', 2000,

                    'Git', 2000,
                    'GitHub', 2000,

                    'Agile Methodologies', 2000,
                    'Figma', 2000,                    
                ]}
                wrapper="h2"
                cursor={true}
                speed={30}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
}