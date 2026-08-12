
import React from "react";
import axios from 'axios';
import  { Order }  from '../../typed/Order';
//import {OrderItem} from '/../../typed/Order';
import { getImageSrc } from "../../utils/getImageSrc";
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
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineDot,
  TimelineConnector, TimelineContent
}
from "@mui/lab";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

interface FilteredOrdersProps {
  orders?: Order[];
 // items:OrderItem[];

}

const FilteredOrders: React.FC<FilteredOrdersProps> = ({ orders = [] }) => {

   const navigate = useNavigate();
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—"; // no date
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
};

return (
  <Box>
    {orders.length === 0 ? (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <img
          src="https://assets-cloud.landmarkshops.in/website_images/static-pages/brand_exp/brand2images/homecentre/no-order.svg"
          alt="no-orders"
          width={120}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          No orders found
        </Typography>
      </Box>
    ) : (
      orders.map(order => (
        <Box
          key={order.orderId}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid #eee",
            py: 2,
          }}
        >
          {/* Order ID */}
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Order ID: {order.orderId}
          </Typography>

          {/* Items preview */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {order.items.map(item => (
              <Box
                key={item.description}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <img
                            src={getImageSrc(item)}
                            alt={item.productName}
                            width={100}
                            style={{ objectFit: "contain" }} // optional: keeps aspect ratio
                          />
                <Box>

                  <Typography variant="body2" color="text.secondary">
                    {item.modelName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Timeline */}
          {order.timeline?.map(step => (
            <Box key={step.status} sx={{ mt: 1 }}>
             <Chip
               label={`${step.status} ✔ ${formatDate(step.statusTime)}`}
               color="success"
               variant="outlined"
               sx={{ borderRadius: "16px", fontWeight: "bold" }}
             />
              {step.remarks && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {step.remarks}
                </Typography>
              )}
            </Box>
          ))}

          {/* Created/Updated date */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Created: {formatDate(order.createdAt)}
            {order.updatedAt && ` | Updated: ${formatDate(order.updatedAt)}`}
          </Typography>

          {/* Forward arrow button — per order */}
          <Button
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/orders/${order.orderId}`)}
            sx={{ mt: 1 }}
          >
            Details
          </Button>
        </Box>
      ))
    )}
  </Box>
);

};

export default FilteredOrders;