import React, { useState, useEffect } from "react";

import {
  Typography,
  List,
  ListItemButton,
  Grid,
  Button,
  Card,
  CardContent,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import FilteredOrders from "./FilteredOrders";
import  { Order }  from '../../typed/Order';
//import { useAuth } from "./AuthProvider"; // centralized auth context
import { getAuth } from "firebase/auth";


const OrderHistory: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  setLoading(true);
  setError(null);

  axios
    .get(`http://localhost:8081/api/orders/user/${uid}?range=${timeFilter}`)
    .then(res => setOrders(res.data))
    .catch(err => {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    })
    .finally(() => setLoading(false));   // <-- important
}, [timeFilter]);


  return (
       <Grid container spacing={2}>
           {/* Left column: Filters */}
           <Grid size={{ xs: 12, sm: 3 }}>
             <Typography variant="h6">Order History</Typography>
             <Divider sx={{ my: 2, borderColor: "#1976d2", borderBottomWidth: 3 }} />

             <Typography variant="subtitle1" gutterBottom>
               <strong>Time Filter</strong>
             </Typography>

             <List>
               <ListItemButton onClick={() => setTimeFilter("1m")}>Last 1 Month</ListItemButton>
               <ListItemButton onClick={() => setTimeFilter("3m")}>Last 3 Months</ListItemButton>
               <ListItemButton onClick={() => setTimeFilter("6m")}>Last 6 Months</ListItemButton>
               <ListItemButton onClick={() => setTimeFilter("12m")}>Last 12 Months</ListItemButton>
               <ListItemButton onClick={() => setTimeFilter("all")}>All Orders</ListItemButton>
             </List>
           </Grid>

       {/* Right column: Orders */}
           <Grid size={{ xs: 12, sm: 9 }}>
            <Typography variant="h6">Orders</Typography>
            {loading && <Typography>Loading orders…</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && <FilteredOrders orders={orders} />}
          </Grid>
    </Grid>


  );
};

export default OrderHistory;
