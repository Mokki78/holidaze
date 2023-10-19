import React from "react";
import { Container, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";




export function NavBar() {
  return (
    <>
      <Container className="menu">
        <NavbarBs
          sticky="top"
          className="navbar navbar-expand-lg bg-white shadow-sm"
        >
          <Link  className="logo" to="/">Holidaze</Link>
         
       
        
        </NavbarBs>
      </Container>
    </>
  );
}

export default NavBar;
