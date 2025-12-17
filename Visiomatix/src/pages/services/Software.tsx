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

//import BusinessAutomation from "/services/icons/4-5 Business Automation Tools.svg";
import AIVoiceAssistant from "/services/icons/AI Voice Sales Assistant Integration.svg";
import CRMDevelopment from "/services/icons/CRM Development.svg";
import ERPDevelopment from "/services/icons/ERP Development.svg";
import HRMSDevelopment from "/services/icons/HRMS Development.svg";
import Banner from "/services/Banner/Business Software Expertise-2.jpg";


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

  // ----------------------------------------------------
  // JSON-LD Structured Data (LocalBusiness + Service)
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Visiomatix Business Software Solutions",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/software-development",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No. 03, Om Sai Apartment, Near Petrol Pump, Ganur Road",
      addressLocality: "Davkhar Nagar, Chandwad, Nashik",
      addressRegion: "Maharashtra",
      postalCode: "423101",
      addressCountry: "India",
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
      "Visiomatix delivers custom Business Software Solutions — including ERP, CRM, HRMS, and AI automation tools — to streamline operations and scale enterprise productivity.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Software Solutions",
    serviceType: "Software Development, Business Automation, ERP, CRM",
    provider: {
      "@type": "Organization",
      name: "Visiomatix Business Software Solutions",
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
            <section
              className="text-light py-5 position-relative"
              style={{
                backgroundImage: `url(${Banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"center",
              }}
            >
              {/* Grey transparent overlay for better text visibility */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: 'rgba(9, 23, 38, 0.71)',
                  zIndex: 1
                }}
              />
              {/* centered content*/}
              <div 
                className="container text-center d-flex flex-column justify-content-center align-items-center" 
                style={{
                zIndex: 2,
                backgroundColor: "rgba(0, 40, 80, 0.45)",
                borderRadius: "12px",
                width:"90%",
                padding:"2em",
                backdropFilter: "blur(5px)",
                minHeight:"60vh",
              }}
              >

                     <motion.h1
                       className="display-5 fw-bold text-white"
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8 }}
                     >
                       Business Software Solutions
                     </motion.h1>

                     <motion.p
                       className="lead mt-3 text-white"
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       style={{maxWidth:"750px"}}
                     >
                       Empower your enterprise with intelligent, automated, and data-driven software systems that redefine efficiency.
                     </motion.p>

                     <motion.a
                       href="#solutions"
                       className="btn btn-light btn-lg mt-3"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.4 }}
                     >
                       Explore Solutions
                     </motion.a>
                   </div>
                   </section>
                  
                   {/* Content Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-dark text-center mx-auto" style={{ maxWidth: "850px" }}>
                  At Visiomatix, we design and develop intelligent business software that integrates data, workflows, and decision-making into one seamless platform.
                  From ERP systems that unify operations to CRM platforms that enhance customer relationships,
                  we create technology that transforms productivity.
                  Our HRMS tools streamline workforce management, while our AI Voice Sales Assistants and Automation Tools empower teams with real-time insights and task automation.
                  Every solution we build is custom-engineered to improve performance, security, and scalability across industries.
                </p>
              </div>
            </section>

            {/* Alternating Service Section */}
            <section id="solutions" className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center fw-semibold mb-5">
      Our Business Software Expertise
    </h2>

    <div className="row justify-content-center">
      {[
        {
          title: "ERP Development",
          text:
            "We build robust Enterprise Resource Planning (ERP) systems that centralize inventory, finance, HR, and supply chain operations into one unified platform. Our ERP solutions are scalable, customizable, and seamlessly integrate with your existing systems.",
          icon: Diagram3,
        },
        {
          title: "CRM Development",
          text:
            "Our CRM solutions help manage customer data, automate sales processes, and optimize marketing funnels. We deliver intelligent systems that provide actionable insights, improve engagement, and drive long-term growth.",
          icon: People,
        },
        {
          title: "HRMS Development",
          text:
            "Simplify recruitment, payroll, attendance, and performance management with our secure cloud-based HRMS solutions designed to enhance workforce productivity and engagement.",
          icon: PersonWorkspace,
        },
        {
          title: "AI Voice Sales Assistant Integration",
          text:
            "Integrate AI-powered voice assistants to automate sales calls, qualify leads, and gain real-time conversation insights using NLP and machine learning.",
          icon: Robot,
        },
        {
          title: "Business Automation Tools",
          text:
            "Automate repetitive workflows with intelligent tools that connect departments, reduce errors, and boost operational efficiency across your organization.",
          icon: LightningCharge,
        },
      ].map((service, idx) => (
        <div key={idx} className="col-lg-4 col-md-6 mb-4">
          <motion.div
            className="card h-100 border-0 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              borderRadius: "14px",
              padding: "28px",
            }}
          >
            <h5 className="fw-bold mb-3 d-flex align-items-center">
              <service.icon className="me-2 text-primary" size={22} />
              {service.title}
            </h5>

                  <p className="text-dark mb-0" style={{ lineHeight: "1.7" }}>
                    {service.text}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
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
    </>
  );
};

export default Software;
