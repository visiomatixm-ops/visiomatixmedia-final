import React from 'react';
import { Link } from 'react-router-dom';
import CallNowButton from './CallNowButton';

const MenuLinks: React.FC = () => {
  return (
    <>
      {/* Menu toggle button - visible on smaller screens */}
      <button
        className="navbar-toggler border-0 d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ color: '#1D3458' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
          <path d="M4 5h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 19h16"></path>
        </svg>
      </button>

      {/* Single responsive navigation - collapses on smaller screens */}
      <div className="collapse navbar-collapse" id="navbarNav"
      style={{  justifyContent: 'space-between', marginLeft:'10em' }}>
        <ul className="navbar-nav ">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ color: '#1D3458', transition: 'color 0.3s' }}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted" to="/program" style={{ transition: 'color 0.3s' }}>Programs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted" to="/placement" style={{ transition: 'color 0.3s' }}>Placement</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted" to="/contact" style={{ transition: 'color 0.3s' }}>Contact Us</Link>
          </li>
        </ul>
        <CallNowButton />
      </div>
    </>
  );
};

export default MenuLinks;