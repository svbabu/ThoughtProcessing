import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import Contact from './Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';

const MapLocation: React.FC = () => {
  return (
    <div className="container-xxl pt-5 px-0" style={{backgroundColor:'blue'}}>
      <div className="bg-dark">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
          style={{ width: '100%', height: '450px', border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapLocation;


