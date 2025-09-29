// src/types/typed-init.ts
// src/typed/typed-init.ts
import Typed from 'typed.js';



/*
export function initTypedText(selector: string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}
 */


//typed-init.ts



export function initTypedText(selector: string, roles: string[]) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.add('fade-in');
    }

    // Clear previous content

    new Typed(selector, {
        strings: roles,
        typeSpeed: 300,
        backSpeed: 150,
        loop: true,
        backDelay: 500,
        showCursor: true,
        cursorChar: '|',
        onBegin: function () {
            const el = document.querySelector(selector);
            if (el) el.classList.add('fade-in');
        }
    } as any); // 👈 bypasses strict typing



    console.log("Typed.js initialized with roles:", roles);
}







//import Typed from 'website/js/typed.js';
/*
import Typed from '../../website/js/typed.js'; // ✅ relative path


export function initTypedText(selector: string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}*/
