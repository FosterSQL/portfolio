import { TypeAnimation } from 'react-type-animation';
import ImageCarousel from '../components/ImageCarousel';

import kernel1 from './assets/kernel.jpeg';
import kernel2 from './assets/kernel2.jpeg';
import kernel3 from './assets/kernel3.jpeg';

import oracle1 from './assets/Oraclecloud.jpg';
import oracle2 from './assets/Oraclecloud2.png';
import oracle3 from './assets/Oraclecloud3.png';

import envolve1 from './assets/Reineva.png';
import envolve2 from './assets/Envolvepage.png';

const imagesKernel = [
    { src: kernel1, alt: 'Project kernel Image 1' },
    { src: kernel2, alt: 'Project kernel Image 2' },
    { src: kernel3, alt: 'Project kernel Image 3' },
];

const imagesOracle = [
    { src: oracle1, alt: 'Project Oracle Image 1' },
    { src: oracle2, alt: 'Project Oracle Image 2' },
    { src: oracle3, alt: 'Project Oracle Image 3' },
];

const imagesEvolve = [
    { src: envolve1, alt: 'Project Evolve Image 1' },
    { src: envolve2, alt: 'Project Evolve Image 2' },
];

const Project = () => {
    
    return (
        <div>
        <TypeAnimation
                sequence={[
                    'My projects', 2000,
                    'My work', 2000,
                    'My experience', 2000,
                    'My projects...', 2000,
                    'My work..', 2000,
                    'My experience.', 2000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}
            />
           <div>
            {/* Carrusel 1: Kernel */}
            <h2>Proyect Kernel</h2>
             <h2>I have collaborated on various team-based
                projects, including KERNEL, my graduation
                project, during which I spend one year
                developing a community-based English
                learning platform.
                In this project, I worked with technologies
                like React, Node.js and Firebase and
                software languages like JavaScript, HTML
                and CSS.
            </h2>
            <ImageCarousel images={imagesKernel} />
           
            {/* Carrusel 2: Oracle Cloud */}
            <h2>Proyect Oracle Cloud</h2>
            <h2>In this initiative by the Oracle Education
            Foundation, I was invited to work with a
            team to analyze data related with the
            SDG’s of the United Nations and developed
            a project prototype, winning first place by
            the end of it.
            </h2>
            <ImageCarousel images={imagesOracle} />

            {/* Carrusel 3: Evolve */}
            <h2>Proyect Evolve</h2>
            <h2>Currently, I am working on a project called
            Evolve, which is a technology startup that
            aims to provide innovative solutions implementing
            A.I. in several bussines areas. I work with a team 
            to create solutions like Reineva and Envolve main page.
            </h2>
            <ImageCarousel images={imagesEvolve} />
            
        </div>


    </div>


    );
}
export default Project;