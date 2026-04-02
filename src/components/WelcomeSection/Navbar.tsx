// src/components/WelcomeSection/NavBar.tsx
import React from 'react';
import { useCart } from '@cart/CartContext';
import { Link } from 'react-router-dom';



import '../../react-layout.css';


import codeheartlove from '@img/rosetree.png';
import familyenjoyful from '@img/womenbreathing.png';
import flowerbokinglass from '@img/flowerbokinglass.png';
import cutelady3 from '@img/cutelady3.png';
import twofriends1 from '@img/twofriends1.png';
import housedesign from '@img/housedesign.png';
import goodlooklady1 from '@img/goodlooklady1.png';
import beautifulweathersun from '@img/beautifulweathersun.png';
import home from '@img/home.png';






const Navbar: React.FC = () => {
     const { cart } = useCart();
     const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (

    <div className="nav-bar-wrapper">
      <img src={goodlooklady1} alt="Family Enjoying Together" className="family-image" />


      <div className="nav-bar">
        <a href="#home" className="nav-link">Home||</a>
        <a href="#about" className="nav-link">About||</a>
        <a href="#skill" className="nav-link">Skills||</a>
        <a href="#service" className="nav-link">Services||</a>
        <a href="#project" className="nav-link">Projects||</a>
        <a href="#testimonial" className="nav-link">Testimonial||</a>
        <a href="#Insights" className="nav-link">Insights||</a>
        <a href="#contact" className="nav-link">Contact</a>

     <nav>
                  {/* other nav links */}
                  <Link to="/cart" className="cart-link">
                    🛒 Cart ({itemCount})
                  </Link>
                </nav>
      </div>
      {/* <img src={codeheartlove} alt="Family Enjoying Together" className="codeheartlove-image" /> */}






    </div>


  );
};

export default Navbar;

