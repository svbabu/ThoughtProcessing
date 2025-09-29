import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import bgicon from '@img/bg-icon.png';

const Services: React.FC = () => {
  return (
<div className="container-fluid bg-light my-5 py-6" id="service" style={{ backgroundColor:'blue'}}>
<Navbar />
<div className="container py-5" style={{ backgroundColor:'blue'}}>
  <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6" >
          <h1 className="display-5  mb-0">My Services</h1>
          </div>
       <div className="col-lg-6 text-lg-end">
           <a className="btn btn-primary py-3 px-5" href="#contact">Hire Me</a>
           </div>
        </div>

        <div className="row g-4" >
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className=" display-item d-flex flex-column flex-sm-row  bg-white rounded h-100 p-4 p-lg-5">

        <div className="bg-icon  flex-shrink-0 mb-3">
          <i className="fa fa-crop-alt fa-2x text-dark" ></i>
        </div>


        <div className="ms-sm-4" style={{ backgroundColor:'red'}}>
        <h4 className="mb-3">Creative Design</h4>
        <h6 className="mb-3">Start from<span className="text-primary">$199</span></h6>
        <span> Let the silence shape the structure, and let clarity rise like a diamond from the pain.</span>
        </div>
        </div>
        </div>


        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className=" display-item d-flex flex-column flex-sm-row  bg-white rounded h-100 p-4 p-lg-5">

                <div className="bg-icon  flex-shrink-0 mb-3">
                  <i className="fa fa-code-branch fa-2x text-dark" ></i>
                  </div>
        <div className="ms-sm-4"  style={{ backgroundColor:'orange'}}>
        <h4 className="mb-3">Graphic Design</h4>
        <h6 className="mb-3">Start from <span className=" text-primary">$199</span></h6>
        <span> Let the silence shape the structure, and let clarity rise like a diamond from the pain.</span>
        </div>
        </div>
        </div>


        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" >
                <div className=" display-item d-flex flex-column flex-sm-row  bg-white rounded h-100 p-4 p-lg-5">

                <div className="bg-icon  flex-shrink-0 mb-3">
                  <i className="fa fa-code fa-2x text-black" ></i>
                  </div>
        <div className="ms-sm-4"   style={{ backgroundColor:'purple'}}>
        <h4 className="mb-3">Web Design</h4>
        <h6 className="mb-3">Start from <span className="text-primary">$199</span></h6>
        <span>Let the silence shape the structure, and let clarity rise like a diamond from the pain.</span>
        </div>
        </div>
        </div>


        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className=" display-item d-flex flex-column flex-sm-row  bg-white rounded h-100 p-4 p-lg-5">

                <div className="bg-icon  flex-shrink-0 mb-5">
                 <i className="fa-solid fa-laptop-code fa-2x text-dark"> </i>

                  </div>
        <div className="ms-sm-4"  style={{ backgroundColor:'blue'}}>
         <h4 className="mb-3">UI/UX Design</h4>
         <h6 className="mb-3">Start from <span className="text-primary">$199</span></h6>
          <span>Let the silence shape the structure, and let clarity rise like a diamond from the pain.</span>
         </div>
         </div>
         </div>
     </div>
    </div>
    </div>
   );
  };

export default Services;