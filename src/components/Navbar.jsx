import React from "react";

import { Container, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

export function NavBar() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log("userDetails in NavBar: ", userDetails);

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

          {userDetails ? (
            <>
              <NavDropdown
                title={userDetails.name}
                img
                src={userDetails.avatar}
                height="50px"
                alt={`${userDetails.name}'s Avatar`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <NavDropdown title="Register/Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </NavbarBs>
      </Container>
    </>
  );
}

export default NavBar;
