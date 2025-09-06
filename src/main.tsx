import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header'; // ✅ matches named export
import { initTypedText } from './typed/typed-init';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <main className="main-column">
            <Header />
        </main>
    </React.StrictMode>
);

//initTypedText(); // optional animation logic

// main.ts
//import { initTypedText } from './typed/typed-init';

document.addEventListener("DOMContentLoaded", () => {
    initTypedText('.typed-text-output', [
        'Web Designer',
        'Web Developer',
        'Front-End Architect',
        'Apps Designer',
        'Apps Developer'
    ]);
});

