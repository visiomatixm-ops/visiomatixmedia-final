/**
 * @file Branding.tsx
 * @description Branding & Strategy Page — React + TypeScript + Bootstrap 5 + Framer Motion + Helmet + JSON-LD Schema
 * @framework Vite + SWC
 * @version 2.1.0
 *
 * Layout:
 *  - Animated Loader
 *  - Helmet SEO (LocalBusiness + Service Schema)
 *  - Gradient Hero Section with Abstract Visuals
 *  - Informative Content (~250 words)
 *  - Strategic Services Grid
 *  - CTA Section
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// ----------------------------------------------------
// Framer Motion Variants
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// ----------------------------------------------------
// Component: Branding
// ----------------------------------------------------
const Branding: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------
  // JSON-LD Schema: LocalBusiness + Service
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BrandName Branding & Strategy Agency",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/branding-strategy",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2345 Strategy Blvd",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "USA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
      "BrandName is a creative Branding & Strategy agency helping businesses establish strong brand identity, marketing strategy, and impactful campaign planning for growth.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding & Strategy Services",
    serviceType: "Brand Development, Strategy Planning, Campaign Execution",
    provider: {
      "@type": "Organization",
      name: "BrandName Branding & Strategy Agency",
      url: "https://www.yourdomain.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "We provide end-to-end Branding and Strategy services — including Brand Identity, Positioning, Market Research, Campaign Planning, and Funnel Optimization.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "699",
    },
  };

  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------
  return (
    <>
      <Helmet>
        <title>Branding & Strategy | Brand Identity, Marketing & Campaign Planning</title>
        <meta
          name="description"
          content="Shape your brand identity and marketing direction with BrandName’s Branding & Strategy services — covering brand positioning, market research, and campaign execution."
        />
        <meta
          name="keywords"
          content="Branding Agency, Brand Identity, Marketing Strategy, Brand Positioning, Campaign Planning, Funnel Strategy, Competitor Research, Market Analysis, Brand Consulting"
        />
        <link
          rel="canonical"
          href="https://www.yourdomain.com/branding-strategy"
        />
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
            <strong>Loading Branding & Strategy...</strong>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            id="content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInUp}
          >
            {/* Hero Section */}
            <section className="bg-gradient text-light py-5" style={{ background: "linear-gradient(120deg, #0d6efd, #6610f2)" }}>
              <div className="container text-center">
                <h1 className="display-5 fw-bold">Branding & Strategy</h1>
                <p className="lead mt-3 mx-auto" style={{ maxWidth: "750px" }}>
                  Build a brand that connects, communicates, and converts.  
                  From identity to execution — we transform your business vision into a strong, market-ready brand presence.
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
            </section>

            {/* Content Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-muted text-center mx-auto" style={{ maxWidth: "850px" }}>
                  At <strong>BrandName</strong>, we craft powerful brand strategies that align creativity with data-driven insights.  
                  Our experts analyze audience psychology, market behavior, and competitor dynamics to position your brand effectively.  
                  We help define your <strong>Brand Identity & Positioning</strong> with clear differentiation, develop holistic  
                  <strong> Marketing Strategies</strong> and conversion-driven <strong>Funnel Planning</strong>, and execute high-impact  
                  <strong> Campaigns</strong> that deliver measurable growth.  
                  Our in-depth <strong>Competitor & Market Research</strong> provides clarity and direction — enabling your brand to lead with confidence and creativity.
                </p>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-5">
              <motion.div
                className="container"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-center fw-semibold mb-5">Our Branding & Strategy Services</h2>
                <div className="row g-4">
                  {[
                    {
                      icon: "bi bi-badge-ad text-primary",
                      title: "Brand Identity & Positioning",
                      text: "Define how your audience perceives you — with visual identity, tone, and positioning that reflect your business values and vision.",
                    },
                    {
                      icon: "bi bi-bar-chart-line text-success",
                      title: "Marketing Strategy & Funnel Planning",
                      text: "Develop data-backed strategies that optimize every stage of your customer journey — from awareness to conversion.",
                    },
                    {
                      icon: "bi bi-megaphone text-warning",
                      title: "Campaign Ideation & Execution",
                      text: "Plan, create, and launch creative campaigns that boost brand visibility, engagement, and long-term customer loyalty.",
                    },
                    {
                      icon: "bi bi-search text-danger",
                      title: "Competitor & Market Research",
                      text: "Analyze market trends, study competitors, and identify opportunities to ensure your brand stays ahead of the curve.",
                    },
                  ].map((item, idx) => (
                    <motion.div key={idx} className="col-md-6 col-lg-6" variants={cardVariant}>
                      <div className="card h-100 border-0 shadow-sm p-4">
                        <i className={`${item.icon} display-5 mb-3`}></i>
                        <h5 className="fw-bold">{item.title}</h5>
                        <p className="text-muted">{item.text}</p>
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
                <h3 className="fw-bold mb-3">Ready to Build a Brand that Lasts?</h3>
                <p className="lead">
                  Partner with us to create a strategy that defines your identity and drives business growth.
                </p>
                <motion.a
                  href="/contact"
                  className="btn btn-primary btn-lg mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let’s Begin
                </motion.a>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Branding;
