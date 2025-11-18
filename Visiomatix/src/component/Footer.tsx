// ============================================================
// File: Footer.tsx
// Author: Viral Prajapati
// Date: 08-Oct-2025
// Description:
//   This component renders a responsive footer section containing
//   navigation links, contact info, and dynamic breadcrumbs showing
//   the user's navigation path.
//
// Dependencies:
//   - React
//   - react-router-dom (for Breadcrumb navigation)
// ============================================================

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";
// import { Facebook, Instagram, Linkedin, Twitter } from "react-bootstrap-icons";
// Bootstrap Icons CSS will be loaded globally
const Footer: React.FC = () => {
  return (
    <>
      <style>
        {`
          .footer-section {
            background-color: #1C3458;
            width: 100%;
          }
          /* Logo */
          .footer-logo {
            width: 55px;
            height: 55px;
            object-fit: contain;
            filter: brightness(0) invert(1);
          }
          /* Footer Links */
          .footer-links li a {
            color: #DFE6F3;
            text-decoration: none;
            display: inline-block;
            padding: 3px 0;
            transition: 0.3s;
          }
          .footer-links li a:hover {
            color: #00AAFF;
            padding-left: 3px;
          }
          /* Subscribe Button */
          .subscribe-btn {
            background-color: #006AFF;
            border: none;
          }
          .subscribe-btn:hover {
            background-color: #004FBE;
          }
          /* Uniform social icons */
          .lucide-icon-wrapper {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.25s ease;
            color: #FFFFFF;
            opacity: 0.85;
          }
          .lucide-icon-wrapper:hover {
            opacity: 1;
            transform: scale(1.12);
            color: #00AAFF;
          }
        `}
      </style>
      <footer className="footer-section text-light pt-5 pb-4">
      <Container>
        {/* Top Section */}
        <Row className="gy-4 text-center text-md-start">
          {/* Brand + Social */}
          <Col xs={12} md={4} lg={3}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src="/icons-white/CompanyLogo.png"
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
            <div className="d-flex justify-content-start gap-2 mt-3">
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
              <Button className="subscribe-btn fw-semibold px-4 rounded">
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
              © {new Date().getFullYear()} <strong>Visiomatix</strong> — All Rights Reserved
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
