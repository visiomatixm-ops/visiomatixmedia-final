import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import MenuLinks from './MenuLinks';

const Menu: React.FC = () => {
  return (
    <>
      <style>
        {`
          @media (max-width: 991.98px) {
            .navbar-brand {
              margin-bottom: 1rem;
            }
            .navbar-toggler {
              position: absolute;
              top: 50%;
              right: 1rem;
              transform: translateY(-50%);
            }
          }
          .navbar-brand {
            margin-right: 2rem;
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
        <div className="container position-relative">
          <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
            <Logo />
          </Link>

          <MenuLinks />
        </div>
      </nav>
    </>
  );
};

export default Menu;