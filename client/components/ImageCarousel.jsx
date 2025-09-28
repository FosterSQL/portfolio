
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 

//slide default options
const splideOptions = {
    type: 'loop',
    perPage: 1,
    direction: 'ltr',
    autoplay: true,
    interval: 3500,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
};

// Recieve images array as property
const ImageCarousel = ({ images }) => {
    // If there are no images render nothing
    if (!images || images.length === 0) {
        return <p>No images to display.</p>;
    }

    return (
        <div className="carousel-container" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <Splide options={splideOptions} aria-label="Project Images">
                
                {images.map((image, index) => (
                    <SplideSlide key={index}>
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            // 
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default ImageCarousel;