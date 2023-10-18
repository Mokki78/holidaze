import React from "react";
import {  Container, Navbar as NavbarBs } from "react-bootstrap";
import { Link } from "react-router-dom";


export function NavBar() {


    return (
        <>
        <Container>
            <NavbarBs>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/test">Test</Link>
             
            </NavbarBs>
        </Container>
        </>
    )
  }

  export default NavBar;
  