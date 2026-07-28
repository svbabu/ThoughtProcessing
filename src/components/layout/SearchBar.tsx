// SearchBar.tsx
import React, { useState } from "react";
import { Product } from '../../typed/Product';
interface SearchBarProps {
     value: string;
       onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /*  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; */
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {

  return (
    <div className="input-group flex-grow-1">
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="What are you looking for?"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
