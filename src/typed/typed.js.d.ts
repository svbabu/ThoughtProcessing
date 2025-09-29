// src/types/typed-js.d.ts or src/typed/typed-js.d.ts
//import Typed from 'typed.js';
// src/types/typed-js.d.ts
declare module 'typed.js' {
    export default class Typed {
        constructor(selector: string, options: {
            strings: string[];
            typeSpeed?: number;
            backSpeed?: number;
            backDelay?: number; // 👈 add this line
            loop?: boolean;
            showCursor?: boolean;
            cursorChar?: string;
            onBegin?: () => void;
        });
    }
}




/*
declare module 'typed.js' {
    export default class Typed {
        constructor(selector: string, options: {
            strings: string[];
            typeSpeed?: number;
            backSpeed?: number;
            loop?: boolean;
        });
    }
}
*/



/*declare module '../../website/js/typed.js' {
    declare module 'typed.js' {

        export default class Typed {
            constructor(selector: string, options: {
                strings: string[];
                typeSpeed?: number;
                backSpeed?: number;
                loop?: boolean;
            });
        }
    }}*/


/*export function initTypedText(selector: string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}
}*/