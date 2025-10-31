// ============================================================
// File: Footer.tsx
// Author: Viral Prajapati
// Date: 08-Oct-2025
// Description:
//   This component renders a responsive footer section containing
//   navigation links, contact info, and dynamic breadcrumbs showing
//   the user’s navigation path.
//
// Dependencies:
//   - React
//   - react-router-dom (for Breadcrumb navigation)
// ============================================================

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
// useLocation gives access to the current URL path to build breadcrumbs.

const Footer: React.FC = () => {
  // Access the current route
  const location = useLocation();

  // Split the pathname into an array, e.g. "/about/team" → ['about', 'team']
  const pathParts = location.pathname.split('/').filter((part) => part);

  // Helper function to capitalize breadcrumb titles
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <>
    <footer className="bg-dark text-light pt-4 pb-2 mt-5">
      {/* Breadcrumb Section */}
      <div className="container mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent p-0 mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-warning">
                Home
              </Link>
            </li>

            {pathParts.map((part, index) => {
              const routeTo = `/${pathParts.slice(0, index + 1).join('/')}`;
              const isLast = index === pathParts.length - 1;

              return (
                <li
                  key={routeTo}
                  className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isLast ? (
                    capitalize(part)
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-decoration-none text-warning"
                    >
                      {capitalize(part)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Footer Navigation Links */}
      <div className="container text-center">
        <ul className="list-inline mb-3">
          <li className="list-inline-item mx-3">
            <Link to="/" className="text-light text-decoration-none">
              Home
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/about" className="text-light text-decoration-none">
              About
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/team" className="text-light text-decoration-none">
              Our Team
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/testimonials" className="text-light text-decoration-none">
              Testimonials
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services" className="text-light text-decoration-none">
              Our Services
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/DigitalMarketing" className="text-light text-decoration-none">
              Digital Marketing
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/Design" className="text-light text-decoration-none">
              Design and Creative Services
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/Webapp" className="text-light text-decoration-none">
              Web App Development
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/Software" className="text-light text-decoration-none">
              Business Software Solutions
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/Ecommerce" className="text-light text-decoration-none">
              ECommerce Solutions
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/services/Branding" className="text-light text-decoration-none">
              Branding and Strategy
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/gallery" className="text-light text-decoration-none">
              Gallery
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/contact" className="text-light text-decoration-none">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Footer Bottom Info */}
        <span className="d-block small text-secondary">
          © {new Date().getFullYear()} Visiomatix | Phone: +91-XXXXXXXXXX
        </span>
      </div>
    </footer>
    <style>
         {`li.breadcrumb-item.active {
          color: #006aff !important;
          }`} 
    </style>
    </>
  );
};

export default Footer;
