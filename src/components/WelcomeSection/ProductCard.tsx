import {ProductList} from "./ProductList";

import {data, useNavigate} from 'react-router-dom';

import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import {useState} from 'react';
import {Product,FavouriteProduct } from '../../typed/Product';
import { useCart } from '../cart/CartContext';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImage from '@img/mobile.png';
import latop from '@img/latop.png';
import mobile from '@img/mobile.png';
import shoes from '@img/shoes.png';

import asusZenbook from '@img/asuszenbook.png';
import dellXps from '@img/dellxps.png';
import macbookPro from '@img/macbookpro.png';
import hpSpectre from '@img/hpspectre.png';
import lenovoThinkpad from '@img/lenovothinkpad.png';
import macbookAir from '@img/macbookair.png';
import dellLatitude from '@img/delllatitude.png';
import msiStealth from '@img/msistealth.png';
import  hpEnvyx360 from '@img/hpenvyx360.png';
import  acerSwift from '@img/acerswift.png';
import { useFavourites } from "@cart/FavouritesContext";


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
    basePrice?: number;
  onAddToCart?: (product: Product) => void;
   onViewMore?: (product: Product) => void; // ✅ new prop
   brand?: string;
  processor?: string;
  ramSize?: string;
  storageCapacity?: string;
  operatingSystem?: string;
  videoCard?: string;
  display?: string;
  color?: string;
 isFavourite?: boolean;                // ✅ new prop
 /*  onToggleFavourite?: (id: string) => void; */
//onToggleFavourite?: (product: Product) => void;
onToggleFavourite?: (product: FavouriteProduct) => void;
};

const normalizeKey = (name: string) =>
  name.toLowerCase().replace(/[\s-]+/g, ""); // handles spaces & hyphens

  export const imageMap: Record<string, string> = {
    "laptop": latop,
    "mobilephone": mobile,
    "shoes": shoes,
    "dellxps": dellXps,
    "macbookpro": macbookPro,
    "hpspectre": hpSpectre,
    "lenovothinkpad": lenovoThinkpad,
    "asuszenbook": asusZenbook,
    "macbookair":macbookAir,
    "delllatitude" :dellLatitude,
    "msistealth":msiStealth,
    "hpenvyx360":hpEnvyx360, // ✅ normalized key matches
    "acerswift":acerSwift
  };


/* export const ProductCard: React.FC<ProductCardProps> = ({
                                                            data,
                                                            title,
                                                            image,
                                                            originalPrice,
                                                            discountPercentage,
                                                            appliedPrice,
                                                            saved,
                                                            basePrice,
                                                            onAddToCart // ✅ Add this here


                                                        }) => { */

export const ProductCard: React.FC<ProductCardProps> = ({ data, onAddToCart,onViewMore, isFavourite = false,
                                                                                         onToggleFavourite, }) => {

      // Debug logs inside ProductCard
       console.log("ProductCard data from card:", data);
       console.log("ProductCard isFavourite:", isFavourite, "for product", data.id);
       console.log("ProductCard received onToggleFavourite:", !!onToggleFavourite);

    /* const productImages: Record<string, string> = {
        "Laptop": latop,
        "Mobile Phone": mobile,
        "Shoes": shoes,
         "dellxps": dellXps,
            "macbookpro": macbookPro,
            "hpspectre": hpSpectre,
            "lenovothinkpad": lenovoThinkpad,
            "asuszenbook": asusZenbook,
            "macbookairchip":macbookAir,
           "delllatitude" :dellLatitude,


    }; */
    const { cart } = useCart();
    const isInCart = cart.some(item => item.id === data.id);


 // Resolve image by modelName first, fallback to category, then default
  const resolvedImage =
    (data.modelName ? imageMap[normalizeKey(data.modelName)] : undefined) ||
    (data.productName ? imageMap[normalizeKey(data.productName)] : undefined) ||
    defaultImage;


   /*  const resolvedImage = productImages[data.productName.trim()] || defaultImage; */

/* const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
const splitText = (text: string, maxLength: number) => {
  if (!text) return [""];

  if (text.length <= maxLength) {
    return [text]; // fits in one paragraph
  }

  const firstPart = text.slice(0, maxLength);
  const secondPart = text.slice(maxLength);

  return [firstPart, secondPart];
}; */
function splitTextSmart(text: string, maxLength: number): [string, string] {
  if (!text) return ["", ""];
  if (text.length <= maxLength) return [text, ""];

  let splitIndex = maxLength;
  while (splitIndex > 0 && text[splitIndex] !== " ") {
    splitIndex--; // backtrack to nearest space
  }

  const firstPart = text.slice(0, splitIndex).trim();
  const secondPart = text.slice(splitIndex).trim();

  return [firstPart, secondPart];
}
// Usage in your card:
let firstPart = "";
let secondPart = "";

if (data.description) {
  [firstPart, secondPart] = splitTextSmart(data.description, 23);
}

/*  const [firstPart, secondPart] = splitTextSmart(data.description?? "", 23); */
 const { favourites, removeFavourite, addToCart } = useFavourites();

    return (
        <div className="product-card">
         <div style={{ position: "relative" }}>
         <img
                         className="img-fluid"
                         src={resolvedImage}
                         alt={data.modelName}
                          style={{ height: "180px", objectFit: "cover", width: "100%" }}
                         //style={{height: '100px', objectFit: 'cover'}}

                     />
           {/* Favourite icon top-right */}
              {onToggleFavourite && (
                     <button
                       className="fav-btn"
                       //onClick={() => onToggleFavourite(data.id)}
                  onClick={() => {
                    console.log("Heart clicked for:", data.id);
                    onToggleFavourite?.(data);
                  }}   // ✅ pass Product// ✅ pass string
                       style={{
                         position: "absolute",
                         top: "8px",
                         right: "8px",
                         background: "rgba(255,255,255,0.7)", // semi-transparent background for visibility
                         border: "none",
                         borderRadius: "50%",
                         padding: "4px",
                         cursor: "pointer",
                       }}
              >
               {isFavourite ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "gray" }} />
                      )}
                    </button>
                  )}
              </div>

                  {/* existing product card content */}

            <div className="card-body">
                <h5>{data.modelName}</h5>
               {/*  <p className="text-muted">{data.productName}</p> */}
               {/*  <p className="text-muted">
                  {truncateText(data.description, 50)}  {/* show first 80 chars */}
                {/*</p> */}  {/* ✅ show productDescription */}
                <p className="text-muted mb-0">{firstPart}</p>
                {secondPart && <p className="text-muted mb-0">{secondPart}</p>}
               <span className="text-muted text-decoration-line-through">
                     ₹{data.originalPrice}   {/* ✅ strike-through the base/original price */}
                   </span>{' '}
                   <span className="text-success fw-bold">
                     ₹{data.appliedPrice}    {/* ✅ show the discounted/applied price */}
                   </span>
                <div className="offer-badge">
                    <span className="badge bg-success">{data.discountPercentage}% OFF </span>
                    {data.offerLabel && (
                        <span className="offer-label ms-2 text-muted">{data.offerLabel}</span>

                    )}
                  <span><p>{data.offerLabel}</p></span>
                {/*  <ul className="text-muted small">
                  <li>Processor: {data.processor}</li>
                  <li>RAM: {data.ramSize}</li>
                  <li>Storage: {data.storageCapacity}</li>
                </ul>  */}

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
                       {isInCart ? "In Cart" : "Add to Cart"}
                          {/*   Add to Cart */}




                        </button>
                    )}
                {/* New View More button */}
               {onViewMore && (
                 <button
                   className="btn btn-link text-primary mt-2"
                   onClick={() =>

                       onViewMore(data)}
                 >
                   + View More
                 </button>
               )}

                </div>



            </div>
        </div>
    );
};

