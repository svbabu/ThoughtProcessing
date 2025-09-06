/*
import React, { useEffect } from 'react';
import Typed from 'typed.js';

export default function App() {
    useEffect(() => {
        const typed = new Typed('.typed-text-output', {
            stringsElement: '.typed-text',
            typeSpeed: 120,
            backSpeed: 80,
            loop: true,
            onBegin: function () {
                document.querySelector('.typed-text-output')?.classList.add('fade-in');
            }
        });

        return () => typed.destroy(); // cleanup on unmount
    }, []);

    return (
        <div>
            <div className="typed-text">
                <span>Web Designer</span>
                <span>Web Developer</span>
                <span>Front-End Architect</span>
                <span>Apps Designer</span>
                <span>Apps Developer</span>
            </div>
            <span className="typed-text-output"></span>
        </div>
    );
}
*/
