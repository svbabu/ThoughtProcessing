import {
  Stepper, Step, StepLabel, Box, Typography
} from "@mui/material";

const OrderStatusStepper: React.FC<{ timeline: { status: string; date?: string }[] }> = ({ timeline }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle2">Order Status</Typography>
    <Stepper activeStep={timeline.findIndex(t => t.status === "Delivered")} orientation="vertical">
      {timeline.map((step, index) => (
        <Step key={index} completed={step.status === "Delivered"}>
          <StepLabel>
            {step.status} {step.date && `— ${step.date}`}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
);
