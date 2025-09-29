
import Typed from 'typed.js';
//<script src="js/typed.js"></script>


import Typed from 'typed.js';

const roles: string[] = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Apps Designer",
  "Apps Developer"
];

window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector('.typed-text-output');
  if (el) {
    el.innerHTML = ''; // Clear any previous content
    new Typed('.typed-text-output', {
      strings: roles,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      onBegin: () => {
        el.classList.add('fade-in');
      }
    });
  }
});

   /* document.addEventListener("DOMContentLoaded", function () {
    const typed = new Typed(".typed-text-output", {
    stringsElement: ".typed-text",
    typeSpeed: 180,
    backSpeed: 100,
    loop: true,
    onBegin: function () {
    document.querySelector(".typed-text-output").classList.add("fade-in");
}
});
});*/


/*
export function initTypedText(selector:  string, roles: string[]) {
    new Typed(selector, {
        strings: roles,
        typeSpeed: 180,
        backSpeed: 100,
        loop: true,
        backDelay: 500,
        showCursor: true,
        cursorChar: '!'
    });
})
*/



/*
console.log("Typed.js script loaded");

/*new Typed(".typed-text-output", {
    stringsElement: ".typed-text",
    typeSpeed: 180,
    backSpeed: 100,
    backDelay: 500,
    loop: true
});*/









