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
          <Link className="logo me-auto" to="/">
            Holidaze
          </Link>
          <NavDropdown title="Register/ Login" id="basic-nav-dropdown">
              <NavDropdown.Item  href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </NavbarBs>
      </Container>
    </>
  );
}

export default NavBar;
