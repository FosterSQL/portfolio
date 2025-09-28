import { TypeAnimation } from 'react-type-animation';

const Home = () => {
    return(
        <div>
            <h2>Welcome</h2>
            <TypeAnimation
                sequence={[
                    'I am Diego Gonzalez', 2000,
                    'I am a Full Stack Developer', 2000,
                    'I am a Software Engineer', 2000,
                    'I am a Tech Enthusiast', 2000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={50}
                repeat={Infinity}
                style={{ fontSize: '5em', textAlign: 'center', marginTop: '20px' }}
            />
        </div>
    );
};
export default Home;