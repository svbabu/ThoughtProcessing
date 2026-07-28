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


//const OrderHistory: React.FC = () => {
 /*  const [timeFilter, setTimeFilter] = useState("1m");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    axios.get(`/api/orders/${uid}?range=${timeFilter}`).then(res => setOrders(res.data));
  }, [timeFilter]);

  return (
    <Grid container spacing={2}>
      { *//* Left column: Time Filter + All Orders *//* }
      <Grid item xs={12} sm={3}>
        <Typography variant="h6">Order History</Typography>

        { *//* Filters list *//* }
        <List>
          <ListItem button onClick={() => setTimeFilter("1m")}>Last 1 Month</ListItem>
          <ListItem button onClick={() => setTimeFilter("6m")}>Last 6 Months</ListItem>
          <ListItem button onClick={() => setTimeFilter("12m")}>Last 12 Months</ListItem>
        </List>

        { *//* All Orders button under filters *//* }
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setTimeFilter("all")}
        >
          All Orders
        </Button>
      </Grid>

      { *//* Right column: Orders list *//* }
      <Grid item xs={12} sm={9}>
        <Typography variant="h6">Orders</Typography>
        {orders.map(order => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <img src={order.image} alt={order.productName} width={60} />
                <Box>
                  <Typography>{order.productName}</Typography>
                  <Typography color="text.secondary">Colour: {order.color}</Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "Delivered" ? "success" : "warning"}
                    size="small"
                    icon={<CheckCircleIcon />}
                  />
                  <Typography color="text.secondary">{order.deliveredDate || order.placedDate}</Typography>
                </Box>
              </Box>
              <IconButton component={Link} to={`/account/orders/${order.id}`}>
                <ArrowForwardIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  ); */
//};
