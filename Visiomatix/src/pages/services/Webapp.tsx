/**
 * @file Webapp.tsx
 * @description Web & App Development Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
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
// Component: Webapp
// ----------------------------------------------------
const Webapp: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Loader fade-out
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
    name: "BrandName Web & App Development Agency",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/web-app-development",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5678 Developer Drive",
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
      "BrandName specializes in custom Web & App Development — including responsive web apps, e-commerce solutions, and mobile app design for businesses of all sizes.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web & App Development Services",
    serviceType: "Web Development, App Development",
    provider: {
      "@type": "Organization",
      name: "BrandName Web & App Development Agency",
      url: "https://www.yourdomain.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "We provide full-cycle Web & App Development services — including front-end, back-end, mobile apps, landing page optimization, and e-commerce platforms using modern technologies.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "799",
    },
  };

  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------
  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Web & App Development | Build Fast, Scalable, and Modern Solutions</title>
        <meta
          name="description"
          content="Professional Web & App Development — Custom websites, e-commerce stores, web apps, and mobile applications. We design fast, scalable, and SEO-friendly solutions for modern businesses."
        />
        <meta
          name="keywords"
          content="Web Development, App Development, Web Design, Mobile Apps, E-commerce Development, Frontend Development, Backend Development, Landing Page Optimization, Full Stack Development, Custom Web Solutions"
        />
        <link
          rel="canonical"
          href="https://www.yourdomain.com/web-app-development"
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
            <strong>Loading Web & App Development Page...</strong>
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
                <h1 className="display-4 fw-bold">Web & App Development</h1>
                <p className="lead">
                  Build fast, secure, and modern digital experiences that connect your brand with users worldwide.
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

            {/* Content Section */}
            <motion.section
              className="py-5 bg-light"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="container">
                <p
                  className="lead text-muted text-center mx-auto"
                  style={{ maxWidth: "850px" }}
                >
                  At <strong>BrandName</strong>, we craft high-performance digital products that scale seamlessly
                  across devices and platforms. Our expertise covers full-stack <strong>Web App Development</strong>,
                  <strong> responsive Website Design</strong>, and <strong> Mobile App Development</strong> built with
                  modern frameworks for optimal performance.  
                  We create <strong>Landing Pages</strong> that convert and integrate custom backend systems for
                  <strong> E-commerce</strong> and enterprise solutions.  
                  Each project combines intuitive UI/UX design, secure architecture, and data-driven insights to ensure
                  your digital presence delivers measurable business impact.
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
                  Our Web & App Development Services
                </h2>
                <div className="row g-4">
                  {[
                    {
                      icon: "bi bi-window-stack text-primary",
                      title: "Web App Development",
                      text: "We develop scalable, high-performance web applications using modern frameworks and RESTful APIs for seamless user experiences.",
                      btnClass: "btn-outline-primary",
                    },
                    {
                      icon: "bi bi-laptop text-success",
                      title: "Website Design & Development",
                      text: "From static to dynamic and e-commerce sites, our team delivers custom-built websites optimized for speed and SEO.",
                      btnClass: "btn-outline-success",
                    },
                    {
                      icon: "bi bi-phone text-warning",
                      title: "Mobile App Development",
                      text: "Design and develop intuitive Android and iOS apps using React Native, Flutter, or native SDKs with responsive UI.",
                      btnClass: "btn-outline-warning",
                    },
                    {
                      icon: "bi bi-bullseye text-info",
                      title: "Landing Page Optimization",
                      text: "Boost conversion rates with optimized layouts, engaging visuals, and performance-driven landing pages.",
                      btnClass: "btn-outline-info",
                    },
                    {
                      icon: "bi bi-code-slash text-danger",
                      title: "Custom Web Solutions",
                      text: "Get tailor-made web solutions, dashboards, and integrations built around your workflow and business goals.",
                      btnClass: "btn-outline-danger",
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
                  Ready to Build Your Next Digital Product?
                </h3>
                <p className="lead">
                  Partner with our experts to design, develop, and launch powerful web and mobile solutions tailored for growth.
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

export default Webapp;
