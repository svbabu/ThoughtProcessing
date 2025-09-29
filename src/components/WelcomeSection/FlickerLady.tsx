// src/components/WelcomeSection/FlickerLady.tsx
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../../react-layout.css';
import profileimg from '@img/profile.png';

const roles = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Apps Designer",
  "Apps Developer"
];

const FlickerLady: React.FC = () => {
    const typedRef = useRef(null);{/* // ✅ This is the missing piece*/}


useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: roles,
      typeSpeed: 80,
      backSpeed: 100,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '@',
    });

    return () => typed.destroy();
  }, []);




  return (
      <div className="flicker-lady-section">
    <h4>!--@End!-----------&gt;</h4>
      <h4>Hi, I'm not supposed to be here!</h4>

      <img className="img-fluid" src={profileimg} alt="Flicker Lady" />
        <a href="resume-sample.pdf" className="btn btn-primary py-0 px-4 me-2" download title="Download my Java profile">
                         Download CV
              </a>
       <div className="row g-0 align-items-left" style={{backgroundColor:'rebeccapurple'}}>
               <h5 className="text-primary mb-0">I'm</h5>
              <h5 className="text-primary mb-0">S.V.Babu</h5>
              </div>
               <h2 className="typed-text-output d-inline"></h2>
               <div className="typed-text d-none" >Web Designer, Web Developer,
                Front End Developer , Apps Designer, Apps Developer</div>
               <h2 className="typed-text-output d-inline"  style={{backgroundColor:'darkgray'}}>
                 <span ref={typedRef}></span>
               </h2>
         {/* <div className="ms-sm-4"  style={{ backgroundColor:'orange'}}>
              <h4 className="mb-3">Music</h4>
              <h6 className="mb-3">Start from <span className=" text-primary">$199</span></h6>
              <span> Let the silence shape the structure, and let clarity rise like a diamond from the pain.</span>
          </div>
*/}



    </div>

  );
};

export default FlickerLady;

