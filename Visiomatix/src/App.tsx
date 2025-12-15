/**
 * ===========================================================
 * Visiomatix Main Application Component
 * ===========================================================
 *
 * This is the root component for the Visiomatix company website and marketing platform.
 * It serves as the central routing hub and manages the overall application structure
 * with lazy-loaded components for optimal performance.
 *
 * Key Features:
 * - React Router for client-side navigation
 * - Lazy loading for code splitting and performance optimization
 * - Global page loader for smooth transitions
 * - Persistent layout components (Menu, Footer, ChatWidget)
 * - Comprehensive service pages for business offerings
 *
 * Architecture:
 * - Uses React.lazy() for dynamic imports to reduce initial bundle size
 * - Suspense boundaries for graceful loading states
 * - Route-based loading indicators for better UX
 * - Global components that persist across page changes
 *
 * Routes Structure:
 * - Home: Landing page with company overview
 * - About: Company information and team details
 * - Services: Main services overview page
 * - Individual Service Pages: Detailed service offerings
 * - Blog: Content marketing and articles
 * - Careers: Job opportunities and company culture
 * - Contact: Contact forms and information
 *
 * Performance Optimizations:
 * - Code splitting reduces initial load time
 * - Lazy loading defers non-critical components
 * - Global loader provides consistent UX during transitions
 *
 * @author Viral Prajapati
 * @version 2.0
 * @since 2025-11-01
 * ===========================================================
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 

import Menu from './component/Menu';
import Footer from './component/Footer';
import PageLoader from './component/PageLoader';
import ChatWidget from './component/ChatWidget';

/* Slide System */
import Slide from './component/views/Slide';
import { pages } from './pages';
import WhatsappFloatingButton from './component/WhatsappFloatingButton';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
//  Correct SMM import
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const SMM = lazy(() => import('./pages/services/DigitalMarketing'));
const Design = lazy(() => import('./pages/services/Design'));
const Webapp = lazy(() => import('./pages/services/Webapp'));
const Software = lazy(() => import('./pages/services/Software'));
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'));
const Branding = lazy(() => import('./pages/services/Branding'));

const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const Careers = lazy(() => import('./pages/Careers'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));


// ✅ Global PageLoader handler for route changes
/**
 * Main App Component
 */
const App: React.FC = () => {
  // Get current location for route change detection
  const location = useLocation();

  // Loading state for smooth page transitions
  const [loading, setLoading] = useState(true);

  // Show loader on route change
  useEffect(() => {
    // Start loading when route changes
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  /* ---- Slide Navigation for "/slides" route ONLY ---- */
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (location.pathname !== '/slides') return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') setPageIndex((p) => Math.min(p + 1, pages.length - 1));
      if (e.key === 'ArrowUp') setPageIndex((p) => Math.max(p - 1, 0));
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [location.pathname]);

  return (
    <>
      {/* Show Menu + Footer only for the website, NOT for slides */}
      {location.pathname !== '/slides' && <Menu />}

      {/* Global page loader - shows during route transitions for smooth UX */}
      {loading && <PageLoader />}

      {/* Suspense boundary for lazy-loaded components */}
      {/* Fallback shows PageLoader while components are being loaded */}
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ============================== */}
          {/*      Slide Presentation        */}
          {/* ============================== */}
          <Route
            path="/slides"
            element={
              <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
                <Slide pageIndex={pageIndex} />
              </div>
            }
          />

          {/* ============================== */}
          {/*         Normal Website         */}
          {/* ============================== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Individual Services */}
          <Route path="/services/DigitalMarketing" element={<DigitalMarketing />} />
          <Route path="/services/SMM" element={<SMM />} />
          <Route path="/services/Design" element={<Design />} />
          <Route path="/services/Webapp" element={<Webapp />} />
          <Route path="/services/Software" element={<Software />} />
          <Route path="/services/Ecommerce" element={<Ecommerce />} />
          <Route path="/services/Branding" element={<Branding />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Content Pages */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </Suspense>

      {/* Chat + Footer only for website */}
      {location.pathname !== '/slides' && <ChatWidget />}
      <WhatsappFloatingButton />

      {location.pathname !== '/slides' && <Footer />}
    </>
  );
};

export default App;
