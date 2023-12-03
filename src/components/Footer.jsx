import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row className="footer-row">
        <Col className="bg-light shadow-sm d-flex flex-column align-items-center justify-content-end" style={{ height: "100px" }}>
          <footer className="w-100">
            <div className="text-center mb-auto">
              <Link className="footerLogo" to="/">
                Holidaze
              </Link>
            </div>
            <div className="text-right">
              <h5 className="copyrightFooter">Holidaze @2023</h5>
            </div>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;