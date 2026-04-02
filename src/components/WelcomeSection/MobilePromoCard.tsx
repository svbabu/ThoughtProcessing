import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import mobile from '@img/mobile.png';
import { useNavigate } from 'react-router-dom';


export const MobilePromoCard = () => {
    const navigate = useNavigate(); // ✅ Correct placement

    return (
        /*<PromoBox
            title="Mobiles"
            festivalLabel="Diwali Festival Offer"
            subtext="Smart choices, festive prices 📱"
            offer="Up to 50% OFF"
            route="/mobiles"
            badge="15% OFF"
        />*/


    <div className="portfolio-img rounded overflow-hidden" style={{ position: 'relative', width: '300px' }}>
            <img
                className="img-fluid"
                src={mobile}
                alt="mobile"
                role="button"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/mobiles')}
            />
            <div className="discount-overlay">
                <div className="badge bg-success" style={{ color: 'rgb(255,255,255)' }}>20% OFF</div>
                {/*<span className="offer-label ms-2" style={{ color: '#FFD700', fontWeight: 'bold' }}>
                    Diwali Festival Offer</span>*/}
                <span className="offer-label" style={{ color: 'rgba(255,238,51,0.99)' }}>
  Diwali Festival Offer
</span>

            </div>
        </div>
    );
};