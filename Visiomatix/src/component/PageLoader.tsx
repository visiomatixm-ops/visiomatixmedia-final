/**
 * ===========================================================
 * File: src/components/PageLoader.tsx
 * Author: Viral Prajapati
 * Date: 2025-11-01
 * Description:
 *  Full-screen ripple animation loader with bouncing logo (no rotation).
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start loading immediately when route changes
    setLoading(true);
    setIsVisible(true);
    NProgress.start();

    const minLoadTime = 800;
    const startTime = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setLoading(false);
        NProgress.done();

        setTimeout(() => setIsVisible(false), 500);
      }, remaining);
    };

    const timer = setTimeout(hideLoader, 600);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {(loading || isVisible) && (
        <motion.div
          key={`page-loader-${location.pathname}`}
          className="page-loader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{display:"flex",
                  flexDirection:"column",
          }}  
        >
          <div className="ripple-wrapper">
            {/* Ripple rings */}
            <motion.div
              className="dynamic-ripple"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{display:"flex",
                  flexDirection:"column",
                }}  
            />
            <motion.div
              className="dynamic-ripple"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.6, 0.1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
            />
            <motion.div
              className="dynamic-ripple"
              animate={{
                scale: [1, 3, 1],
                opacity: [0.4, 0.05, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              style={{display:"flex",
                  flexDirection:"column",
                }}  
            />

            {/* ✅ Bouncy logo (no rotation) */}
      
            <motion.h1
              className="fs-5 fw-bold mb-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "2.2rem",
                background: "linear-gradient(90deg, #0055ff, #00aaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                zIndex:10,
                width:"100%",
                textAlign:"center",
                margin:"3em"
              }}
            > <motion.img
              src={Logo2PNG}
              alt="Visiomatix Logo"
              className="loader-logo"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }} 
            />      
              VISIOMATIX MEDIA
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
