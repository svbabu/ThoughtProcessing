import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';

import  MapLocation from './MapLocation';
const CopyrightFooter: React.FC = () => {
  return (
    <div className="container-fluid bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            &copy; <a className="border-bottom text-secondary" href="#">Your Site Name</a>, All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
           {/*  Designed By <a className="border-bottom text-secondary" href="https://htmlcodex.com">HTML Codex</a> */}
            Designed by <span className="border-bottom text-secondary">Copilot</span> and <span className="border-bottom text-secondary">Singu</span>
           </div>


          </div>
        </div>
      </div>

  );
};

export default CopyrightFooter;

