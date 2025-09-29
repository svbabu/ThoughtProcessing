import React from 'react';
import { WelcomeLogoProps } from '../../interfaces/WelcomeLogoProps';
import '../../react-layout.css';
import FlickerLady from './FlickerLady';



import TwoWomenHan from '@img/TwoWomenHan.png';
import freeflagspiritmotherkid from '@img/freeflagspiritmotherkid.png';
import fatherkid from '@img/fatherkid.png';
import familyenjoy from '@img/familyenjoy.png';
import profileimg from '@img/profile.png';


const WelcomeLogo: React.FC<WelcomeLogoProps> = ({ src, alt, caption }) => {
  return (
    <div className="welcome-logo">
      <img src={src} alt={alt}  loading="lazy"/>
      <p className="image-caption">{caption || 'Affirming presence'}</p>


</div>






  );


};
export default WelcomeLogo;

