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

const statusConfig: Record<string, { icon: JSX.Element; color: "success" | "primary" | "grey" }> = {
  PLACED: { icon: <ShoppingCartIcon />, color: "grey" },
  PACKED: { icon: <InventoryIcon />, color: "primary" },
  SHIPPED: { icon: <LocalShippingIcon />, color: "primary" },
  DELIVERED: { icon: <CheckCircleIcon />, color: "success" },
};

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";

const OrderStatusTimeline: React.FC<{ timeline: TimelineStep[] }> = ({ timeline }) => (
  <Timeline>
    {timeline.map((step, index) => {
      const { icon, color } = statusConfig[step.status] || { icon: <ShoppingCartIcon />, color: "grey" };
      return (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={color}>{icon}</TimelineDot>
            {index < timeline.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle1">{step.status}</Typography>
            {step.statusTime&& <Typography color="text.secondary">{formatDate(step.statusTime)}</Typography>}
            {step.remarks && <Typography variant="body2">{step.remarks}</Typography>}
          </TimelineContent>
        </TimelineItem>
      );
    })}
  </Timeline>
);

export default OrderStatusTimeline;
