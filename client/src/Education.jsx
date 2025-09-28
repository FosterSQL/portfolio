import { TypeAnimation } from 'react-type-animation';

const Education = () => {
    return (
        <div>
             <TypeAnimation
                sequence={[
                    'My Education', 2000,
                    'My Education.', 2000,
                    'My Education..', 2000,
                    'My Education...', 2000,
                    'My Education..', 2000,
                    'My Education.', 2000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
            <h2>
                Technical Career in Software Development
            </h2>
            <h2>CENTRO DE ENSEÑANZA TÉCNICA INDUSTRIAL (CETI)</h2>
                <h3>August 2020 - December 2024</h3>
                <h2>------------------------------------------</h2>
            <h2>
                French Speech at
                FRENCH ALLIANCE SCHOOL
            </h2>
                <h3>August 2021 - January 2025</h3>
        </div>
    );
}
export default Education;