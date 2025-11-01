/*
  File    : src/App.tsx
  Author  : Viral Prajapati
  Date    : 2025-11-01
  Description:
    Main application entry point defining lazy-loaded routes,
    global page loader, and persistent layout components.
*/

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Menu from './component/Menu';
import Footer from './component/Footer';
import PageLoader from './component/PageLoader';
import ChatWidget from './component/ChatWidget';

// ✅ Lazy-load all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));

// ✅ Correct SMM import
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const SMM = lazy(() => import('./pages/services/DigitalMarketing'));
const Design = lazy(() => import('./pages/services/Design'));
const Webapp = lazy(() => import('./pages/services/Webapp'));
const Software = lazy(() => import('./pages/services/Software'));
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'));
const Branding = lazy(() => import('./pages/services/Branding'));

const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));


// ✅ Global PageLoader handler for route changes
const App: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Show loader briefly during route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // smooth transition
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <Menu />

      {/* ✅ Global PageLoader (always shows on route transition) */}
      {loading && <PageLoader />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/DigitalMarketing" element={<DigitalMarketing />} />
          <Route path="/services/SMM" element={<SMM />} />
          <Route path="/services/Design" element={<Design />} />
          <Route path="/services/Webapp" element={<Webapp />} />
          <Route path="/services/Software" element={<Software />} />
          <Route path="/services/Ecommerce" element={<Ecommerce />} />
          <Route path="/services/Branding" element={<Branding />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      <ChatWidget />
      <Footer />
    </>
  );
};

export default App;
