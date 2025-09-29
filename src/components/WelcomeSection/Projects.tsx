import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import Team from './Team';
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






import OwlCarousel from 'react-owl-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Projects: React.FC = () => {
  return (
        <div className="container-xxl pb-5" id="project" style={{ backgroundColor: 'red' }}>
      <div className="container-xxl py-6 pt-5" style={{ backgroundColor: 'red' }}>
        <div className="container">
          <div className="row g-5 mb-5 align-items-center wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-lg-6">
              <h1 className="display-5 mb-0">My Projects</h1>
            </div>
            <div className="col-lg-6 text-lg-end">
              <ul className="list-inline mx-n3 mb-0" id="portfolio-flters">
                <li className="mx-3 active" data-filter="*">All Projects</li>
                <li className="mx-3" data-filter=".first">UI/UX Design</li>
                <li className="mx-3" data-filter=".second">Graphic Design</li>
              </ul>
            </div>
          </div>
          <div className="row g-4 portfolio-container wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-lg-4 col-md-6 portfolio-item first">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectone}  alt="" />
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectone} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item second">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projecttwo} alt=""/>
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projecttwo} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item first">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectthree} alt=""/>
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectthree}   data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item second">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectfour} alt=""/>
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectfour} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item first">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectfive}  alt=""/>
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectfive} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item second">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectsix} alt=""/>
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectsix} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Team />
      </div>
      </div>

   );
};

      export default Projects;