import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

type FiltersProps = {
  onPriceChange: (min: number, max: number) => void;
  onClearAll: () => void;
};

export default function Filters({ onPriceChange, onClearAll }: FiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([999, 21999]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    setPriceRange([min, max]);
    onPriceChange(min, max);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
       <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
           FILTERS
         </Typography>
        <Button
          onClick={onClearAll}
          size="small"
          sx={{ color: "primary.main", fontSize: "0.9rem", textTransform: "none", padding: 0 }}
        >
          Clear all
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />

      {/* Price filter */}
      <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: 400 }}>Price</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        min={999}
        max={85000}
        valueLabelDisplay="auto"
      />

      {/* Example brand filter */}
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: 400 }}>Brand</Typography>
      <FormControlLabel control={<Checkbox />} label="brand" />
      <FormControlLabel control={<Checkbox />} label="model" />
      <FormControlLabel control={<Checkbox />} label="color" />
    </Box>
  );
}
