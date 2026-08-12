import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
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
import {Order,OrderItem} from '../../typed/Order';
import { getImageSrc } from "../../utils/getImageSrc";
import  OrderStatusTimeline from "./ OrderStatusTimeline" ;
import {
  Box,
  Typography,
  Divider,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  //Grid
} from "@mui/material";
import Grid from "@mui/material/Grid";

import {
  Timeline, TimelineItem, TimelineSeparator, TimelineDot,
  TimelineConnector, TimelineContent
}
from "@mui/lab";



/* interface OrderDetailsProps {
  order: Order;
} */

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);


 const productImages: Record<string, string> = {
        "Laptop": latop,
        "Mobile Phone": mobile,
        "Shoes": shoes,
        "Asus Zenbook": asusZenbook,
          "Dell XPS": dellXps,
          "MacBook Pro": macbookPro,
          "HP Spectre": hpSpectre,
          "Lenovo Thinkpad": lenovoThinkpad,
          "MacBook Air": macbookAir,
          "Dell Latitude": dellLatitude,
          "MSI Stealth": msiStealth,
          "HP Envy x360": hpEnvyx360,
          "Acer Swift": acerSwift,



    };

 useEffect(() => {
   const fetchOrder = async () => {
     try {
       const res = await axios.get(`http://localhost:8081/api/orders/${orderId}`);
       const orderData: Order = res.data;

       // No need to enrich with products if order items already have details
       setOrder(orderData);
     } catch (err) {
       console.error("Failed to fetch order", err);
     }
   };

   fetchOrder();
 }, [orderId]);


  if (!order) return <p>Loading...</p>;

return (
  <Box sx={{ mt: 3 }}>
    {/* Page heading */}
    <Typography variant="h4" gutterBottom>
      Order Details
    </Typography>

    {/* Divider */}
    <Divider
      sx={{
        my: 2,
        borderStyle: "solid",
        borderColor: "#1976d2",
        borderBottomWidth: 3,
      }}
    />

    {/* Order ID row */}
    <Typography variant="subtitle1" gutterBottom>
      Order ID: {order.orderId}
    </Typography>

    {/* Items list */}
    {order.items.map((item: OrderItem) => {
      console.log("Image src:", getImageSrc(item)); // logs each item’s URL
      return (
        <Box
          key={item.productId}
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            borderBottom: "1px solid #eee",
            pb: 2,
          }}
        >
          <img
            src={getImageSrc(item)}
            alt={item.productName}
            width={100}
            style={{ objectFit: "contain" }} // optional: keeps aspect ratio
          />
          <Box>
            {/* <Typography variant="body1">{item.productName}</Typography> */}
            <Typography variant="body2" color="text.secondary">
              {item.modelName}
            </Typography>
            <Typography variant="body2">{item.description}</Typography>
            <Typography>Qty: {item.quantity}</Typography>
            <Typography>
              ₹{item.appliedPrice} (MRP: ₹{item.basePrice})
            </Typography>
            <Typography color="success.main">
              Discount: {item.discountPercentage}%
            </Typography>
            <Typography>₹{item.price}</Typography>
          </Box>
        </Box>
      );
    })}

    {/* Timeline */}
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Order Status</Typography>
      <OrderStatusTimeline
        timeline={order.timeline?.map((step) => ({
          status: step.status,
          statusTime: step.statusTime,
          remarks: step.remarks,
        }))}
      />
      <Typography color="error" sx={{ mt: 2 }}>
        Exchange & Return not available
      </Typography>
    </Box>

    {/* Split two columns below timeline */}
    {/* Split two columns below timeline */}
    {/* Split two columns below timeline */}
    <Grid container spacing={5}>
      {/* Left: Shipping Details */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6">Shipping Details</Typography>
        <Typography>{order.shippingAddress?.fullName}</Typography>
        <Typography>
          {order.shippingAddress?.buildingName}, {order.shippingAddress?.streetName}
        </Typography>
        <Typography>
          {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
          {order.shippingAddress?.pincode}
        </Typography>
        <Typography>Mobile: {order.shippingAddress?.mobileNumber}</Typography>
      </Grid>
     {/* Right: Price + Payment Details */}
       <Grid size={{ xs: 12, sm: 6 }}>
         <Box sx={{ mt: 3 }}>
           <Typography variant="h6">Price Details of Your Order</Typography>
           <Grid container spacing={1}>
             <Grid size={{ xs: 6 }}><Typography>Total MRP:</Typography></Grid>
             <Grid size={{ xs: 6 }}>
               <Typography>
                 ₹{order.items.reduce((sum, item) => sum + item.basePrice * item.quantity, 0)}
               </Typography>
             </Grid>
         <Grid size={{ xs: 6 }}><Typography>Offer Discount:</Typography></Grid>
                 <Grid size={{ xs: 6 }}>
                   <Typography>
                     - ₹{order.items.reduce(
                       (sum, item) => sum + (item.basePrice - item.appliedPrice) * item.quantity,
                       0
                     )}
                   </Typography>
                 </Grid>

                 <Grid size={{ xs: 6 }}><Typography>Cash on Delivery Charges:</Typography></Grid>
                 <Grid size={{ xs: 6 }}>
                   <Typography>
                     ₹{order.payments?.[0]?.method?.toLowerCase() === "cod" ? 30 : 0}
                   </Typography>
                 </Grid>

      <Grid size={{ xs: 6 }}><Typography>Furniture & Large Items Shipping:</Typography></Grid>
             <Grid size={{ xs: 6 }}><Typography>₹249</Typography></Grid>

             <Grid size={{ xs: 6 }}><Typography>Platform Fee Details:</Typography></Grid>
             <Grid size={{ xs: 6 }}><Typography>₹10</Typography></Grid>

             <Grid size={{ xs: 6 }}><Typography variant="subtitle1">Total Amount:</Typography></Grid>
             <Grid size={{ xs: 6 }}><Typography variant="subtitle1">₹{order.totalAmount}</Typography></Grid>
           </Grid>
         </Box>
 <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Payment Method</Typography>
      <Grid container spacing={1}>
        <Grid size={{ xs: 6 }}><Typography>Method:</Typography></Grid>
        <Grid size={{ xs: 6 }}><Typography>{order.payments?.[0]?.method?.toUpperCase()}</Typography></Grid>

        <Grid size={{ xs: 6 }}><Typography>Amount:</Typography></Grid>
        <Grid size={{ xs: 6 }}><Typography>₹{order.payments?.[0]?.amount}</Typography></Grid>
      </Grid>
    </Box>
  </Grid>
</Grid>

  </Box>
);

};
export default OrderDetails;