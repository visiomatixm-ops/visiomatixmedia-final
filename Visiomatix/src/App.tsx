// File: src/App.tsx
/*
  File    : src/App.tsx
  Author  : Viral Prajapati
  Date    : 2025-10-10
  Description:
    Main component defining lazy-loaded routes, page loader, and layout.
*/

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Only Routes here
import Menu from './component/Menu';
import Footer from './component/Footer';
import PageLoader from './component/PageLoader';
import ChatWidget from './component/ChatWidget';

// ✅ Lazy load pages with preload for Services subpages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));

// Preload Services subpages for faster routing
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const SMM = lazy(() => import('./pages/services/DigitalMarketing'));
const Design = lazy(() => import('./pages/services/Desing'));
const Webapp = lazy(() => import('./pages/services/Webapp'));
const Software = lazy(() => import('./pages/services/Software'));
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'));
const Branding = lazy(() => import('./pages/services/Branding'));

// Preload other pages
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

// Export preload function for use in Menu component
export const preloadServicesRoutes = () => {
  import('./pages/services/DigitalMarketing');
  import('./pages/services/Desing');
  import('./pages/services/Webapp');
  import('./pages/services/Software');
  import('./pages/services/Ecommerce');
  import('./pages/services/Branding');
};

const App: React.FC = () => {
  // Preload Services routes on mount for faster navigation
  React.useEffect(() => {
    const preloadServices = async () => {
      try {
        await Promise.all([
          import('./pages/services/DigitalMarketing'),
          import('./pages/services/Desing'),
          import('./pages/services/Webapp'),
          import('./pages/services/Software'),
          import('./pages/services/Ecommerce'),
          import('./pages/services/Branding')
        ]);
      } catch (error) {
        console.warn('Failed to preload services routes:', error);
      }
    };

    // Preload after initial render to avoid blocking
    const timer = setTimeout(preloadServices, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Menu />
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
      <div>
          <ChatWidget />
    </div>      <Footer />
    </>
  );
};

export default App;
