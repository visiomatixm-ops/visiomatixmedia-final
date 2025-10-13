/**
 * ===========================================================
 * File: src/components/PageLoader.tsx
 * Author: Viral Prajapati
 * Date: 2025-10-13
 * Description:
 *  Full-screen ripple animation loader that appears
 *  whenever a route (link) changes in the app.
 * ===========================================================
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './PageLoader.css';
import Logo2PNG from '/logo/Logo2PNG.png';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 150,
  easing: 'ease',
  speed: 500,
});

const PageLoader: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 1200);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger only when path changes

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          className="page-loader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="ripple-wrapper">
            <div className="ripple-ring"></div>
            <div className="ripple-ring"></div>
            <img
              src={Logo2PNG}
              alt="Visiomatix Logo"
              className="loader-logo"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
