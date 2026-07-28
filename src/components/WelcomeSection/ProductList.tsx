import React from 'react';
import { useState } from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import {ProductCard} from "./ProductCard";
import { featuredProducts } from '../../typed/Product';
import {Product,  FavouriteProduct } from "../../typed/Product"; // adjust path
import { useCart } from '../cart/CartContext';

import shoes from '@img/shoes.png';
import laptop from '@img/laptop.png';
import mobile from '@img/mobile1.png';
import {PromoCard} from "./PromoCard";

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Favourites from "@cart/Favourites";
/*
type Product = {
    title: string;
    id: string;
    productName: string;
    modelName?:string;
    price:number;
    description: string;
    originalPrice: number;
    basePrice?:number;
    discountPercentage: number;
    appliedPrice: number;
    image: string;
    imageSrc:string;
    discount:number;
    navigateTo:string;
    deliveryDates?: string[]; // ✅ Add this line
        selectedDate?: string | null;
        saved:number;
        brand?: string;
           processor?: string;
                  ramSize?: string;
                  storageCapacity?: string;
                  operatingSystem?: string;
                  videoCard?: string;
                  display?: string;
                  color?: string;
                  name:string;

    onAddToCart?: (product: Product) => void;

onViewMore?: (product: Product) => void; // ✅ new prop


};
 */

type ProductListProps = {
    products: Product[];
    category?: string;
    onAddToCart?: (product: Product) => void;
    onViewMore?: (product: Product) => void; // ✅ new prop
    isFavourite?: boolean;                // ✅ per-card flag
   // onToggleFavourite?: (id: string) => void; // ✅ new prop
       favourites: FavouriteProduct[];        // ✅ global favourites array         // ✅ optional now            // ✅ add this
     onToggleFavourite?: (product: Product) => void;  // ✅ handler

};
/* export type FavouriteProduct = {
  id: string;
  image: string;
  productName: string;
  description?: string;
  originalPrice: number;
  appliedPrice: number;
}; */

export const ProductList: React.FC<ProductListProps> = ({
  products,
  category,
  onAddToCart,
  onViewMore,
  favourites,
  onToggleFavourite,
}) => {
  const filtered = category
    ? products.filter(p => p.productName === category)
    : products;

  console.log("ProductList favourites:", favourites);
  console.log("ProductList received onToggleFavourite:", !!onToggleFavourite);

  return (
    <div className="product-grid">
      {filtered.length === 0 ? (
        <div>
          <p className="text-muted">No products available.</p>
        </div>
      ) : (
        <div className="row g-2">
          {filtered.map((p, index) => {
          const isFav = favourites.some(f => String(f.id) === String(p.id));
          console.log("ToggleFavourite called for:",p.id);
                console.log("Product", p.id, "isFavourite?", isFav, "favourites:", favourites.map(f => f.id));
            {/* const isFav = favourites.some(f => f.id === p.id);
            console.log("isFavourite for", p.id, isFav); */}

            return (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ProductCard
                  key={`${p.id}-${p.modelName}-${index}`} // ✅ ensures uniqueness
                  data={p}
                  title={p.productName}
                  image={p.image}
                  originalPrice={p.originalPrice}
                  basePrice={p.basePrice}
                  discountPercentage={p.discountPercentage}
                  appliedPrice={p.appliedPrice}
                  saved={p.saved??0}
                  onAddToCart={onAddToCart}
                  onViewMore={onViewMore}
                   isFavourite={favourites.some(f => String(f.id) === String(p.id))}
                            // ✅ per-card flag
                  onToggleFavourite={onToggleFavourite} // ✅ forward handler
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};





