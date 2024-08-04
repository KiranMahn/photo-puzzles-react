import React, { useState } from 'react';
import './admin.css';

const Msg = (props) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const messages = [
        'I love you Noah',
        'Do you have a map? Because I just got lost in your eyes again.',
        'You\'re my silly goose. Honk!',
        'If kisses were snowflakes, I\'d send you a blizzard.',
        'You\'re my favorite part of every day.',
        'You, Noah, are my favorite person in the whole wide world',
        'If we were geese, I\'d follow you anywhere, because wherever you go, my heart waddles after you.',
        'Do you have a sunburn, or are you always this hot?',
        'You\'re my sunshine on a cloudy day.',
        'If I were a cat, I\'d spend all 9 lives with you. Meow',
        'I\'m so lucky to have you.',
        'You must be tired because you\'ve been running through my mind all day.',
        'Do you like Star Wars? Because Yoda one for me.'
    ];

    const nextMessage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            setFade(false);
        }, 500); // Duration should match the CSS transition duration
    };

    const prevMessage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
            setFade(false);
        }, 500); // Duration should match the CSS transition duration
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100vw', display: 'flex', justifyContent: 'space-evenly', marginTop: '3em', height: '10vh', backgroundColor: 'rgba(79, 79, 79, 0.1)'}}>
                <button onClick={prevMessage}>{"<"}</button>
                <p className={`message ${fade ? 'fade' : ''}`} style={{ margin: '0 20px', width: '60vw', textAlign: 'center', margin: '0.5em'}}>
                    {messages[currentMessageIndex]}
                </p>
                <button onClick={nextMessage}>{">"}</button>
            </div>
        </div>
    );
}

export default Msg;
