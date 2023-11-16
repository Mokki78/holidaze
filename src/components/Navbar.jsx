import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search } from "../components/Saerch";

export function NavBar() {
  const { state } = useAuth();
  const userDetails = state.userDetails;

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
          <Search />
          {userDetails ? (
            <NavDropdown
              title={userDetails.name}
              id="basic-nav-dropdown"
              img
              src={userDetails.avatar}
              height="50px"
            >
              {userDetails.venueManager === true ? (
                <NavDropdown.Item href="/admin">Admin page</NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              )}
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
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
