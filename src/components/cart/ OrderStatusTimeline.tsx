import {
  Timeline, TimelineItem, TimelineSeparator, TimelineDot,
  TimelineConnector, TimelineContent
} from "@mui/lab";
import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TimelineStep {
  status: string;
  statusTime?: string;
  remarks?: string;
}
const allStatuses = [
  "PLACED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

const statusConfig: Record<string, { icon: JSX.Element; color: "success" | "primary" | "grey" }> = {


 PLACED: { icon: <span />, color: "success" },
   PACKED: { icon: <span />, color: "grey" },
   SHIPPED: { icon: <span />, color: "grey" },
   DELIVERED: { icon: <span />, color: "success" },
};

/* const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : ""; */
/* const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}; */
const formatDate = (date?: string) => {
  if (!date) return "";

  const d = new Date(date);

  const day = d.toLocaleDateString("en-GB", {
    weekday: "short",
  });

  const datePart = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart}, ${day} - ${timePart}`;
};

const OrderStatusTimeline: React.FC<{ timeline: TimelineStep[] }> = ({ timeline }) => {
  console.log("timeline length =", timeline.length);
  console.log("timeline =", timeline);
  const currentStatus =
      timeline[timeline.length - 1]?.status;

  const currentIndex =
      allStatuses.indexOf(currentStatus);

  return(
  <Timeline>

  {allStatuses.map((status, index) => {
                                      const historyRecord = timeline.find(
                                             t => t.status === status
                                         );
                                     const isCompleted = index <= currentIndex;

console.log("historyRecord",historyRecord);
console.log(
  "formattedDate=",
  formatDate(historyRecord?.statusTime)
);



      return (
        <TimelineItem key={status}>
          <TimelineSeparator>

                    <TimelineDot
                      sx={{
                        backgroundColor: isCompleted ? "#4CAF50" : "#BDBDBD",
                        width: 8,
                        height: 8,
                        boxShadow: "none",
                      }}>



                    </TimelineDot>

                    {index < allStatuses.length - 1 && (
                      <TimelineConnector
                       sx={{
                           backgroundColor: isCompleted ? "#4CAF50" : "#BDBDBD",
                           width: 2,
                         }}
                      />
                    )}

                  </TimelineSeparator>

          <TimelineContent>
                <Typography variant="subtitle1">
                          {status.replace(/_/g, " ")}
                    </Typography>

                    {historyRecord?.statusTime && (
                                                             <Typography
                                                               variant="caption"
                                                               color="text.secondary"
                                                               component="div"
                                                                sx={{ display: "block", mt: 0.5 }}
                                                             >
                                                               {formatDate(historyRecord.statusTime)}
                                                             </Typography>
                                                           )}

                    {historyRecord?.remarks && (
                        <Typography variant="body2">
                            {historyRecord.remarks}
                        </Typography>
                    )}
                  </TimelineContent>
                   </TimelineItem>



      );
    })}
  </Timeline>
  );
};

export default OrderStatusTimeline;
