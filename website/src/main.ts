import { initTypedText } from '../src/typed/typed-init';

document.addEventListener("DOMContentLoaded", () => {
    initTypedText('.typed-text-output', [
        'Web Designer',
        'Web Developer',
        'Front-End Architect',
        'Apps Designer',
        'Apps Developer'
    ]);
});

