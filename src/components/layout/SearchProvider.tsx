// SearchContext.tsx
import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

 const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be used inside SearchProvider");
  return ctx;
};
export default SearchProvider;