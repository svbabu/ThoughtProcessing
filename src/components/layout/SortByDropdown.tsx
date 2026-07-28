import React, { useState } from "react";
import {
  Button,Collapse,List,ListItemButton,Typography,Box,FormControl, Select, MenuItem,SelectChangeEvent,

} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


type SortByDropdownProps = {
  onSortChange: (option: string) => void;
};
const sortOptions = [
  "Relevance",
  "New Arrivals",
  "Discount",
  "Price - Low to High",
  "Price - High to Low",
  "Alphabetical",
];

export default function SortByDropdown({ onSortChange }: SortByDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Relevance");

   const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onSortChange(option); // callback to parent for sorting logic
  };
const handleChange = (event: SelectChangeEvent) => {
    const option = event.target.value;
    setSelected(option);
    onSortChange(option);
  };
  return (
     <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>SORT BY</Typography>
          <FormControl size="small">
            <Select
              value={selected}
              onChange={handleChange}
              sx={{ minWidth: 225}}
               IconComponent={open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
            >
              {sortOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

  );
}
