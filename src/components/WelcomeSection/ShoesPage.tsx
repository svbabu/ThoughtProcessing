import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';




import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';

export const ShoesPage = () => {
    const [shoes, setShoes] = useState<Product[]>([]);





    useEffect(() => {
        axios
            .get('http://localhost:8081/api/prod-offers', {
                params: { originalprice: 50000 }
            })
            .then((res) => {
                const shoessOnly = res.data.filter((item: Product) => item.productName === 'Shoes');
                setShoes(shoessOnly);
            })
            .catch((err) => console.error('Offer fetch failed:', err));
    }, []);





    return (
        <div className="Shoes-page">
            <h5>💻 Shoes with 15% Discount</h5>
            <ProductList products={shoes} />
        </div>
    );
};



