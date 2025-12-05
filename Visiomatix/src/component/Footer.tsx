import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Footer.css";
// import { Facebook, Instagram, Linkedin, Twitter } from "react-bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";


const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer-section text-light pt-5 pb-4">
        <Container>

          {/* Top Section */}
          <Row className="gy-4 text-center text-md-start">

            {/* Brand + Social */}
            <Col xs={12} md={4} lg={3}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <img
                  src="/logo/Logo2PNG.png"
                  alt="Logo"
                  className="footer-logo"
                />
                <h4 className="fw-bold mb-0">Visiomatix</h4>
              </div>

              <p className="small">
                Delivering digital transformation and creative innovation to help
                brands scale in today's digital world.
              </p>

              {/* <div className="d-flex justify-content-start gap-3 mt-3">
              {["Facebook", "Twitter", "Linkedin", "Instagram"].map((icon) => (
                <a key={icon} href="#" className="footer-icon">
                  <img src={/icons-white/${icon}.svg} alt={icon} />
                </a>))}
            </div> */}

              <div className="d-flex justify-content-start gap-0 mt-3">
                {["bi-facebook",
                  "bi-youtube",
                  "bi-linkedin",
                  "bi-twitter-x",
                  "bi-instagram",].map((icon, index) => (
                    <a key={index} href="#" className="footer-icon lucide-icon-wrapper">
                      <i className={icon}></i>
                    </a>
                  ))}
              </div>

            </Col>

            {/* Company Links */}
            <Col xs={6} md={4} lg={2}>
              <h6 className="fw-semibold text-uppercase">Company</h6>
              <ul className="list-unstyled mt-2 footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Col>

            {/* Services */}
            <Col xs={6} md={4} lg={3}>
              <h6 className="fw-semibold text-uppercase">Services</h6>
              <ul className="list-unstyled mt-2 footer-links">
                <li><Link to="/services/DigitalMarketing">Digital Marketing</Link></li>
                <li><Link to="/services/Webapp">Web App Development</Link></li>
                <li><Link to="/services/Design">Design & Creative</Link></li>
                <li><Link to="/services/Branding">Branding & Strategy</Link></li>
                <li><Link to="/services/Software">Business Software</Link></li>
                <li><Link to="/services/Ecommerce">E-Commerce</Link></li>
              </ul>
            </Col>

            {/* Subscribe */}
            <Col xs={12} lg={4}>
              <h6 className="fw-semibold text-uppercase">Stay Updated</h6>
              <p className="small mt-2">Subscribe for updates, trends, and insights.</p>

              <Form className="d-flex flex-column flex-sm-row gap-2 mt-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="rounded"
                />
                <Button className="subscribe-btn fw-semibold px-4 rounded"
                 style={{ backgroundColor: "#ffffffff", color:'#09324dff', border: "none" }}
                >
                  Subscribe
                </Button>
              </Form>
            </Col>

          </Row>

          {/* Bottom Section */}
          <hr className="border-secondary mt-5 mb-3" />

          <Row>
            <Col className="text-center small">
              <p className="mb-1">
                 © Copyright {new Date().getFullYear()} <strong>by Visiomatix Media</strong> All Rights Reserved
              </p>
              <div className="d-flex justify-content-center gap-3">
                <span><Phone size={15} /> +91-9270271916</span>
                <span><Mail size={15} /> visiomatixmedia@gmail.com</span>
              </div>
            </Col>
          </Row>

        </Container>
      </footer>
    </>
  );
};

export default Footer;
