import React, { useState } from 'react';
import './admin.css';

const Memory = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Replace these with your own image URLs
    const images = [
        'memory2.jpeg',
        'memory1.jpeg',
        'memory3.png'
    ];

    const nextImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(false);
        }, 500); // Duration should match the CSS transition duration
    };

    const prevImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setFade(false);
        }, 500); // Duration should match the CSS transition duration
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', width: '90vw', display: 'flex', justifyContent: 'center', marginTop: '6em',  marginBottom: '3em' }}>
                <button onClick={prevImage}>{"<"}</button>
                <img
                    src={images[currentImageIndex]}
                    alt="Memory"
                    className={`image ${fade ? 'fade' : ''}`}
                    style={{ margin: '0 20px', boxShadow: '2px 2px 3px 3px rgba(56, 52, 52, 0.3)', objectFit: 'cover', width: '67vw', height: '67vw', maxHeight: '450px', maxWidth: '450px'}}
                />
                <button onClick={nextImage}>{">"}</button>
            </div>
        </div>
    );
}

export default Memory;
