import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="text-white py-5" style={{backgroundColor: '#1C3458'}}>
      <Container>
        <Row className="g-4">

          <Col lg={4} md={6}>

            <h5 className="mb-3">
              <img
                  src="/logo/Logo2PNG.png"
                  alt="Visiomatix Media Logo"
                  className="me-2"
                  style={{ height: '40px', width: 'auto',
                    filter: 'brightness(0) invert(1)',
                    marginRight:'1em'
                   }}
               />
              
              Visiomatix Media Pvt Ltd</h5>
            <p className="text-light small">
              Your Career, Accelerated. We transform careers through professional training, paid internships, and 100% placement support.
            </p>
          </Col>

          <Col lg={4} md={6}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#/" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#/programs" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  Programs
                </a>
              </li>
              <li className="mb-2">
                <a href="#/placement" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  Placement
                </a>
              </li>
              <li className="mb-2">
                <a href="#/contact" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={12}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                </svg>
                <a href="tel:+918999101916" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  +91 8999101916
                </a>
              </li>
              <li className="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                  <path d="m22 7-8.991 5.727a2 2 0 0 0-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <a href="mailto:visiomatixmedia@gmail.com" className="text-light text-decoration-none small" style={{ transition: 'color 0.3s' }}>
                  visiomatixmedia@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-light" />

        <div className="text-center text-light small">
          <p>© 2025 Visiomatix Media Pvt Ltd. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;