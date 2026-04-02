/* min.tsx */
import React from 'react';
/* import ReactDOM from 'react-dom/client'; */
import { Header } from './components/Header'; // ✅ matches named export
import { initTypedText } from './typed/typed-init';
import { useEffect } from 'react';
import Typed from 'typed.js';
import TypedTextBlock from './components/TypedTextBlock';
import { createRoot } from 'react-dom/client';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';
import './react-layout.css'; // Adjust path as needed
import Navbar from './components/WelcomeSection/Navbar';
import HomePage from "./components/WelcomeSection/HomePage";
import { Layout } from './components/WelcomeSection/Layout'; // wherever you've defined it
/* cart imports */
import { CartProvider } from '@cart/CartContext';
import CartPage from './components/cart/CartPage';
import {ToastContainer} from "react-toastify";
import Checkout from '@cart/Checkout';
import OrderSuccess from '@cart/OrderSuccess';
import AccountsPage from '@cart/AccountsPage';
import {AuthProvider} from './components/cart/AuthProvider';



/* cart imports */
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { LaptopPage } from './components/WelcomeSection/LaptopPage';
import { MobilePage } from './components/WelcomeSection/MobilePage';
import { ShoesPage} from './components/WelcomeSection/ShoesPage';





// adjust path as needed


//import Sidebar from './components/WelcomeSection/Sidebar';




const roles = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Apps Designer",
  "Apps Developer"
];

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>

    <AuthProvider>
    <CartProvider>

        <BrowserRouter>

        <div className="tp-react-root">
        {/* ✅ Scoped container */}
        <main className="main-column">
          <Header />
            <Routes>
                {/*<Route path="/" element={<Layout><WelcomeSection /></Layout>} />
                <Route path="/projects/laptops" element={<Layout><LaptopPage /></Layout>} />
*/}
                {/* 🏠 Root page already includes Navbar internally */}
                <Route path="/" element={<Layout showNavbar={false}><WelcomeSection /></Layout>} />

                {/* 💻 Laptop page needs Navbar from Layout */}
                {/*<Route path="/projects/laptops" element={<Layout showNavbar={true}><LaptopPage /></Layout>} />*/}
                 {/* <Route path="/home" element={<Layout showNavbar={true}><HomePage /></Layout>} />*/}
                <Route path="/laptops" element={<Layout showNavbar={true}><LaptopPage /></Layout>} />
                <Route path="/mobiles" element={<Layout showNavbar={true}><MobilePage /></Layout>} />
                <Route path="/shoes" element={<Layout showNavbar={true}><ShoesPage /></Layout>} />

          {/* Add more routes here */}
           <Route path="/cart" element={<Layout showNavbar={false}><CartPage /></Layout>} />
                <Route path="/checkout" element={<Layout showNavbar={false}><Checkout /></Layout>} />
                {/*<Route path="/" element={<HomePage />} />*/}

                 {/*<Route path="/cart" element={<CartPage />} />*/}
                 {/* <Route path="/" element={<Navigate to="/cart" />} / >*/}
                 {/*<Route path="*" element={<Navigate to="/cart" />} />*/}
                <Route path="/order-success" element={<Layout showNavbar={false}><OrderSuccess /></Layout>} />
                {/*<Route index element={<Layout showNavbar={true}><HomePage /></Layout>} />*/}
               <Route path="/account" element={<Layout showNavbar={false}><AccountsPage /></Layout>} />


              <Route path="/home" element={<HomePage />} />
               <Route path="/account" element={<AccountsPage />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/cart" element={<CartPage />} />




            </Routes>

             {/* <CartProvider>
                        <YourAppRoutes />
             </CartProvider>  */}


            {/*<Navbar />*/}
            {/*<Sidebar>*/}
            {/*<WelcomeSection />*/}
           {/* <TypedTextBlock roles={roles} /> */}

            <ToastContainer
                position="bottom-left" // 👈 Change this to your preferred position
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
            />




        </main>
      </div>
       {/* ✅ Global reCAPTCHA container */}
                <div id="recaptcha-container" style={{ display: 'none' }}></div>
        </BrowserRouter>
        </CartProvider>
</AuthProvider>

    </React.StrictMode>
  );


}







