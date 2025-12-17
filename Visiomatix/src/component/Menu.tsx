import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "./logo/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const navItems = [
    //{ path: "/", label: "Home" },
    { path: "/about", label: "About" },
    {
      label: "Services",
      basePath: "/services",
      dropdown: [
        { path: "/services/DigitalMarketing", label: "Digital Marketing" },
        { path: "/services/Design", label: "Design & Creative Services" },
        { path: "/services/Webapp", label: "Web App Development" },
        { path: "/services/Software", label: "Business Software Solutions" },
        { path: "/services/Ecommerce", label: "E-Commerce Solutions" },
        { path: "/services/Branding", label: "Branding & Strategy" },
      ],
    },
    { path: "/blog", label: "Blog" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="navbar navbar-expand-lg main-navbar shadow-sm fixed-top">
      <div className="container-fluid px-3">

        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 gap-md-3"
        >
          <img src={Logo} className="brand-logo" alt="Visiomatix Logo" />
          <h4 className="brand-title">
            Visiomatix Media Pvt. Ltd</h4>
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav"
        style={{background:'white'}}
        >
          <ul className="navbar-nav d-flex  align-items-center justify-content-end"
          style={{background:'white', width:'100%'}}
          >
            {navItems.map((item, idx) => {
              const isServiceActive =
                item.basePath && location.pathname.startsWith(item.basePath);

              return (
                <li
                  key={item.label}
                  className={`nav-item mx-2 ${item.dropdown ? "dropdown" : ""}`}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {!item.dropdown ? (
                    <NavLink
                      to={item.path!}
                      className={({ isActive }) =>
                        `nav-link menu-link ${isActive ? "active-link" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <>
                      <div
                        className={`nav-link dropdown-toggle menu-link ${
                          isServiceActive ? "active-link" : ""
                        }`}
                        data-bs-toggle="dropdown"
                        onClick={() => navigate(item.basePath!)}
                      >
                        {item.label}
                      </div>

                      <ul
                        className={`dropdown-menu custom-dropdown ${
                          hoverIndex === idx ? "show" : ""
                        }`}
                      >
                        {item.dropdown.map((sub) => (
                          <li key={sub.path}>
                            <NavLink to={sub.path} className="dropdown-item">
                              {sub.label}
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
        </div>
      </div>
    </nav>
  );
};

export default Menu;
