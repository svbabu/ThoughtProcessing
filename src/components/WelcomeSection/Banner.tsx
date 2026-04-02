import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import {BannerProps, Product} from '../../typed/Product';




import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
// components/Banner.tsx



const Banner: React.FC<BannerProps> = ({ product }) => {
    if (!product) return null;

    return (
        <div className="banner">
            <img src={product.imageSrc} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p>{product.offerLabel}</p>
            <p>{product.description}</p>
            <span>₹{product.appliedPrice} (Save {product.discountPercentage}%)</span>
        </div>
    );
};

export default Banner;

