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

// ✅ Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

const App: React.FC = () => {
  return (
    <>
      <Menu />
      <Suspense fallback={<PageLoader />}>
      <PageLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
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
