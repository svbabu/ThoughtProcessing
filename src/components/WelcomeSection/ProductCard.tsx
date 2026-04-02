import {ProductList} from "./ProductList";

import {data, useNavigate} from 'react-router-dom';

import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import {useState} from 'react';
import {Product} from '../../typed/Product';
import { useCart } from '../cart/CartContext';


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImage from '@img/mobile.png';
import latop from '@img/latop.png';
import mobile from '@img/mobile.png';
import shoes from '@img/shoes.png';


/*type ProductCardProps = {
    title: string;
    image: string;
    originalPrice: number;
    discountPercentage: number;
    appliedPrice: number;
};*/


type ProductCardProps = {
    data: Product,
    title?: string,
    image?: string,
    originalPrice?: number,
    discountPercentage?: number,
    appliedPrice?: number,
    saved:number,
    onAddToCart?: (product: Product) => void;




};


export const ProductCard: React.FC<ProductCardProps> = ({
                                                            data,
                                                            title,
                                                            image,
                                                            originalPrice,
                                                            discountPercentage,
                                                            appliedPrice,
                                                            saved,
                                                            onAddToCart // ✅ Add this here


                                                        }) => {
    /*const imageMap: { [key: string]: string } = {
        'latop': latop,
        'laptop': latop, // alias for typo or legacy data
        'mobile': mobile,
        'shoes': shoes,
    };*/
    const productImages: Record<string, string> = {
        "Laptop": latop,
        "Mobile Phone": mobile,
        "Shoes": shoes,
    };
    const { cart } = useCart();
    const isInCart = cart.some(item => item.id === data.id);





    const resolvedImage = productImages[data.productName.trim()] || defaultImage;


    /*  const resolvedImage = data.image?.startsWith('http')
          ? data.image
          : imageMap[data.image] || defaultImage;*/


    /*const resolvedImage = imageMap[data.image] || defaultImage;*/



    return (
        <div className="product-card">

            <img
                className="img-fluid"
                src={resolvedImage}
                alt={data.productName}
                style={{height: '200px', objectFit: 'cover'}}
            />


            <div className="card-body">
                <h5>{data.productName}</h5>
                <p>
          <span className="text-muted text-decoration-line-through">
            ₹{data.originalPrice}
          </span>{' '}
                    <span className="text-success fw-bold">₹{data.appliedPrice}</span>
                </p>
                <div className="offer-badge">
                    <span className="badge bg-success">{data.discountPercentage}% OFF </span>
                    {data.offerLabel && (
                        <span className="offer-label ms-2 text-muted">{data.offerLabel}</span>
                    )}

                    {onAddToCart && (
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => {
                                if (onAddToCart) {
                                onAddToCart({
                                ...data,
                                imageSrc: resolvedImage, // ✅ Attach the resolved image
                            });
                            }
                            }}
                        >

                            Add to Cart




                        </button>
                    )}

                </div>



            </div>
        </div>
    );
};

