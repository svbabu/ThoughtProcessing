<script src="js/typed.js"></script>

    document.addEventListener("DOMContentLoaded", function () {
    const typed = new Typed(".typed-text-output", {
    stringsElement: ".typed-text",
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    onBegin: function () {
    document.querySelector(".typed-text-output").classList.add("fade-in");
}
});
});

import Typed from 'typed.js';

export function initTypedText(selector: string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 1000,
        showCursor: true,
        cursorChar: '|'
    });
}




console.log("Typed.js script loaded");

new Typed(".typed-text-output", {
    stringsElement: ".typed-text",
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});



document.querySelector(".typed-text-output").innerHTML = "";





