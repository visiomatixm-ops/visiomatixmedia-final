/**
 * ===========================================================
 * File: src/components/Menu.tsx
 * Author: Viral Prajapati
 * Date: 15-Oct-2025
 * Description:
 *   Light-themed responsive navbar for Visiomatix Media using
 *   Bootstrap + Framer Motion pill animation.
 *   - Background: White (#ffffff)
 *   - Foreground: Dark Navy (#0b1e34)
 *   - Accent: Blue (#0078ff)
 *   - Fade-in animation on load
 * ===========================================================
 */

import React, { useState } from "react";
import Logo2PNG from "/logo/Logo2PNG.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Correctly load Orbitron font for the logo
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const Menu: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Our Services" },
    { path: "/testimonials", label: "Testimonials / Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact Us" },
  ];

  const fadeInVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* ========================================================= */}
      {/* NAVBAR (LIGHT THEME) */}
      {/* ========================================================= */}
      <nav
        className="navbar navbar-expand-lg py-3 shadow-sm position-relative visiomatix-navbar"      >
        <div className="container-fluid px-4">
          {/* Brand Logo + Title */}
          <nav
            className="navbar-brand d-flex align-items-center text-dark"
          >
            <img
              src={Logo2PNG}
              alt="Visiomatix Logo"
              style={{width:"100%"}}
              width="45"
              height="45"
              className="m-2"
            />
            <h1
              className="fs-5 fw-bold mb-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "2.2rem",
                background: "linear-gradient(90deg, #0055ff, #00aaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              VISIOMATIX MEDIA
            </h1>
          </nav>

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


              </div>
          </div>
              {/* Render modal so it exists in DOM. */}

      </nav>

      {/* ========================================================= */}
      {/* LIGHT THEME CSS STYLING */}
      {/* ========================================================= */}
      <style>
        {`
          /* Light Navbar Base */
          .visiomatix-navbar {
            background-color: #ffffff;
            box-shadow: 0 0 8pt 0.1em rgba(0, 0, 0, 0.08);
            position: fixed !important;
            z-index: 10;
            width: 100%;
          }

          /* NavLink default */
          .nav-link {
            color: #0b1e34 !important;
            transition: color 0.3s ease;
            position: relative;
            z-index: 2;
          }

          /* Hover & Active */
          .nav-link.active,
          .nav-link:hover {
            color: #0078ff !important;
          }

          /* Blue Pill Animation */
          .nav-pill {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3px;
            border-radius: 50px;
            background: linear-gradient(90deg, #0078ff, #00aaff);
            transform-origin: center;
            z-index: 1;
          }

          /* Navbar toggler (light background) */
          .navbar-toggler {
            background-color: rgba(0, 0, 0, 0.05);
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(11,30,52,0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
          }

          /* Smooth fade for brand */
          .navbar-brand h1 {
            transition: transform 0.3s ease;
          }

          .navbar-brand:hover h1 {
            transform: scale(1.05);
          }
            .modal-backdrop.fade.show {
               z-index: 2;
            }
        `}
      </style>
    </>
  );
};

export default Menu;
