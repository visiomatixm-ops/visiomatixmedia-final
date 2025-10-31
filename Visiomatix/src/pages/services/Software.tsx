/**
 * @file Software.tsx
 * @description Business Software Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
 * @framework Vite + SWC
 * @version 2.1.0
 * 
 * Structure:
 *  - Loader with fade-out
 *  - Helmet SEO + JSON-LD schema (LocalBusiness + Service)
 *  - Split Hero section (text + image)
 *  - Detailed content section (~250 words)
 *  - Alternating service layout (2-column)
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
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// ----------------------------------------------------
// Component: Software
// ----------------------------------------------------
const Software: React.FC = () => {
  const [loading, setLoading] = useState(true);

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
    name: "BrandName Business Software Solutions",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/software-development",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9012 Innovation Blvd",
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
      "https://www.linkedin.com/company/yourbrand",
      "https://www.instagram.com/yourbrand",
      "https://www.youtube.com/@yourbrand",
    ],
    description:
      "BrandName delivers custom Business Software Solutions — including ERP, CRM, HRMS, and AI automation tools — to streamline operations and scale enterprise productivity.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Software Solutions",
    serviceType: "Software Development, Business Automation, ERP, CRM",
    provider: {
      "@type": "Organization",
      name: "BrandName Business Software Solutions",
      url: "https://www.yourdomain.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "We specialize in enterprise-grade software solutions — from ERP, CRM, and HRMS platforms to AI-powered automation tools and intelligent sales assistants.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "1499",
    },
  };

  // ----------------------------------------------------
  // JSX Layout
  // ----------------------------------------------------
  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Business Software Solutions | ERP, CRM, HRMS & AI Automation</title>
        <meta
          name="description"
          content="Custom Business Software Solutions — ERP, CRM, HRMS, AI Voice Sales Assistants, and automation tools designed to streamline workflows and accelerate business growth."
        />
        <meta
          name="keywords"
          content="ERP Development, CRM Development, HRMS Software, Business Automation, AI Voice Assistant, Custom Software, Enterprise Software Development, Process Automation, Digital Transformation"
        />
        <link
          rel="canonical"
          href="https://www.yourdomain.com/software-development"
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
            <strong>Loading Software Solutions Page...</strong>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            id="content"
            className="fade-in"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInUp}
          >
            {/* Split Hero Section */}
            <section className="bg-primary text-light py-5">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h1 className="display-5 fw-bold">
                      Business Software Solutions
                    </h1>
                    <p className="lead mt-3">
                      Empower your enterprise with intelligent, automated, and data-driven software systems that redefine efficiency.
                    </p>
                    <motion.a
                      href="#solutions"
                      className="btn btn-light btn-lg mt-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Solutions
                    </motion.a>
                  </div>
                  <div className="col-md-6 text-center mt-4 mt-md-0">
                    <img
                      src="https://www.yourdomain.com/images/software-solutions-hero.svg"
                      alt="Business Software Solutions Illustration"
                      className="img-fluid rounded-3 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Content Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-muted text-center mx-auto" style={{ maxWidth: "850px" }}>
                  At <strong>BrandName</strong>, we design and develop intelligent business software that integrates data, workflows, and decision-making into one seamless platform.
                  From <strong>ERP systems</strong> that unify operations to <strong>CRM platforms</strong> that enhance customer relationships,
                  we create technology that transforms productivity.
                  Our <strong>HRMS tools</strong> streamline workforce management, while our <strong>AI Voice Sales Assistants</strong> and <strong>Automation Tools</strong> empower teams with real-time insights and task automation.
                  Every solution we build is custom-engineered to improve performance, security, and scalability across industries.
                </p>
              </div>
            </section>

            {/* Alternating Service Section */}
            <section id="solutions" className="py-5">
              <motion.div
                className="container"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-center fw-semibold mb-5">
                  Our Business Software Expertise
                </h2>

                {[
                  {
                    title: "ERP Development",
                    text: "We build robust Enterprise Resource Planning (ERP) systems that centralize your business processes — from inventory and finance to HR and supply chain — into one unified platform.",
                    icon: "bi bi-diagram-3 text-primary",
                    img: "https://www.yourdomain.com/images/erp-development.svg",
                    reverse: false,
                  },
                  {
                    title: "CRM Development",
                    text: "Our CRM solutions help manage customer data, automate sales, and optimize marketing funnels to enhance retention and drive long-term growth.",
                    icon: "bi bi-people text-success",
                    img: "https://www.yourdomain.com/images/crm-development.svg",
                    reverse: true,
                  },
                  {
                    title: "HRMS Development",
                    text: "Simplify recruitment, attendance tracking, payroll, and performance evaluation with a secure, cloud-based HRMS system tailored to your organization.",
                    icon: "bi bi-person-workspace text-warning",
                    img: "https://www.yourdomain.com/images/hrms-development.svg",
                    reverse: false,
                  },
                  {
                    title: "AI Voice Sales Assistant Integration",
                    text: "Integrate AI-powered voice assistants into your sales ecosystem for real-time conversation analysis, lead qualification, and smarter customer engagement.",
                    icon: "bi bi-robot text-info",
                    img: "https://www.yourdomain.com/images/ai-voice-assistant.svg",
                    reverse: true,
                  },
                  {
                    title: "Business Automation Tools",
                    text: "Automate repetitive workflows using custom-built tools that connect departments, reduce manual errors, and boost operational productivity.",
                    icon: "bi bi-lightning-charge text-danger",
                    img: "https://www.yourdomain.com/images/business-automation.svg",
                    reverse: false,
                  },
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    className={`row align-items-center mb-5 ${
                      service.reverse ? "flex-row-reverse" : ""
                    }`}
                    variants={cardVariant}
                  >
                    <div className="col-md-6 mb-4 mb-md-0">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="img-fluid rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="fw-bold">
                        <i className={`${service.icon} me-2`}></i>
                        {service.title}
                      </h4>
                      <p className="text-muted mt-2">{service.text}</p>
                    </div>
                  </motion.div>
                ))}
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
                  Transform Your Business with Smart Software
                </h3>
                <p className="lead">
                  Let’s build enterprise-grade solutions that automate, scale, and empower your operations.
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

export default Software;
