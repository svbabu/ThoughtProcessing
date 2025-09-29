import React from 'react';
import { WelcomeLogoProps } from '../../interfaces/WelcomeLogoProps';
import '../../react-layout.css';



const WelcomeLogo: React.FC<WelcomeLogoProps> = ({ src, alt, caption }) => {
  return (
    <div className="welcome-logo">
      <img src={src} alt={alt} />
      <p className="image-caption">{caption}</p>
    </div>
  );
};

export default WelcomeLogo;

