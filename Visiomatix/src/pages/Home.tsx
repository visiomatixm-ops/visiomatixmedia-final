/**
 * ===========================================================
 * File: src/pages/Home.tsx
 * Author: Viral Prajapati
 * Date: 12-Oct-2025
 * Description:
 *  This is the Home page of the Visiomatix website.
 *  It includes a carousel slider, multiple banner sections, and the services layout.
 *  Animation effects are implemented using Framer Motion for smooth page transitions.
 *  SEO content and meta tags are optimized for search ranking and social media previews.
 * ===========================================================
 */

// ========================== Import Statements ==========================
// Import core React library for JSX rendering
import React from 'react';
// Import Helmet for managing document head (SEO metadata)
import { Helmet } from 'react-helmet-async';
// Import motion component for animation effects
import { motion } from 'framer-motion';
// Import custom UI components used on this page
import ServicesLayout from '../component/ServicesLayout';
import Banner from '../component/Banner';
import CarouselComponent from '../component/CarouselComponent';
// Import banner images for background visuals
import Banner1 from '/about/Social-Media-Infographics-in-Detail-1.jpg';
import Banner2 from '/about/Digital-Marketing-Services-banner.jpg';

// ========================== Component Declaration ==========================
/**
 * Home Component
 * Displays the main landing page including:
 *  - Hero carousel section
 *  - Company introduction banners
 *  - Services overview section
 *  Designed for high user engagement, SEO optimization, and smooth user experience.
 */
const Home: React.FC = () => {
  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Visiomatix",
    "url": "https://visiomatix.com",
    "logo": "https://visiomatix.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/visiomatix",
      "https://www.twitter.com/visiomatix",
      "https://www.linkedin.com/company/visiomatix"
    ],
    "description":
      "Visiomatix is a technology-driven digital marketing and web development company that helps brands grow through innovation, strategy, and design.",
  };

  return (
    <>
      {/* ====================== SEO Metadata Section ====================== */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>Visiomatix | Digital Marketing & Web Development Company</title>
        <meta
          name="description"
          content="Visiomatix empowers businesses with innovative digital marketing, web development, SEO, and creative technology solutions designed to boost brand visibility, engagement, and growth."
        />
        <meta
          name="keywords"
          content="Visiomatix, digital marketing agency, web development company, SEO services, creative design, branding agency, social media strategy, technology consulting, app development, web design India"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.visiomatix.com/" />

        {/* Open Graph Tags for Social Media (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Visiomatix | Digital Marketing & Web Development Company" />
        <meta
          property="og:description"
          content="Crafting impactful digital experiences with innovative design, scalable technology, and data-driven marketing strategies for businesses worldwide."
        />
        <meta property="og:url" content="https://www.visiomatix.com/" />
        <meta
          property="og:image"
          content="https://www.visiomatix.com/about/Digital-Marketing-Services-banner.jpg"
        />
        <meta property="og:site_name" content="Visiomatix" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Visiomatix | Transforming Ideas into Digital Success"
        />
        <meta
          name="twitter:description"
          content="Experience the power of design, strategy, and technology with Visiomatix — your partner in digital transformation."
        />
        <meta
          name="twitter:image"
          content="https://www.visiomatix.com/about/Digital-Marketing-Services-banner.jpg"
        />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* ====================== Page Fade-In Animation ====================== */}
      <motion.div
        initial={{ opacity: 0 }} // Start hidden
        animate={{ opacity: 1 }} // Fade in on mount
        exit={{ opacity: 0 }} // Fade out on route change
        transition={{ duration: 0.6 }} // Smooth transition timing
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
            description="At Visiomatix, we redefine digital transformation by merging creativity with technology. Our expert team delivers end-to-end solutions — from digital marketing and web design to SEO and branding — helping your business stand out and thrive in the modern digital landscape."
            bgImage={Banner1}
          />

          {/* Services Layout Section */}
          <ServicesLayout />

          {/* Bottom Banner Section */}
          <Banner
            title="Crafting Digital Experiences"
            subtitle="Building Beautiful, Scalable, and Secure Web Solutions"
            description="We go beyond building websites — we create digital ecosystems that engage users and empower growth. With cutting-edge design, robust engineering, and data-driven strategy, Visiomatix delivers seamless online experiences that elevate your brand."
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
