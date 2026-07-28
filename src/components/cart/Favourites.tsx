import React, { useState, useEffect } from "react";
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
import FavouriteItem from "./FavouriteItem";
import {Product,FavouriteProduct} from '../../typed/Product';

import {
  Box,
  Typography,
  Divider,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

/*
type FavouriteProduct = {

  id: string;
image: string;
  imageSrc:string;
  modelName: string;
  description?: string;
  originalPrice: number;
  appliedPrice: number;
};
 */



type FavouritesProps = {
    /* favourites: FavouriteProduct[];
      onRemove: (product: FavouriteProduct) => void;
      onAddToCart: (product: FavouriteProduct) => void; */
     //data: Product;
     // productName ?:string;
  favourites: FavouriteProduct[];
  onRemove: (id: string) => void;       // ✅ typed
  onAddToCart: (id: string) => void;    // ✅ typed
};
/* const normalizeKey = (name: string) =>
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
  }; */

//React component
const Favourites: React.FC<FavouritesProps> = ({ favourites, onRemove, onAddToCart }) => {
console.log("Favourites component received:", favourites.map(f => f.id));
 /* const resolvedImage =
    (favourites.modelName ? imageMap[normalizeKey(favourites.modelName)] : undefined) ||
    (favourites.productName ? imageMap[normalizeKey(favourites.productName)] : undefined) ||
    defaultImage; */

  return (
    <Box sx={{ padding: 3 }}>
     {/* ✅ Heading row with text left, icon right */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5">
           Your Favourites
         </Typography>
         <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>
           ❤️
         </Typography>

      </Box>
<Typography

  sx={{ fontSize: "12px", color: "#666", mb: 0 }}
>
  View your most wanted products.
</Typography>
 {/* <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                View your most wanted products.
              </Typography> */}
       {/* ✅ Horizontal line */}

          <Divider sx={{  my: 2,
                           borderStyle: "solid",
                           borderColor: "#1976d2",        // ✅ red line
                           borderBottomWidth: 3
                             }} />


      {favourites.length === 0 ? (
        <Typography color="text.secondary">No favourites yet.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {favourites.map((p,index) => (
                     <Box
                       key={p.id}
                           sx={{
                            width: { xs: "100%", sm: 300 }, // full width on mobile, fixed on larger screens             // ✅ fixed width for all items
                             display: "flex",
                             justifyContent: "center"

                           }}
                         >
          <FavouriteItem
            key={p.id}
            id={p.id}
            image={p.image}
            imageSrc={p.imageSrc}
           modelName={p.modelName}
            description={p.description}
            originalPrice={p.originalPrice}
            appliedPrice={p.appliedPrice}
            onRemove={onRemove}
             onAddToCart={onAddToCart}
           /*  onAddToCart={(id) => {
              const fav = favourites.find(p => p.id === id);
              if (fav) handleAddToCart(fav); // ✅ reuse same handler
            }} */
         />
          </Box>
        ))}
           </Box>
      )}
    </Box>
  );
};
export default Favourites;