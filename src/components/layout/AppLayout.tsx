// AppLayout.tsx
import React, {useEffect} from 'react';
import { Link, NavLink } from  "react-router-dom";
import Topbar from '@layout/Topbar';
 // extract your topbar into its own component
import { } from "react-router-dom";
import { Product } from '../../typed/Product';
import {useState} from 'react';
import SearchBar from "./SearchBar";
import {ProductList} from "@WelcomeSection/ProductList";
import {LaptopPage} from "@WelcomeSection/LaptopPage";
import {useSearchContext } from "@layout/SearchProvider";
interface AppLayoutProps {
  children: React.ReactNode;
  navTabs: { label: string; path: string }[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, navTabs }) => {
      const [products, setProducts] = useState<Product[]>([]);
        //const [searchTerm, setSearchTerm] = useState("");

     /* useEffect(() => {
       fetch("http://localhost:8081/api/products")
         .then(res => res.json())
         .then(data => {
           console.log("Raw API response:", data);

           // Map backend fields to frontend Product type
           const mapped = data.map((p: any) => ({
             ...p,
             productName: p.name,        // map backend "name" → frontend "productName"
             basePrice: p.basePrice ?? p.price, // ensure basePrice exists
             imageSrc: p.image,          // normalize image field
           }));

           console.log("Mapped products:", mapped);
           setProducts(mapped);
         })
         .catch(err => console.error("Failed to fetch products:", err));
     }, []); */



            // ✅ Filter logic here in AppLayout
            /*   const filteredProducts = products.filter(p => {
                const term = searchTerm.toLowerCase();
                return (
                  p.productName?.toLowerCase().includes(term) ||
                  p.name?.toLowerCase().includes(term) ||
                  p.category?.toLowerCase().includes(term) ||
                  p.brand?.toLowerCase().includes(term) ||
                  p.modelName?.toLowerCase().includes(term) ||
                  p.basePrice?.toString().includes(searchTerm)
                );
              });
          console.log("Products:", products);
          console.log("Filtered:", filteredProducts);
 */
  return (

    <div>
      {/* Shared Topbar */}
      {/* <Topbar products={products} /> */}
   {/*     <Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
       {/*  <LaptopPage searchTerm={searchTerm} /> */}
       <Topbar/>
      {/* Dynamic nav-tabs */}
      <nav className="nav nav-tabs mb-4">
        {navTabs.map((tab, idx) => (
          <NavLink
            key={idx}
            to={tab.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Page content */}

      <div className="container mt-4">
      {/* ✅ ProductList belongs here */}
     {/*  <ProductList products={filteredProducts} /> */}
      {children}</div>
    </div>

  );
};

export default AppLayout;
