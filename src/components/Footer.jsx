import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <>
      <Container>
        <Row>
          <Col className="bg-light shadow-sm" style={{ height: "100px" }}>
            <footer className="d-flex align-item-center">
              <div className="footer-container">
                <NavLink to="/" className="footer-link">
                  Home
                </NavLink>
                <NavLink to="/admin" className="footer-link">
                  Admin
                </NavLink>
                <NavLink to="/profile" className="footer-link">
                  Profile Page
                </NavLink>
              </div>
              <div className="d-flex text-center">
                <h5 className="footer-copyright">Ecommerce @ 2023</h5>
              </div>
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
