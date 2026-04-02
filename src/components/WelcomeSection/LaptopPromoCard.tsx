import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import {PromoBox} from './PromoBox';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import latop from '@img/latop.png';
import { useNavigate } from 'react-router-dom';



export const LaptopPromoCard = () => {
   /* const navigate = useNavigate();*/ // ✅ Correct placement

    return (
        /*<div
           lassName="static-offer-block"
            onClick={() => navigate('/laptops')}
            style={{ cursor: 'pointer' }}
        >*/
            <PromoBox
                title="Hurry Up Laptops sale closing end soon"
                festivalLabel="Diwali Festival Offer"
                subtext="Celebrate with tech that shines ✨"
                offer="40%-70% OFF"
                route="/laptops"
                badge="40%-70% OFF"
            />


            /*<h2 className="category-heading">Hurry Up Laptops sale closing end soon</h2>
            <div className="festival-label">Diwali Festival Offer</div>
            <div className="subtext">Celebrate with tech that shines ✨</div>
            <p className="offer-text">40%-70%</p>
    </div> */




        /*<div className="portfolio-img rounded overflow-hidden" style={{ position: 'relative', width: '300px' }}>
            <img
                className="img-fluid"
                src={latop}
                alt="Laptop"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/laptops')}
            />
            <div className="discount-overlay" >
                <div className="badge bg-success">25% OFF</div>
                <span className="offer-label" style={{ color: 'rgba(255,238,51,0.99)' }}>
  New Year Deal
</span>


                {/!*<span className="offer-label ms-2" style={{ color: '#FFD700', fontWeight: 'bold' }}>
    New Year Deal
  </span>*!/}


            </div>


        </div>*/
    );
};

