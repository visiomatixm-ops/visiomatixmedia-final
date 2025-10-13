/**
 * File: src/pages/Home.tsx
 * Author: Viral Prajapati
 * Date: 12-Oct-2025
 * Description:
 *  This is the Home page of the Visiomatix website.
 *  It includes a carousel slider, multiple banner sections, and the services layout.
 *  Animation effects are implemented using Framer Motion for smooth page transitions.
 */

// ========================== Import Statements ==========================

// Import core React library for JSX rendering
import React from 'react';

// Import motion component for animations
import { motion } from 'framer-motion';

// Import custom components used within this page
import ServicesLayout from '../component/ServicesLayout';
import Banner from '../component/Banner'; // ✅ Removed extra space
import CarouselComponent from '../component/CarouselComponent';

// Import banner images used for background visuals
import Banner1 from '/about/Social-Media-Infographics-in-Detail-1.jpg';
import Banner2 from '/about/Digital-Marketing-Services-banner.jpg';

// ========================== Component Declaration ==========================

/**
 * Home Component
 * Displays the main landing page content including banners, carousel, and services.
 */
const Home: React.FC = () => {
  return (
    <>
      {/* ====================== Page Fade-In Animation ====================== */}
      <motion.div
        initial={{ opacity: 0 }} // Start hidden
        animate={{ opacity: 1 }} // Fade in
        exit={{ opacity: 0 }} // Fade out on exit
        transition={{ duration: 0.6 }} // Smooth transition duration
        className="p-8"
      >

      {/* ====================== Page Content Section ====================== */}
      <div>
        {/* Carousel Section */}
        <CarouselComponent />

        {/* Top Banner Section */}
        <Banner
          title="Welcome to Visiomatix"
          subtitle="Innovating Vision with Technology"
          bgImage={Banner1}
        />

        {/* Services Layout Section */}
        <ServicesLayout />

        {/* Bottom Banner Section */}
        <Banner
          title="Crafting Digital Experiences"
          subtitle="Building beautiful, scalable, and secure web solutions"
          bgImage={Banner2}
          height="60vh"
        />
      </div>
      </motion.div>
    </>
  );
};

// ========================== Export Statement ==========================
export default Home;
