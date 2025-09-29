import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';

import projectone from '@img/project-1.png';
import projecttwo from '@img/project-2.png';
import projectthree from '@img/project-3.png';
import projectfour from '@img/project-4.png';
import projectfive from '@img/project-5.png';
import projectsix from '@img/project-6.png';

import teamone from '@img/team-1.png';
import teamtwo from '@img/team-2.png';
import teamthree from '@img/team-3.png';
import teamfour from '@img/goodlooklady1.png';
import teamfive from '@img/goodlooklady.png';
import teamsix from '@img/teamsix.png';


import OwlCarousel from 'react-owl-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Team: React.FC = () => {
  return (
      <div className="container-xxl py-6 pb-5" id="team" style={{backgroundColor:'purple'}}>
        <div className="container">
          <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-lg-6"  >
              <h1 className="display-5 mb-0">Team Members</h1>
            </div>
            <div className="col-lg-6 text-lg-end">
              <a className="btn btn-primary py-3 px-5" href="#contact">Contact Us</a>
            </div>
          </div>
          <div className="row g-4" >
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s"  >
              <div className="team-item position-relative" >
                <img className="img-fluid rounded" src={teamone} alt=""/>
                <div className="team-text bg-white rounded-end p-4"  >
                  <div>
                    <h5 style={{backgroundColor:'red'}}>Full Name</h5>
                    <span style={{backgroundColor:'red'}}>Designer</span>
                  </div>
                  <i className="fa fa-arrow-right fa-2x text-primary"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item position-relative">
                <img className="img-fluid rounded" src={teamtwo} alt=""/>
                <div className="team-text bg-white rounded-end p-4">
                  <div>
                    <h5  style={{backgroundColor:'red'}}>Full Name</h5>
                    <span style={{backgroundColor:'red'}}>Designer</span>
                  </div>
                  <i className="fa fa-arrow-right fa-2x text-primary"></i>
                </div>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                          <div className="team-item position-relative">
                            <img className="img-fluid rounded" src={teamthree} alt=""/>
                            <div className="team-text bg-white rounded-end p-4">
                              <div>
                                <h5  style={{backgroundColor:'red'}}>Full Name</h5>
                                <span style={{backgroundColor:'red'}}>Designer</span>
                              </div>
                              <i className="fa fa-arrow-right fa-2x text-primary"></i>
                            </div>
                          </div>
                        </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item position-relative">
                <img className="img-fluid rounded" src={teamfour}alt=""/>
                <div className="team-text bg-white rounded-end p-4">
                  <div>
                    <h5  style={{backgroundColor:'red'}}>Full Name</h5>
                    <span  style={{backgroundColor:'red'}}>Designer</span>
                  </div>
                  <i className="fa fa-arrow-right fa-2x text-primary"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                          <div className="team-item position-relative">
                            <img className="img-fluid rounded" src={teamfive} alt=""/>

                            <div className="team-text bg-white rounded-end p-4">
                              <div>
                                <h5  style={{backgroundColor:'red'}}>Full Name</h5>
                                <span  style={{backgroundColor:'red'}}>Designer</span>
                              </div>
                              <i className="fa fa-arrow-right fa-2x text-primary"></i>
                            </div>
                             <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                                                              <div className="team-item position-relative">
                                                                                <img className="img-fluid rounded" src={teamsix} alt=""/>
                                                                                <div className="team-text bg-white rounded-end p-4">
                                                                                  <div>
                                                                                    <h5  style={{backgroundColor:'red'}}>Full Name</h5>
                                                                                    <span  style={{backgroundColor:'red'}}>Designer</span>
                                                                                  </div>
                                                                                  <i className="fa fa-arrow-right fa-2x text-primary"></i>
                                                                                </div>
                                                                              </div>
                                                                            </div>

                          </div>
                        </div>

          </div>
        </div>
      </div>


      );
  };
export default Team;