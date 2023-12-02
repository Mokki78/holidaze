import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";

export const Layout = ({ children }) => {
    return (
        <div className="container">{children}
        <NavBar />
        <Outlet /></div>
    )
}

export default Layout;