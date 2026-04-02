import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import Banner from './Banner';
/*cart imports*/
import { useCart } from '../cart/CartContext';
import latop from '@img/latop.png';




/*cart imports*/

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';

export type CartItem = {
    id: string;
    name: string;
    originalPrice: number;
    price: number;
    imageUrl: string;
    imageSrc: string; // ✅ Add this line
    quantity: number;
    deliveryDates: string[]; // ✅ Add this line
    selectedDate?: string | null
};


export const LaptopPage = () => {
    const [laptops, setLaptops] = useState<Product[]>([]);
    /*cart code */
    const { dispatch } = useCart(); // ✅ Add this here

    const handleAddToCart = (product: Product) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                name: product.productName,
                description:product.description,
                originalPrice: product.originalPrice,
                discountPercentage: product.discountPercentage,
                appliedPrice: product.appliedPrice ?? product.originalPrice,
                saved:product.saved,
                imageSrc: product.imageSrc || product.image || latop,
                quantity: 1,
                deliveryDates: product.deliveryDates ?? [],
                selectedDate: product.selectedDate,
                image: "",
                productName: "",
                price: product.appliedPrice ?? product.originalPrice, // ✅ normalize here


                imageUrl: "",
                date: ""
            }


        });
    };






    /*cart code */

    /* useEffect(() => {
        axios
            .get('http://localhost:8081/api/prod-offers', {
                params: { originalprice: 50000 }
            })
            .then((res) => {
                *//* const laptopsOnly = res.data.filter((item: Product) => item.productName === 'Laptop');*//*
                const laptopsOnly = res.data.filter(
                    (item: Product) =>
                        item.productName === 'Laptop' &&
                        [40000, 50000, 60000,80000].includes(Number(item.originalPrice))
                );

                console.log('Filtered laptops:', laptopsOnly);


                setLaptops(laptopsOnly);
            })
            .catch((err) => console.error('Offer fetch failed:', err));
    }, []); */

    /* const payload = [
      {
        productName: "Laptop",
        originalprice: 40000,
        offer: { description: "Diwali Festival Offer", discount: 30.0 }
      },
      {
        productName: "Laptop",
        originalprice: 50000,
        offer: { description: "Diwali Festival Offer", discount: 30.0 }
      },
      {
        productName: "Laptop",
        originalprice: 60000,
        offer: { description: "Clearance Sale", discount: 35.0 }
      },
      {
        productName: "Laptop",
        originalprice: 80000,
        offer: { description: "New Year Sale", discount: 25.0 }
      }
    ]; */
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", process.env.REACT_APP_API_URL);
useEffect(() => {
    console.log("API_URL:", process.env.REACT_APP_API_URL);
 const payload = [
        { productName: "Laptop", originalPrice: 40000, description: "Diwali Festival Offer" },
        { productName: "Laptop", originalPrice: 50000, description: "Diwali Festival Offer" },
        { productName: "Laptop", originalPrice: 74000, description: "Clearance Sale" },
        { productName: "Laptop", originalPrice: 80000, description: "New Year Sale" }
    ];
//fetch("http://localhost:8081/api/prod-offers/calculate", {
        //fetch("/api/prod-offers/calculate", {
             console.log("Calling API:", `${API_URL}/prod-offers/calculate`);
            fetch(`${API_URL}/prod-offers/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => setLaptops(data)) // ✅ Correct setter
        .catch(err => console.error("Offer fetch failed:", err));
}, []);




return (
        <div className="laptop-page">
            <h5>💻 Laptops Up to 35% OFF</h5>
           {/* {laptops.length > 0 && <Banner product={laptops[0]} />}  ✅ Render Banner*/}


            <ProductList products={laptops}
                         category="Laptop"
                         onAddToCart={handleAddToCart}


            />

        </div>
    );
};



