import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import {useState} from 'react';
//import { Product } from '../../typed/Product';
import { ProductOfferResponseDto } from '../../typed/Product'; // adjust path
import { ProductWithSpecs } from "../../typed/Product"; // ✅ import the TS type
import { mapDtoToProduct } from '../../typed/Product';
import {Product,  FavouriteProduct } from "../../typed/Product"; // adjust path
import Banner from './Banner';
/*cart imports*/
import { useCart } from '../cart/CartContext';
import latop from '@img/latop.png';
import {SpecsModal} from '@WelcomeSection/SpecsModal';
import SearchProvider from "@layout/SearchProvider";

import {useSearchContext } from "@layout/SearchProvider";
import SortByDropdown from "@layout/SortByDropdown";
import Filters from "@layout/Filters";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  Typography,
  Box,
} from "@mui/material";
/*cart imports*/

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import { useFavourites } from "@cart/FavouritesContext";

export type CartItem = {
    quantity: number;
      onRemove?: (id: string) => void; // optional callback
      addedAt?: Date;
       modelName:String;
    /* id: string;
    name: string;
    modelName:String;
    originalPrice: number;
    price: number;
    imageUrl: string;
    imageSrc: string; // ✅ Add this line
    quantity: number;
    deliveryDates?: string[]; // ✅ Add this line
    selectedDate?: string | null */
};

function mergeProductsWithOffers(specs: ProductWithSpecs[], offers: Product[]): Product[] {
  return specs.map(spec => {
    //const offer = offers.find(o => o.id === spec.id.toString());
   const offer = offers.find(o => o.id.toString() === spec.id.toString());
    const basePrice = spec.basePrice ?? 0;
    const discountPct = offer?.discountPercentage ?? 0;
    const appliedPrice = basePrice - (basePrice * discountPct / 100);
    return {

       id: spec.id.toString(),
       modelName: spec.modelName,

      productName: offer?.productName ?? spec.modelName ?? "",
      title: offer?.title ?? spec.modelName ?? "",
      description: spec.description ?? offer?.description ?? "",
      //basePrice: spec.basePrice,
      basePrice,
      originalPrice: spec.basePrice,
     /*  originalPrice: offer?.originalPrice ?? spec.basePrice ?? 0, */
     appliedPrice, // ✅ always calculated from discountPct
      /* appliedPrice: offer?.appliedPrice ?? spec.basePrice ?? 0, */
       discountPercentage: discountPct,
     /*  discountPercentage: offer?.discountPercentage ?? 0, */
     price: appliedPrice,
     /*  price: offer?.appliedPrice ?? spec.basePrice ?? 0, */
      saved: offer?.saved ?? 0,
      imageUrl: spec.imageUrl,
      imageSrc: offer?.imageSrc ?? spec.imageUrl ?? "/img/default-laptop.png",
      image: offer?.image ?? "/img/default-laptop.png",
      discount: offer?.discount ?? 0,
      navigateTo: "/laptops",
      deliveryDates: [],
      selectedDate: null,
      isAvailableOnSelectedDate: false,
      name:"",
      brand: spec.brand,
      processor: spec.processor,
      ramSize: spec.ramSize,
      storageCapacity: spec.storageCapacity,
      operatingSystem: spec.operatingSystem,
      videoCard: spec.videoCard,
      display: spec.display,
      color: spec.color,
    };
  });
}
type LaptopPageProps = {
   //favourites?: FavouriteProduct[];
    onToggleFavourite?: (product: Product | FavouriteProduct) => void;
    onAddToCart?: (product: Product | FavouriteProduct) => void;
};

//export const LaptopPage = () => {
   /*  export const LaptopPage: React.FC<LaptopPageProps> = ({
      favourites,
      onToggleFavourite,
      onAddToCart,
    }) => { */
      /*   export const LaptopPage: React.FC = () => { */
         /*  export const LaptopPage: React.FC<LaptopPageProps> = ({
            //favourites,
            onToggleFavourite,
            onAddToCart,
          }) => { */

              export const LaptopPage: React.FC = () => {
    const [laptops, setLaptops] = useState<Product[]>([]);
    const [originalLaptops, setOriginalLaptops] = useState<Product[]>([]);
    const [electronicsOffers, setElectronicsOffers] = useState<Product[]>([]);
       /* const [products, setProducts] = useState<ProductOfferResponseDto[]>([]); */
      /* const [products, setProducts] = useState<Product[]>([]); */ // ✅ not ProductOfferResponseDto[]
      const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
      const [priceRange, setPriceRange] = useState<[number, number]>([999, 85000]);
      const [sortOption, setSortOption] = useState<string>("Relevance");
    /*cart code */
    const { dispatch } = useCart(); // ✅ Add this here



    const handleAddToCart = (product: Product | FavouriteProduct ) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
              id: product.id,
              productName: product.productName,
               modelName: product.modelName ?? product.productName, // ✅ ensure modelName flows
              //modelName:product.modelName,
             // title: product.title,                  // ✅ use Product.title
              description: product.description,
              originalPrice: product.originalPrice,
             basePrice: product.basePrice ?? product.originalPrice,
              appliedPrice: product.appliedPrice ?? product.originalPrice,
              price: product.appliedPrice ?? product.originalPrice, // ✅ normalize
              discountPercentage: product.discountPercentage ?? null,
              saved: product.saved??0,
              imageSrc: product.imageSrc || latop,
              quantity: 1,
              deliveryDates: product.deliveryDates ?? [],
              selectedDate: product.selectedDate ?? null,
              image: "",
              //productName: "",
              name:"",
              /* price: product.appliedPrice ?? product.originalPrice, */ // ✅ normalize here
              imageUrl: product.image || latop,
              date: "",
              //modelName:"",
              }
          });

    };


const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", process.env.REACT_APP_API_URL);
useEffect(() => {
    console.log("API_URL:", process.env.REACT_APP_API_URL);
 const payload = [
     { productId: 1, offerId: 2 }, // Diwali Festival Discount
       { productId: 1, offerId: 3 }, // Summer Promo
       { productId: 1, offerId: 1 }  // Clearance Sale

    ];
//fetch("http://localhost:8081/api/prod-offers/calculate", {
        //fetch("/api/prod-offers/calculate", {
             console.log("Calling API:", `${API_URL}/prod-offers/calculate`);
          Promise.all([
              // Specs fetch
              fetch("http://localhost:8081/api/products/with-specs").then(res => res.json()),

              // Offers fetch (POST)
                fetch("http://localhost:8081/api/prod-offers/category/Electronics/offer/3").then(res => res.json())
                ]).then(([specs, offers]) => {
                    const specsArray = Array.isArray(specs) ? specs : specs.items ?? specs.data ?? [];
                    const offersArray = Array.isArray(offers) ? offers : offers.items ?? offers.data ?? [];
                    if (!Array.isArray(specsArray) || !Array.isArray(offersArray)) {
                      console.error("Unexpected API response shape", { specs, offers });
                      return;
                    }
                   // setLaptops(mergeProductsWithOffers(specsArray, offersArray));
                    const merged = mergeProductsWithOffers(specs, offers);
                     setLaptops(merged);
                    setOriginalLaptops(merged); // keep a copy for reset
                  })
                  .catch(err => console.error("Offer/specs fetch failed:", err));
              }, []);
        // Category-specific offers in separate state
               /*  useEffect(() => {
                   fetch("http://localhost:8081/api/prod-offers/category/Electronics/offer/3")
                     .then(res => res.json())
                     .then((data: ProductOfferResponseDto[]) =>
                       setElectronicsOffers(data.map(mapDtoToProduct))
                     );
                 }, []); */
  /*  useEffect(() => {
    fetch("http://localhost:8081/api/prod-offers/category/Electronics/offer/3")
      .then(res => res.json())
      .then((data: ProductOfferResponseDto[]) =>  setLaptops(data.map(mapDtoToProduct)));
  }, []); */
 // ✅ Filter laptops by searchTerm from AppLayout
  // Search filter
  const { searchTerm } = useSearchContext(); // or pass as prop
  const searchFiltered = laptops.filter(p => {
    const term = searchTerm.toLowerCase();

    return (
      p.productName?.toLowerCase().includes(term) ||
      p.modelName?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term) ||
      // ✅ Numeric fields converted to string
      p.basePrice?.toString().includes(searchTerm) ||
      p.appliedPrice?.toString().includes(searchTerm)
    );
  });
//sorting filter
const handleSortChange = (option: string) => {
  setSortOption(option); // store choice for reference

  let sorted = [...laptops];
  switch (option) { // ✅ use the function argument
    case "Price - Low to High":
      sorted.sort((a, b) => a.appliedPrice - b.appliedPrice);
      break;
    case "Price - High to Low":
      sorted.sort((a, b) => b.appliedPrice - a.appliedPrice);
      break;
    case "Alphabetical":
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
      break;
    case "Discount":
      sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    default: // Relevance
      sorted = [...originalLaptops];
      break;
  }
  setLaptops(sorted);
};

//setLaptops(sorted);


// Price filter
const priceFiltered = searchFiltered.filter(
  p => p.appliedPrice >= priceRange[0] && p.appliedPrice <= priceRange[1]
);

// Final array
const filteredLaptops = priceFiltered;

// favourites state
//const [favourites, setFavourites] = useState<Product[]>([]);

// toggle handler
/* const toggleFavourite = (product: Product) => {
  setFavourites(prev => {
    const exists = prev.some(f => String(f.id) === String(product.id));
    return exists
      ? prev.filter(f => String(f.id) !== String(product.id))
      : [...prev, product];
  });
  console.log("LaptopPage toggleFavourite called for:", product.id);
}; */
  // ✅ Debug log for favourites
  //console.log("LaptopPage favourites:", favourites.map(f => f.id));
/* const toggleFavourite = (product: Product) => {
  console.log("toggleFavourite called for account page:", product.id);
  setFavourites(prev =>
    prev.some(f => String(f.id) === String(product.id))
      ? prev.filter(f => String(f.id) !== String(product.id))
      : [...prev, product]
  );
  console.log("AccountsPage toggleFavourite called for:", product.id);
}; */
 const { favourites, toggleFavourite, addToCart } = useFavourites();
 return (
      <div className="laptop-page d-flex flex-wrap">
        {/* <div className="laptop-row"> */}
              {/* Left column: Filters */}
              <div className="col-12 col-md-2">
              <Filters
                onPriceChange={(min, max) => setPriceRange([min, max])}
                onClearAll={() => {
                  setPriceRange([999, 85000]); // reset slider
                  setLaptops(originalLaptops); // reset dataset
                }}
              />

</div>

<div className="col-12 col-md-10">
      { /*  <div className="d-flex align-items-center mb-3"> */}
       <div className="container-fluid no-padding">
      <div className="row mb-3">
        <div className="col">
           <h5 >💻 Laptops Up to 35% OFF</h5>
           </div>
          {/*    <div className="d-flex justify-content-end flex-grow-1"> */}
              <div className="col-auto ms-auto">
                 <Box sx={{ display: "flex", alignItems: "center", minHeight: 1 }}>
                   <SortByDropdown onSortChange={handleSortChange} />
                 </Box>
               </div>
              {/*  </div> */}
            </div>
</div>
           {/* {laptops.length > 0 && <Banner product={laptops[0]} />}  ✅ Render Banner*/}


            <ProductList
                       /*   products={laptops} */      // ✅ use specs-enabled products
                         /* products={searchTerm ? filteredLaptops : laptops} */  // ✅ conditional
                         products={filteredLaptops}
                         category="Laptop"
                         onAddToCart={handleAddToCart} // ✅ dispatches to CartContext
                        /* onAddToCart={addToCart} */
                          onViewMore={(product) => {
                             console.log("Selected product from laptop:", product);
                             setSelectedProduct(product);
                             setTimeout(() => console.log("State after update:", product), 0);
                           }}
                        //favourites={favourites ?? []} // fallback to empty array    // ✅ safe fallback
                        // onToggleFavourite={onToggleFavourite}  // ✅ handler from AccountsPage
                         favourites={favourites}                 // ✅ pass actual favourites state

                          onToggleFavourite={toggleFavourite}    // ✅ pass handler so heart renders

                       //favourites={[]}   // ✅ always pass something

                        /* onViewMore={setSelectedProduct} */ // ✅ pass state setter


            />
             <SpecsModal
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                />

        </div>
        </div>
       /*  </div> */
    );
};



