import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo2PNG from "/logo/Logo2PNG.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Orbitron font for logo
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const Menu: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation(); // ✅ Track current route

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    {
      label: "Services",
      basePath: "/services", // ✅ base path for active detection
      dropdown: [
        { path: "/services/DigitalMarketing", label: "Digital Marketing" },
        { path: "/services/Design", label: "Design and Creative Services" },
        { path: "/services/Webapp", label: "Web App Development" },
        { path: "/services/Software", label: "Business Software Solutions" },
        { path: "/services/Ecommerce", label: "ECommerce Solutions" },
        { path: "/services/Branding", label: "Branding and Strategy" },
      ],
    },
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
      <motion.nav
        className="navbar navbar-expand-lg py-3 shadow-sm position-relative visiomatix-navbar"
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="container-fluid px-4">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center text-dark"
          >
            <img
              src={Logo2PNG}
              alt="Visiomatix Logo"
              width="45"
              height="45"
              className="m-2"
              style={{ width: "100%" }}
            />
            <h1
              className="fs-5 fw-bold mb-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "2.2rem",
                background: "linear-gradient(90deg, #0055ff, #00aaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              VISIOMATIX MEDIA
            </h1>
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
              {navItems.map((item, index) => {
                // ✅ Detect if dropdown parent (e.g., "Services") is active
                const isServicesActive =
                  item.basePath && location.pathname.startsWith(item.basePath);

                return (
                  <li
                    key={item.label}
                    className={`nav-item position-relative mx-2 ${
                      item.dropdown ? "dropdown" : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* ===================== NON-DROPDOWN LINKS ===================== */}
                    {!item.dropdown ? (
                      <NavLink
                        to={item.path!}
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
                    ) : (
                      /* ===================== DROPDOWN (SERVICES) ===================== */
                      <>
                        <span
                          className={`nav-link fw-semibold dropdown-toggle px-3 py-2 ${
                            isServicesActive ? "active" : ""
                          }`}
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {item.label}
                          {/* ✅ Animated Blue Pill for Active Services */}
                          <AnimatePresence>
                            {(isServicesActive || hoveredIndex === index) && (
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
                        </span>
                        <ul className="dropdown-menu border-0 shadow-sm">
                          {item.dropdown.map((subItem) => (
                            <li key={subItem.path}>
                              <NavLink
                                to={subItem.path}
                                className={({ isActive }) =>
                                  `dropdown-item fw-semibold py-2 ${
                                    isActive ? "text-primary" : ""
                                  }`
                                }
                              >
                                {subItem.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Agent Login Button */}
            {/* <div className="d-flex align-items-center ms-3">
              <button
                type="button"
                className="btn btn-primary cta-btn"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
              >
                Agent Login
              </button>
            </div> */}
          </div>
        </div>
      </motion.nav>

      {/* ===================== LIGHT THEME CSS ===================== */}
      <style>
        {`
          .visiomatix-navbar {
            background-color: #ffffff;
            box-shadow: 0 0 8pt 0.1em rgba(0, 0, 0, 0.08);
            position: fixed !important;
            z-index: 10;
            width: 100%;
          }

          .nav-link {
            color: #0b1e34 !important;
            transition: color 0.3s ease;
            position: relative;
            z-index: 2;
          }

          .nav-link.active,
          .nav-link:hover {
            color: #0078ff !important;
          }

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

          .dropdown-menu {
            margin-top: 0.5rem;
            border-radius: 0.5rem;
            min-width: 250px;
          }

          .dropdown-item {
            color: #0b1e34 !important;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .dropdown-item:hover {
            background: linear-gradient(90deg, #0078ff, #00aaff);
            color: #fff !important;
          }

          .navbar-toggler {
            background-color: rgba(0, 0, 0, 0.05);
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(11,30,52,0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
          }
        `}
      </style>
    </>
  );
};

export default Menu;
