import React from "react";
import { Box, Typography, Button } from "@mui/material";
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
import {Product} from '../../typed/Product';

type FavouriteProductProps = {
    //data:Product;
  id: string;
  image: string;
  imageSrc: string;      // ✅ resolved image for rendering
  modelName?: string;   // ✅ optional
  description?: string;
  originalPrice: number;
  appliedPrice: number;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
};



const FavouriteItem: React.FC<FavouriteProductProps> = ({
  id,
  image,
  imageSrc,
 modelName,
  description,
  originalPrice,
  appliedPrice,
  onRemove,
  onAddToCart,
}) => {


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        borderBottom: "1px solid #ddd",
        padding: "12px 0",
      }}
    >
      {/* Product image */}
      <img
        src={imageSrc}
        alt={modelName}
        style={{ width: "120px", height: "100px", objectFit: "cover" }}
      />

      {/* Product details */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{modelName}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}

        {/* Pricing */}
        <Box sx={{ marginTop: 1 }}>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "gray", marginRight: 1 }}
          >
            ₹{originalPrice}
          </Typography>
          <Typography
            variant="body1"
            color="success.main"
            sx={{ fontWeight: "bold" }}   // ✅ correct way
          >
            ₹{appliedPrice}
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onRemove(id)}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAddToCart(id)}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FavouriteItem;
