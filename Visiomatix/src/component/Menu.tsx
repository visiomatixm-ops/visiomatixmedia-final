/**
 * ===========================================================
 * File: src/components/Menu.tsx
 * Author: Viral Prajapati
 * Date: 10-Oct-2025
 * Description:
 *   Dark-themed responsive navbar for Visiomatix Media using
 *   Bootstrap + Framer Motion pill animation.
 *   - Background: #0b1e34
 *   - Foreground: White
 *   - Accent: Aqua (#00ffff)
 *   - Fade-in animation on load
 * ===========================================================
 */

import React, { useState } from "react"; // React for JSX and useState hook
import { NavLink } from "react-router-dom"; // Route-aware navigation links
import { motion, AnimatePresence } from "framer-motion"; // Animation effects
import Logo2PNG from "/logo/Logo2PNG.png"; // Project logo import
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (for toggler)
// import AuthModal from "./AuthModal"; // Login/Signup modal

const Menu: React.FC = () => {
  // Track hover state for link animation
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Navigation links
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Our Services" },
    { path: "/testimonials", label: "Testimonials / Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact Us" },
  ];

  // Framer Motion fade-in variant
  const fadeInVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* ========================================================= */}
      {/* NAVBAR WITH FADE-IN ANIMATION */}
      {/* ========================================================= */}
      <motion.nav
        className="navbar navbar-expand-lg py-3 shadow-sm position-relative visiomatix-navbar"
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="container-fluid px-4">
          {/* Brand Logo and Title */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center text-white"
          >
            <img
              src={Logo2PNG}
              alt="Visiomatix Logo"
              width="45"
              height="45"
              className="me-2"
            />
            <h1 className="fs-5 fw-bold mb-0">VISIOMATIX MEDIA</h1>
          </NavLink>

          {/* Responsive Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav position-relative">
              {navItems.map((item, index) => (
                <li
                  key={item.path}
                  className="nav-item position-relative mx-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `nav-link fw-semibold position-relative px-3 py-2 ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}

                        {/* Animated Aqua Pill */}
                        <AnimatePresence>
                          {(isActive || hoveredIndex === index) && (
                            <motion.div
                              layoutId="nav-pill"
                              className="nav-pill"
                              initial={{ opacity: 0, scaleX: 0.5 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              exit={{ opacity: 0, scaleX: 0.5 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            />
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA: Login/Signup Button (optional) */}
            {/* <div className="d-flex align-items-center ms-3">
              <button
                type="button"
                className="btn btn-aqua cta-btn px-4 py-2 fw-semibold"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
              >
                Login / Sign up
              </button>
            </div> */}
          </div>
        </div>
      </motion.nav>

      {/* ========================================================= */}
      {/* CSS Styling Section */}
      {/* ========================================================= */}
      <style>
        {`
          /* Navbar Background & Foreground */
          .visiomatix-navbar {
            background-color: #0b1e34;
            box-shadow: 0px 0px 5pt 0em #00ffff !important;
            position: fixed !important;
            z-index: 10;
            width: 100%;
          }

          /* NavLink default style */
          .nav-link {
            color: #ffffff !important;
            transition: color 0.3s ease;
            position: relative;
            z-index: 2;
          }

          /* Hover & Active color */
          .nav-link.active,
          .nav-link:hover {
            color: #00ffff !important;
          }

          /* Animated Aqua Pill Underline */
          .nav-pill {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3px;
            border-radius: 50px;
            background: linear-gradient(90deg, #00ffff, #00bcd4);
            transform-origin: center;
            z-index: 1;
          }

          /* CTA Button Styling */
          .btn-aqua {
            background: linear-gradient(90deg, #00ffff, #00bcd4);
            border: none;
            color: #0b1e34;
            transition: all 0.3s ease;
          }

          .btn-aqua:hover {
            background: linear-gradient(90deg, #00bcd4, #00ffff);
            transform: scale(1.05);
          }

          /* Navbar toggler for dark background */
          .navbar-toggler {
            background-color: rgba(255,255,255,0.2);
          }

          .navbar-toggler-icon {
            filter: invert(1);
          }
        `}
      </style>

      {/* Auth Modal */}
      {/* <AuthModal /> */}
    </>
  );
};

export default Menu;
