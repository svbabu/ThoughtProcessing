import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import shoes from '@img/shoes.png';
import { useNavigate } from 'react-router-dom';


export const ShoesPromoCard = () => {
    const navigate = useNavigate(); // ✅ Correct placement

    return (
       /* <PromoBox
            title="Shoes"
            festivalLabel="Diwali Festival Offer"
            subtext="Step into celebration 👟"
            offer="Flat 30% OFF"
            route="/shoes"
            badge="15% OFF"
        />*/


    <div className="portfolio-img rounded overflow-hidden" style={{ position: 'relative', width: '300px' }}>
            <img
                className="img-fluid"
                src={shoes}
                alt="shoes"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/shoes')}
            />
            {/*<div className="promo-banner">
                <span className="badge bg-success me-2">25% OFF</span>
                <span className="offer-label new-year">New Year Deal</span>
            </div>*/}


            <div className="discount-overlay">
                <div className="badge bg-success">15% OFF</div>
                {/*<span className="offer-label" style={{ color: 'rgba(255,238,51,0.99)' }}>
  Diwali Festival Offer
</span>*/}

                <span className="offer-label ms-2" style={{ color: 'rgba(255,238,51,0.99)', fontWeight: 'bold' }}>
                    Diwali Festival Offer</span>
            </div>
        </div>
    );
};

