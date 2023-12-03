import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Navbar as NavbarBs,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search } from "../components/Search";

export function NavBar() {
  const { state } = useAuth();
  const userDetails = state.userDetails;

  return (
    <Container className="menu">
      <NavbarBs
        sticky="top"
        expand="md"
        className="navbar navbar-expand-lg bg-white shadow-sm"
      >
        <Link className="logo me-2 me-md-auto" to="/">
          Holidaze
        </Link>

        <NavbarBs.Toggle aria-controls="navbarNav" />

        <NavbarBs.Collapse id="navbarNav">
          <Nav className="me-auto text-center">
            <Link className="nav-link px-5 pb-1" to="/">
              Home
            </Link>
          </Nav>

          <Search className="d-flex mx-auto mt-3 text-center" />

          {userDetails && (
            <Nav className="align-items-center d-none d-md-flex">
              <img
                src={userDetails.avatar}
                className="profileImg me-2"
                alt={`${userDetails.name}'s Avatar`}
              />

              <NavDropdown title={userDetails.name} id="basic-nav-dropdown">
                {userDetails.venueManager === true ? (
                  <NavDropdown.Item as={Link} to="/admin">Admin page</NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!userDetails ? (
            <Nav className="me-auto text-center ms-md-auto">
              <NavDropdown title="Register/Login" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : userDetails.venueManager ? (
            <>
              <Nav className="me-auto text-center d-md-none">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto text-center d-md-none">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </Nav>
            </>
          )}

          
            <Nav className="align-items-center d-md-none">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </Nav>
          
        </NavbarBs.Collapse>
      </NavbarBs>
    </Container>
  );
}

export default NavBar;
