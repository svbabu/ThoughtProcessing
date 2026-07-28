import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../firebase";
import { useAuth } from "./AuthProvider"; // centralized auth context
import axios from 'axios';
import { useCart } from '@cart/CartContext';
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




//const OrderDetails: React.FC = () => {
  /* const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`).then(res => setOrder(res.data));
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <Box>
      <Typography variant="h6">Order ID {order.id}</Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <img src={order.image} alt={order.productName} width={100} />
        <Box>
          <Typography>{order.productName}</Typography>
          <Typography>₹{order.price}</Typography>
          <Typography>Colour: {order.color}</Typography>
          <Typography>Delivered on: {order.deliveredDate}</Typography>
        </Box>
      </Box>

      { *//* Timeline *//* }
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Order Status</Typography>
        {order.timeline.map(step => (
          <Typography key={step.date} color="text.secondary">
            {step.status} — {step.date}
          </Typography>
        ))}
      </Box>

      { *//* Shipping details *//* }
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Shipping Details</Typography>
        <Typography>{order.customerName}</Typography>
        <Typography>{order.address}</Typography>
        <Typography>{order.city}, {order.state}, {order.pincode}</Typography>
        <Typography>Mobile: {order.mobile}</Typography>
      </Box>

      { *//* Price details *//* }
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Price Details</Typography>
        <Typography>Total MRP: ₹{order.mrp}</Typography>
        <Typography>Offer Discount: -₹{order.discount}</Typography>
        <Typography>COD Charges: ₹{order.codCharges}</Typography>
        <Typography>Shipping: ₹{order.shipping}</Typography>
        <Typography>Platform Fee: ₹{order.platformFee}</Typography>
        <Typography fontWeight="bold">Total Amount: ₹{order.total}</Typography>
        <Typography>Payment method: {order.paymentMethod}</Typography>
      </Box>
    </Box>
  ); */
//};
