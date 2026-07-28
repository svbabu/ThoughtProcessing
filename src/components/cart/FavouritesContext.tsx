import React, { createContext, useContext, useState } from "react";
import {Product, FavouriteProduct } from "../../typed/Product";
import { useCart } from '../cart/CartContext';
import latop from '@img/latop.png';
import mobile from '@img/mobile.png';
import shoes from '@img/shoes.png';
import defaultImage from '@img/mobile.png';
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

/* type FavouriteProduct = {
  id: string;
  image: string;
  productName: string;
  description?: string;
  originalPrice: number;
  appliedPrice: number;
}; */

type FavouritesContextType = {
  favourites: FavouriteProduct[];
  addToCart: (id: string) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (product: FavouriteProduct) => void;
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

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 /* const resolvedImage =
        (data.modelName ? imageMap[normalizeKey(data.modelName)] : undefined) ||
        (data.productName ? imageMap[normalizeKey(data.productName)] : undefined) ||
        defaultImage; */
  const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
 /*  const resolvedImage =
      (data.modelName ? imageMap[normalizeKey(data.modelName)] : undefined) ||
      (data.productName ? imageMap[normalizeKey(data.productName)] : undefined) ||
      defaultImage; */
  const toggleFavourite = (product: FavouriteProduct) => {
    //const normalizedKey = normalizeKey(product.productName);
    const resolvedImage = (product.modelName ? imageMap[normalizeKey(product.modelName)] : undefined) ||
                                (product.productName ? imageMap[normalizeKey(product.productName)] : undefined) ||   defaultImage;
    //imageMap[normalizedKey] || product.image || defaultImage;

    const fav: FavouriteProduct = {
      ...product,
      imageSrc: resolvedImage,   // ✅ store resolved image here
    };

    setFavourites(prev =>
      prev.some(f => f.id === product.id)
        ? prev.filter(f => f.id !== product.id)
        : [...prev, fav]
    );
  };

  /* const toggleFavourite = (product: FavouriteProduct) => {
    setFavourites(prev =>
      prev.some(f => f.id === product.id)
        ? prev.filter(f => f.id !== product.id)
        : [...prev, product]
    );
  }; */

  const removeFavourite = (id: string) => {
    setFavourites(prev => prev.filter(f => f.id !== id));
  };
const { dispatch } = useCart(); // import your CartContext

 const addToCart = (id: string) => {
   const fav = favourites.find(f => f.id === id);
   if (fav) {
     dispatch({
       type: "ADD_ITEM",
       payload: {
         id: fav.id,
         name: fav.productName,
         modelName:fav.modelName,
         // title: fav.title,   // only if your Product type has it
         description: fav.description,
         originalPrice: fav.originalPrice,
         basePrice: fav.basePrice ?? fav.originalPrice,
         appliedPrice: fav.appliedPrice ?? fav.originalPrice,
         price: fav.appliedPrice ?? fav.originalPrice, // normalize
         discountPercentage: fav.discountPercentage ?? null,
         saved: fav.saved??0,
         imageSrc: fav.imageSrc,
         quantity: 1,
         deliveryDates: fav.deliveryDates ?? [],
         selectedDate: fav.selectedDate ?? null,
         image: fav.image,
        imageUrl: fav.imageUrl || latop,
         date: new Date().toISOString(),
          productName: "",
       },
     });
     console.log("Adding to cart:", fav);
   }
 };

  //};

  return (
    <FavouritesContext.Provider value={{ favourites, addToCart, removeFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
};
