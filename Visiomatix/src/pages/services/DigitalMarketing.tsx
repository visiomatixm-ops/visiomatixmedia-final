// File: src/pages/DigitalMarketing.tsx
/**
 * @file DigitalMarketing.tsx
 * @description Digital Marketing Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
 * @framework Vite + SWC
 * @version 2.1.0
 * 
 * Structure:
 *  - Loader with fade-out
 *  - Helmet SEO + JSON-LD schema (LocalBusiness + Service)
 *  - Hero section
 *  - Content section (~250 words)
 *  - Services grid (animated)
 *  - Call-to-action section
 *  - Footer
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// ----------------------------------------------------
// Motion Variants
// ----------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// ----------------------------------------------------
// Component: DigitalMarketing
// ----------------------------------------------------
const DigitalMarketing: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Loader fade-out effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------
  // JSON-LD Structured Data (LocalBusiness + Service)
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BrandName Digital Marketing Agency",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/digital-marketing",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1234 Marketing Avenue",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "USA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/yourbrand",
      "https://www.instagram.com/yourbrand",
      "https://www.linkedin.com/company/yourbrand",
      "https://www.youtube.com/@yourbrand",
    ],
    description:
      "BrandName is a full-service Digital Marketing Agency specializing in SEO, SMM, PPC, and Content Marketing — helping businesses grow visibility, engagement, and ROI.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing Services",
    serviceType: "Digital Marketing",
    provider: {
      "@type": "Organization",
      name: "BrandName Digital Marketing Agency",
      url: "https://www.yourdomain.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "We provide comprehensive Digital Marketing services — including SEO, Social Media Marketing, Google Ads, Email Campaigns, Influencer Collaborations, Content Creation, Video Marketing, ORM, and Analytics Tracking.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "499",
    },
  };

  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Digital Marketing Services | Boost Your Brand Online</title>
        <meta
          name="description"
          content="Grow your brand with expert Digital Marketing — including Social Media Marketing (SMM), SEO, PPC, Email, Content, and Influencer Marketing. Drive leads, engagement, and measurable ROI."
        />
        <meta
          name="keywords"
          content="Digital Marketing, Social Media Marketing, SEO, PPC Campaigns, Google Ads, Email Marketing, Influencer Marketing, Video Marketing, Content Marketing, Online Reputation Management, ORM, E-commerce Marketing, Analytics"
        />
        <link
          rel="canonical"
          href="https://www.yourdomain.com/digital-marketing"
        />

        {/* Structured JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      {/* Loader */}
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="spinner-border text-light me-3" role="status" />
            <strong>Loading Digital Marketing Page...</strong>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            id="content"
            className="fade-in"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn}
          >
            {/* Hero Section */}
            <motion.header
              className="bg-primary text-white text-center py-5"
              variants={fadeInUp}
            >
              <div className="container">
                <h1 className="display-4 fw-bold">Digital Marketing Services</h1>
                <p className="lead">
                  Maximize your online presence through integrated strategies that convert traffic into loyal customers.
                </p>
                <motion.a
                  href="#services"
                  className="btn btn-light btn-lg mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Services
                </motion.a>
              </div>
            </motion.header>

            {/* Expanded Content Section */}
            <motion.section
              className="py-5 bg-light"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="container">
                <p className="lead text-muted text-center mx-auto" style={{ maxWidth: "850px" }}>
                  Our Digital Marketing solutions empower businesses to thrive in a competitive landscape. 
                  We combine creative storytelling, data-driven insights, and modern advertising strategies 
                  to help you reach, engage, and convert your audience effectively. Whether you need 
                  <strong> Social Media Marketing (SMM)</strong> campaigns that boost visibility, 
                  <strong> Search Engine Optimization (SEO)</strong> that improves rankings, or 
                  <strong> Pay-Per-Click (PPC)</strong> ads that deliver instant results, 
                  our team crafts solutions tailored to your goals.  
                  We also specialize in <strong>Email & Influencer Marketing</strong>, 
                  <strong> Content & Video Marketing</strong>, and 
                  <strong> Online Reputation Management (ORM)</strong> to maintain your brand’s credibility.  
                  For eCommerce, we implement conversion-focused <strong>E-commerce Marketing</strong> 
                  and use advanced <strong>Analytics & ROI Tracking</strong> to measure every action’s impact.  
                  Our holistic approach ensures your brand grows organically while achieving measurable success 
                  across every channel.
                </p>
              </div>
            </motion.section>

            {/* Services Section */}
            <section id="services" className="py-5">
              <motion.div
                className="container"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-center mb-4 fw-semibold">
                  Our Core Digital Marketing Services
                </h2>
                <div className="row g-4">
                  {[
                    {
                      icon: "bi bi-graph-up text-success",
                      title: "Search Engine Optimization (SEO)",
                      text: "Improve your organic rankings, drive traffic, and attract quality leads through strategic keyword optimization and content marketing.",
                      btnClass: "btn-outline-success",
                    },
                    {
                      icon: "bi bi-facebook text-primary",
                      title: "Social Media Marketing (SMM)",
                      text: "Engage audiences and grow your community across Facebook, Instagram, LinkedIn, and TikTok with impactful social campaigns.",
                      btnClass: "btn-outline-primary",
                    },
                    {
                      icon: "bi bi-currency-dollar text-warning",
                      title: "Google Ads & PPC Campaigns",
                      text: "Run high-converting paid campaigns that bring immediate visibility and measurable ROI with expert targeting and bid strategies.",
                      btnClass: "btn-outline-warning",
                    },
                    {
                      icon: "bi bi-envelope-paper text-info",
                      title: "Email & Influencer Marketing",
                      text: "Build trust and awareness with personalized email automation and influencer partnerships that resonate with your target audience.",
                      btnClass: "btn-outline-info",
                    },
                    {
                      icon: "bi bi-film text-danger",
                      title: "Content & Video Marketing",
                      text: "Tell your brand story through compelling visuals, educational blogs, and high-impact video content across all digital platforms.",
                      btnClass: "btn-outline-danger",
                    },
                    {
                      icon: "bi bi-star text-dark",
                      title: "Online Reputation Management (ORM)",
                      text: "Protect and enhance your brand’s credibility through proactive reputation monitoring and customer engagement strategies.",
                      btnClass: "btn-outline-dark",
                    },
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      className="col-md-4"
                      variants={cardVariant}
                    >
                      <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center">
                          <i
                            className={`${card.icon} display-5 mb-3`}
                            aria-hidden="true"
                          ></i>
                          <h5 className="card-title">{card.title}</h5>
                          <p className="card-text text-muted">{card.text}</p>
                          <a href="#" className={`btn ${card.btnClass}`}>
                            Learn More
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* CTA Section */}
            <motion.section
              className="bg-dark text-light text-center py-5"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="container">
                <h3 className="fw-bold mb-3">
                  Ready to Elevate Your Digital Presence?
                </h3>
                <p className="lead">
                  Let’s create a tailored marketing strategy that transforms your online goals into measurable success.
                </p>
                <motion.a
                  href="/contact"
                  className="btn btn-primary btn-lg mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DigitalMarketing;
