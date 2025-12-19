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

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Diagram3, People, PersonWorkspace, Robot, LightningCharge } from "react-bootstrap-icons";

import BusinessAutomation from "/services/icons/4-LIST/4-5 Business Automation Tools.svg";
import AIVoiceAssistant from "/services/icons/4-LIST/AI Voice Sales Assistant Integration.svg";
import CRMDevelopment from "/services/icons/4-LIST/CRM Development.svg";
import ERPDevelopment from "/services/icons/4-LIST/ERP Development.svg";
import HRMSDevelopment from "/services/icons/4-LIST/HRMS Development.svg";
import Banner from "/services/Banner/Business-Software-Expertise-2.jpg";



// ----------------------------------------------------
// Motion Variants-----animation part
// ----------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

{/*const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};*/}

// ----------------------------------------------------
// Component: Software
// ----------------------------------------------------
const Software: React.FC = () => {

  // ----------------------------------------------------
  // JSON-LD Structured Data (LocalBusiness + Service)
  // ----------------------------------------------------
 const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Visiomatix Business Software Solutions",
    description:
      "Custom ERP, CRM, HRMS, AI automation and enterprise software solutions.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
  };

  const services = [
    {
      title: "ERP Development",
      text:
        "Enterprise-grade ERP solutions integrating finance, inventory, HR, and operations into one scalable platform.",
      icon: Diagram3,
      img: ERPDevelopment,
      reverse: false,
    },
    {
      title: "CRM Development",
      text:
        "Powerful CRM platforms to manage customers, automate sales, and improve engagement with actionable insights.",
      icon: People,
      img: CRMDevelopment,
      reverse: true,
    },
    {
      title: "HRMS Development",
      text:
        "Cloud-based HRMS solutions for recruitment, payroll, attendance, and workforce analytics.",
      icon: PersonWorkspace,
      img: HRMSDevelopment,
      reverse: false,
    },
    {
      title: "AI Voice Sales Assistant",
      text:
        "AI-powered voice assistants to automate calls, qualify leads, and boost sales productivity.",
      icon: Robot,
      img: AIVoiceAssistant,
      reverse: true,
    },
    {
      title: "Business Automation Tools",
      text:
        "Custom automation tools that reduce manual work, eliminate errors, and optimize workflows.",
      icon: LightningCharge,
      img: BusinessAutomation,
      reverse: false,
    },
  ];

  return (
    <>
      {/* ---------------- SEO ---------------- */}
      <Helmet>
        <title>Business Software Solutions | ERP, CRM, HRMS & AI</title>
        <meta
          name="description"
          content="Enterprise software solutions including ERP, CRM, HRMS, AI automation and business process optimization."
        />
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>

      {/* ---------------- Hero Section ---------------- */}
      <section
        className="text-light d-flex align-items-center"
        style={{
         // backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          minHeight: "70vh",
          position: "relative",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ background: "rgba(9,23,38,0.7)" }}
        />
        <div className="container position-relative text-center">
          <motion.h1
            className="fw-bold"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Business Software Solutions
          </motion.h1>
          <p className="lead mt-3">
            Intelligent software systems that automate, scale, and empower your
            enterprise.
          </p>
          <a href="#solutions" className="btn btn-light btn-lg mt-3">
            Explore Solutions
          </a>
        </div>
      </section>

      {/* ---------------- Intro ---------------- */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <p className="lead text-dark mx-auto visiomatix-text" 
          style={{ maxWidth: "850px", 
          textAlign:"justify",
          lineHeight:"1.8"

          }}>
            Visiomatix delivers custom-built ERP, CRM, HRMS, AI automation, and
            enterprise software solutions designed to streamline operations,
            enhance productivity, and enable digital transformation.
          </p>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      {/* ---------------- Services ---------------- */}
<section id="solutions" className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center fw-bold mb-5">
      Our Business Software Expertise
    </h2>

    <div className="row g-4 justify-content-center">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="col-lg-4 col-md-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="card h-100 border-0 shadow-sm text-center p-4 service-card">
            
            <div className="mb-3">
              <img
                src={service.img}
                alt={service.title}
                style={{ width: "70px", height: "70px" }}
              />
            </div>

            <h5 className="fw-bold mb-2">
              {/*<service.icon className="me-2 text-primary" />-----this is for the icon of beofe the title */}
              {service.title}
            </h5>

            <p className="text-muted text-start">
              {service.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ---------------- CTA ---------------- */}
      <section className="bg-dark text-light text-center py-5">
        <div className="container">
          <h3 className="fw-bold">Transform Your Business with Smart Software</h3>
          <p className="lead mt-2">
            Let’s build scalable, secure, and intelligent solutions together.
          </p>
          <a href="/contact" className="btn btn-primary btn-lg mt-3">
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
};

export default Software;