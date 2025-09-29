import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';
import OwlCarousel from 'react-owl-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};




const Testimonial: React.FC = () => {
  return (
       <div className="container-xxl pb-5" id="testimonial" style={{ backgroundColor: 'red' }}>
         <div className="container-fluid bg-light py-5 my-5"  style={{ backgroundColor: 'red' }}>
         <Navbar />

         <div className="container-fluid py-5"  style={{ backgroundColor: 'purple' }}>
          <h1 className="display-5 text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Testimonial</h1>
            <div className="row justify-content-center">
             <div className="col-lg-3 d-none d-lg-block">
               <div className="testimonial-left h-100">
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.1s" src={testimonialone} alt=""/>
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.3s" src={testimonialtwo} alt=""/>
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.5s" src={testimonialthree} alt=""/>
               </div>
             </div>
             <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
               <div className="owl-carousel testimonial-carousel">
                 <div className="testimonial-item text-center">
                   <div className="position-relative mb-5">
                     <img className="img-fluid rounded-circle border border-secondary p-2 mx-auto" src={testimonialone} alt=""/>
                     <div className="testimonial-icon">
                       <i className="fa fa-quote-left text-primary"></i>
                     </div>
                   </div>
                   <p className="fs-5 fst-italic">🔹Moments of clarity and care—
                                                                                 flowing through time,
                                                                                 presence in every pixel,
                                                                                 together in meaningful work.
                                                  </p>
                   <hr className="w-25 mx-auto"/>
                   <h5>Client Name</h5>
                   <span>Profession</span>
                 </div>
                 <div className="testimonial-item text-center">
                   <div className="position-relative mb-5">
                     <img className="img-fluid rounded-circle border border-secondary p-2 mx-auto" src={testimonialtwo}  alt=""/>
                     <div className="testimonial-icon">
                       <i className="fa fa-quote-left text-primary"></i>
                     </div>
                   </div>
                   <p className="fs-5 fst-italic">🔹Moments of clarity and care—
                                                                                 flowing through time,
                                                                                 presence in every pixel,
                                                                                 together in meaningful work.
                                                    </p>
                   <hr className="w-25 mx-auto"/>
                   <h5>Client Name</h5>
                   <span>Profession</span>
                 </div>
                 <div className="testimonial-item text-center">
                   <div className="position-relative mb-5">
                     <img className="img-fluid rounded-circle border border-secondary p-2 mx-auto" src={testimonialthree} alt=""/>
                     <div className="testimonial-icon">
                       <i className="fa fa-quote-left text-primary"></i>
                     </div>
                   </div>
                   <p className="fs-5 fst-italic">🔹Moments of clarity and care—
                                                                                flowing through time,
                                                                                presence in every pixel,
                                                                                ogether in meaningful work.</p>
                   <hr className="w-25 mx-auto"/>
                   <h5>Client Name</h5>
                   <span>Profession</span>
                 </div>
               </div>
             </div>


             <div className="col-lg-3 d-none d-lg-block">
               <div className="testimonial-right h-100">
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.1s" src={testimonialone}  alt=""/>
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.3s" src={testimonialtwo}  alt=""/>
                 <img className="img-fluid wow fadeIn" data-wow-delay="0.5s" src={testimonialthree}  alt=""/>
               </div>
             </div>
           </div>
         </div>
         </div>
         </div>
 );
};

export default Testimonial;