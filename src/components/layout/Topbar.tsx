import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from '../cart/CartContext';
import { AuthModal } from '@cart/AuthModal';
import { useCheckout } from '@cart/useCheckout';
import { useOtpAuth } from '@cart/useOtpAuth';
import homecentericon from "@img/homecentericon.png";
import SearchBar from "./SearchBar";
//import SearchProvider from "./SearchContext";   // default export

import {useSearchContext } from "@layout/SearchProvider";
import { Product } from '../../typed/Product';
import {ProductList} from "@WelcomeSection/ProductList";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
interface AuthModalProps {
    visible: boolean;
    onClose: () => void;
    mobile: string;
    setMobile: (val: string) => void;
    otp: string;
    setOtp: (val: string) => void;
    isOtpSent: boolean;
    cooldownTime: number;
    sendOtp: () => void;
    verifyOtp:() => void;
    changeNumber: () => void;

}
interface TopbarProps {
  //searchTerm: string;
  //setSearchTerm: (val: string) => void;
  /* products?: Product[]; */
}

//const Topbar: React.FC = () => {
    //const Topbar: React.FC<TopbarProps> = ({ searchTerm, setSearchTerm}) => {
        const Topbar: React.FC = () => {
     const { showAuthModal, setShowAuthModal, isUserLoggedIn } = useCheckout();
     const { cart } = useCart();
     //const [searchTerm, setSearchTerm] = useState("");
      const { searchTerm, setSearchTerm } = useSearchContext();
     const {
      mobile, setMobile,
      otp, setOtp,
      isOtpSent,
      isOtpVerified,
      cooldownTime,
      sendOtp,
      verifyOtp,
      changeNumber
    } = useOtpAuth();

      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="d-flex align-items-center flex-grow-1 mx-4">
            <img src={homecentericon} alt="MY HOME" style={{ width: "100px", marginRight: "10px" }} />
           <div className="logo mx-3" style={{ display: "inline-block" }}>
             My Shop
           </div>
           {/* Call the reusable SearchBar */}
                 <SearchBar
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
            {/* <div className="input-group flex-grow-1">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="What are you looking for?"
              />
            </div> */}
          </div>
          <div className="actions d-flex align-items-center">
            {/* Always visible */}
            <Link to="/account?section=favourites" className="nav-link d-flex align-items-center mx-2">
              {/* <FaHeart style={{ marginRight: "6px" }} /> Favourites */}
               <IconButton aria-label="fav-icon" size="small" color="inherit">
                  <FavoriteBorderIcon sx={{ color: "black" }} />   {/* ✅ border-only heart */}
               </IconButton>
                 <Typography variant="body1" sx={{ ml: 1, color: "black" }}>
                     Favourites
                   </Typography>
            </Link>

            <Link to="/cart" className="nav-link d-flex align-items-center mx-2">
             {/*  <FaShoppingCart style={{ marginRight: "6px" }} /> Cart ({itemCount}) */}
              <IconButton aria-label="cart-icon" size="small" color="inherit">
                 <ShoppingCartOutlinedIcon sx={{ color: "black" }} />  {/* ✅ border-only cart */}
               </IconButton>
               <Typography variant="body1" sx={{ ml: 1, color: "black" }}>
                 Cart ({itemCount})
               </Typography>
            </Link>
             {/* Conditional: Account vs Sign In */}
                    {isUserLoggedIn ? (
                      <Link to="/account" className="nav-link d-flex align-items-center mx-2">
                        Account
                      </Link>
                    ) : (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => setShowAuthModal(true)}
                      >
                        Sign In / Sign Up
                      </button>
                    )}
                  </div>
                  {showAuthModal && (
                    <AuthModal
                      visible={showAuthModal}
                      onClose={() => setShowAuthModal(false)}
                      mobile={mobile}
                      setMobile={setMobile}
                      otp={otp}
                      setOtp={setOtp}
                      isOtpSent={isOtpSent}
                      cooldownTime={cooldownTime}
                      sendOtp={sendOtp}
                      verifyOtp={verifyOtp}
                      changeNumber={changeNumber}
                    />
                    )}
                 {/*  {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />} */}
                      {/* Pass filtered products to ProductList */}

                      </div>
                    );
                  };

export default Topbar;
