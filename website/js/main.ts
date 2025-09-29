//import { initTypedText } from '../src/typed/typed-init';
import { initTypedText } from '../../src/typed/typed-init'; // adjust path as needed
import Typed from 'typed.js';


/*
document.addEventListener("DOMContentLoaded", () => {
  //if (!window.__typedInitialized) {
    initTypedText('.typed-text-output', [
      'Web Designer',
      'Web Developer',
      'Front-End Architect',
      'Apps Designer',
      'Apps Developer'
    ]);
    //window.__typedInitialized = true;
  });
 */
 // Define your roles as an array for clarity and pacing
 const roles: string[] = [
   "Web Designer",
   "Web Developer",
   "Front End Developer",
   "Apps Designer",
   "Apps Developer"
 ];

 // Initialize Typed.js on the target element
 const typed = new Typed('.typed-text-output', {
   strings: roles,
   typeSpeed: 50,
   backSpeed: 25,
   loop: true,
   //smartBackspace: true,
  // showCursor: true,
 });



