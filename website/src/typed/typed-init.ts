import Typed from 'website/js/typed.js';

export function initTypedText(selector: string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}