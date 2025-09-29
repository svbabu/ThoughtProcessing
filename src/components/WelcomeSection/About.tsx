import React from 'react';
import '../../react-layout.css';


import Navbar from './Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

import aboutone from '@img/about-1.png';
import abouttwo from '@img/about-2.png';

const About: React.FC = () => {
  return (

      <div className="about-section" id="about" style={{backgroundColor:'white'}}>
           {/* Left Column */}
           <div className="about-text">
             <h2 className="section-title">About Me</h2>
             <p>
              I'm being 6 years of working experiance as a Java developer, web designer, and backend specialist. My focus is clarity, care, and modular architecture.
             </p>
             <ul className="list-unstyled">
               <li><i className="far fa-check-circle text-primary me-2"></i>Affordable Prices</li>
               <li><i className="far fa-check-circle text-primary me-2"></i>High Quality Product</li>
               <li><i className="far fa-check-circle text-primary me-2"></i>On Time Project Delivery</li>
             </ul>
           </div>

           {/* Right Column */}
           <div className="about-images">
             <img src={aboutone} alt="About" className="img-fluid rounded mb-3" />
             <img src={abouttwo} alt="About" className="img-fluid rounded" />
           </div>
         </div>





  );
};

export default About;

