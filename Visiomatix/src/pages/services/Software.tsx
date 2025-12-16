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

import AIVoiceAssistant from "/services/businesssolutions/AI Voice Sales Assistant Integration-1.jpg";
import BusinessAutomation from "/services/businesssolutions/Business Automation Tools-1.jpg";
import CRMDevelopment from "/services/businesssolutions/CRM Development-1.jpg";
import ERPDevelopment from "/services/businesssolutions/ERP Development 1.jpg";
import HRMSDevelopment from "/services/businesssolutions/human resource management-1.jpg";
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
                  
                   {/* Expanded Content Section */}
            <motion.section
              className="py-5 bg-light"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
                ></motion.section>
                   <div className="col-md-6 text-center mt-4 mt-md-0">
                     {/* <motion.img
                       src="https://www.yourdomain.com/images/software-solutions-hero.svg"
                       alt="Business Software Solutions Illustration"
                       className="img-fluid rounded-3 shadow-sm"
                       initial={{ opacity: 0, x: 30 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8, delay: 0.6 }}
                     /> */}
                   </div>
                
              
        
            {/* Content Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-dark text-center mx-auto" style={{ maxWidth: "850px" }}>
                  At,we Visiomatix,we design and develop intelligent business software that integrates data, workflows, and decision-making into one seamless platform.
                  From ERP systems that unify operations to CRM platforms that enhance customer relationships,
                  we create technology that transforms productivity.
                  Our HRMS tools streamline workforce management, while our AI Voice Sales Assistants and Automation Tools empower teams with real-time insights and task automation.
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
                    text: "We build robust Enterprise Resource Planning (ERP) systems that centralize your business processes — from inventory and finance to HR and supply chain — into one unified platform.With a focus on scalability and customization, our ERP systems adapt to your business needs, whether you’re a startup or an enterprise. We integrate advanced features like automated reporting, analytics dashboards, and workflow management to help your teams work smarter and more efficiently Our expert developers ensure seamless integration with your existing software ecosystem, providing a smooth transition with minimal disruption.",
                    icon: Diagram3,
                    img: ERPDevelopment,
                    reverse: false,
                  },
                  {
                    title: "CRM Development",
                    text: "Our Customer Relationship Management (CRM) solutions help manage customer data, automate sales processes, and optimize marketing funnels to enhance retention and drive long-term growth. We design intelligent systems that enable your team to track leads, nurture relationships, and gain actionable insights into customer behavior With seamless integration across email, social media, and communication platforms, our CRM solutions ensure a unified view of every customer interaction. From automated follow-ups and lead scoring to real-time analytics and performance tracking, we empower your business to make data-driven decisions that strengthen customer engagement Whether you’re a small business looking to boost sales efficiency or a large enterprise aiming to personalize customer experiences, our custom-built CRM platforms are scalable, secure, and designed to grow with your business.",
                    icon: People,
                    img: CRMDevelopment,
                    reverse: true,
                  },
                  {
                    title: "HRMS Development",
                    text: "Simplify recruitment, attendance tracking, payroll, and performance evaluation with a secure, cloud-based HRMS system tailored to your organization Our HRMS solutions streamline recruitment, attendance, payroll, and performance management.Built on a secure, cloud-based platform for seamless accessibility and scalability Automate repetitive HR tasks to boost efficiency and accuracy across departments Empower your HR team with real-time insights and customizable dashboards Simplify workforce management while enhancing employee engagement and productivity Simplify workforce management while enhancing employee engagement and productivity.",
                    icon: PersonWorkspace,
                    img: HRMSDevelopment,
                    reverse: false,
                  },
                  {
                    title: "AI Voice Sales Assistant Integration",
                    text: "Integrate AI-powered voice assistants into your sales ecosystem for real-time conversation analysis, lead qualification, and smarter customer engagement. Our AI voice solutions help sales teams automate routine calls, capture insights from every interaction, and respond instantly to customer queries with human-like accuracy By leveraging natural language processing (NLP) and machine learning, these assistants can identify customer intent, recommend next steps, and provide instant access to product or service information. This not only improves response times but also enhances personalization and builds stronger client relationships Our systems seamlessly connect with your existing CRM and ERP platforms, ensuring a unified sales workflow.",
                    icon: Robot,
                    img: AIVoiceAssistant,
                    reverse: true,
                  },
                  {
                    title: "Business Automation Tools",
                    text: "Automate repetitive workflows using custom-built tools that connect departments, reduce manual errors, and boost operational productivity. Our automation solutions are designed to streamline complex processes, eliminate bottlenecks, and ensure seamless collaboration across your organization By integrating AI, analytics, and intelligent workflows, we help businesses save time, cut costs, and focus on strategic growth instead of manual tasks. From automated data entry and approvals to advanced reporting and notifications, our tools provide real-time visibility and control over daily operations Whether you need to optimize internal communication, manage resources efficiently, or ensure compliance through consistent processes, our end-to-end automation systems deliver accuracy, efficiency, and measurable results across every business function.",
                    icon: LightningCharge,
                    img: BusinessAutomation,
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
                    <motion.div
                      className="col-md-6 test-start"
                      style={{width:"500px", height:"500px"}}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <img
                        src={service.img}
                        alt={service.title}
                        className="img-fluid rounded-3 shadow-sm"
                        style={{ maxWidth: '500px', height: '500px' }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-md-6 rounded-3 shadow-sm "
                      style={{width:"500px", height:"500px"}}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <h4 className="fw-bold">
                        <service.icon className="me-2 text-primary " />
                        {service.title}
                      </h4>
                      <p className="text-dark mt-2">{service.text}</p>
                    </motion.div>
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
    </>
  );
};

export default Software;
