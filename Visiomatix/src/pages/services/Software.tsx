/**
 * @file Software.tsx
 * @description Business Software Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
 * @framework Vite + SWC
 * @version 2.3.3
 *
 * Layout & Styling:
 *  - Hero section with overlay and centered text
 *  - Services grid with cards (shadow, hover effect, maxWidth 350px)
 *  - Icons and titles centered inside cards
 *  - CTA section with dark background
 */

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// ---------------- Public SVG Icon Paths ----------------
const ERPIcon = "/services/icons/4-LIST/ERP Development.svg";
const CRMIcon = "/services/icons/4-LIST/CRM Development.svg";
const HRMSIcon = "/services/icons/4-LIST/HRMS Development.svg";
const AIVoiceIcon = "/services/icons/4-LIST/AI-Voice-Sales-Assistant.svg";
const AutomationIcon = "/services/icons/4-LIST/Business-Automation.svg";


const Banner = "/services/Banner/Business Software Expertise-2.jpg";

// ---------------- Framer Motion Variants ----------------
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } } };
const cardVariant = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

// ---------------- Component: Software ----------------
const Software: React.FC = () => {
  const services = [
    { title: "ERP Development", icon: ERPIcon, text: "Centralized ERP systems for finance, HR, inventory, and supply chain." },
    { title: "CRM Development", icon: CRMIcon, text: "CRM platforms to manage leads, sales automation and customer insights." },
    { title: "HRMS Development", icon: HRMSIcon, text: "Cloud-based HRMS for payroll, recruitment and performance tracking." },
    { title: "AI Voice Sales Assistant", icon: AIVoiceIcon, text: "AI-powered voice assistants for sales automation and lead qualification." },
    { title: "Business Automation Tools", icon: AutomationIcon, text: "Workflow automation tools to eliminate manual operations." },
  ];

  return (
    <>
      <Helmet>
        <title>Business Software Solutions | ERP, CRM, HRMS & AI Automation</title>
        <meta
          name="description"
          content="Visiomatix delivers intelligent business software solutions including ERP, CRM, HRMS, AI Voice Assistants, and Automation Tools. Transform your operations and boost productivity."
        />
      </Helmet>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {/* ================= HERO ================= */}
        <section
          className="text-light py-5 position-relative"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
          <div className="container text-center position-relative" style={{ zIndex: 2 }}>
            <h1 className="display-4 fw-bold">Business Software Solutions</h1>
            <p className="lead">
              Empower your enterprise with intelligent, automated, and data-driven software systems that redefine efficiency.
            </p>
            <a href="#services" className="btn btn-light btn-lg mt-3">Explore Solutions</a>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="py-5">
          <motion.div className="container" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-center mb-4 fw-semibold">Our Business Software Expertise</h2>

            <div className="row g-4 justify-content-center">
              {services.map((service, idx) => (
                <motion.div key={idx} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center" variants={cardVariant}>
                  <motion.div
                    className="card h-100 border-0 text-center"
                    style={{
                      boxShadow: "0 4px 15px rgba(0,25,51,0.3)",
                      maxWidth: 350,
                      padding: "2rem 1rem",
                    }}
                    whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(7,18,31,0.76)" }}
                  >
                    <div className="d-flex justify-content-center mb-3">
                      <motion.img
                        src={service.icon}
                        alt={service.title}
                        style={{ width: "60px", height: "60px", objectFit: "contain" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <h5 className="fw-bold">{service.title}</h5>
                    <p className="text-dark text-start" style={{ fontSize: "0.9rem" }}>
                      {service.text}
                    </p>

                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-dark text-light text-center py-5">
          <div className="container">
            <h3 className="fw-bold">Transform Your Business with Smart Software</h3>
            <p className="lead">Let’s build enterprise-grade solutions that automate, scale, and empower your operations.</p>
            <a href="/contact" className="btn btn-primary btn-lg mt-3">Get in Touch</a>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Software;
