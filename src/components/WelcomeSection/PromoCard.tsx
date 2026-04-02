import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import shoes from '@img/shoes.png';
import laptop from '@img/laptop.png';
import mobile from '@img/mobile1.png';
import { useNavigate } from 'react-router-dom';



 export const PromoCard = ({ product }: { product: Product }) => {



    const { imageSrc, productName, discount, navigateTo } = product;
        const navigate = useNavigate();

        return (
            <div className="portfolio-img rounded overflow-hidden" style={{ position: 'relative', width: '300px' }}>
                <img
                    className="img-fluid"
                    src={imageSrc}
                    alt={productName}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(navigateTo)}
                />
                <div className="discount-overlay">
                    {discount}% OFF
                </div>
            </div>
        );
    };



