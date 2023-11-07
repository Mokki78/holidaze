import React, {  useContext } from "react";
import { useAuth} from "../context/AuthContext";
import { Container, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

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

          {userDetails ? (
              <NavDropdown
                title={userDetails.name}
                id="basic-nav-dropdown"
                img
                src={userDetails.avatar}
                height="50px"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Register/Login" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {userDetails && userDetails.isAdmin ? (
              <NavDropdown
                title={userDetails.name}
                id="basic-nav-dropdown"
                img
                src={userDetails.avatar}
                height="50px"
              >
                <NavDropdown.Item href="/admin">Admin page</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : null}
        </NavbarBs>
      </Container>
    </>
  );
}

export default NavBar;
