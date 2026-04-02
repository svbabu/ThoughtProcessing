import React from 'react';
import { useState } from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import {ProductCard} from "./ProductCard";
import { featuredProducts } from '../../typed/Product';
import { useCart } from '../cart/CartContext';

import shoes from '@img/shoes.png';
import laptop from '@img/laptop.png';
import mobile from '@img/mobile1.png';
import {PromoCard} from "./PromoCard";

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
type Product = {
    title: string;
    id: string;
    productName: string;
    price:number;
    description: string;
    originalPrice: number;
    discountPercentage: number;
    appliedPrice: number;
    image: string;
    imageSrc:string;
    discount:number;
    navigateTo:string;
    onAddToCart?: (product: Product) => void;
    deliveryDates: string[]; // ✅ Add this line
    selectedDate?: string | null,
    saved:number





};

type ProductListProps = {
    products: Product[];
    category?: string;
    onAddToCart?: (product: Product) => void;



};



/*{featuredProducts.map((product, index) => (
    <PromoCard key={index} product={product} />
))}*/







/*export const ProductList = ({ products }: ProductListProps) => (
    <div className="grid-layout">
        {products.length === 0 ? (
            <p className="text-muted">No products available.</p>
        ) : (
            products.map((p) => <ProductCard key={p.id} data={p} />)
        /!*{filtered.map(p => <ProductCard key={p.id} data={p} />)}*!/

)}
    </div>
);*/
export const ProductList = ({ products, category,onAddToCart }: ProductListProps) => {
    const filtered = category
        ? products.filter(p => p.productName === category)
        : products;

  /*  <div className="product-list">
        {featuredProducts.map((product, index) => (
            <ProductCard key={index} data={product} />
        ))}
    </div>*/



    return (

        <div className="grid-layout">
            {filtered.length === 0 ? (
                <p className="text-muted">No products available.</p>
            ) : (
                filtered.map((p) => <ProductCard
                    key={p.id}

                    data={p}

                   title={p.productName}
                    image={p.image}
                    originalPrice={p.originalPrice}
                    discountPercentage={p.discountPercentage}
                    appliedPrice={p.appliedPrice}
                    saved={p.saved}
                    onAddToCart={onAddToCart} // ✅ Pass it here

                />)
            )}
        </div>
    );
};





