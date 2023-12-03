import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = ({ children }) => {
    return (
        <div className="container">{children}
        <NavBar />
        <Footer />
        <Outlet /></div>
    )
}

export default Layout;