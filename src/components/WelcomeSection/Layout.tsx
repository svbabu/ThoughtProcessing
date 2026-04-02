import React from 'react';
import Navbar from './Navbar';
import {Header} from "@components/Header";

export const Layout = ({ children, showNavbar = true }: { children: React.ReactNode; showNavbar?: boolean }) => (


    <>
       {/* <Header />*/}

        {/*<Navbar />*/}
        {showNavbar && <Navbar />}
        {/* console.log('showNavbar:', showNavbar); */}


        <main className="main-column">{children}</main>
    </>
);

