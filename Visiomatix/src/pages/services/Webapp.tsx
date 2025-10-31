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
import WebApp from "/services/icons/3-LIST/3-1 Web App Development.svg";
import WebsiteDesign from "/services/icons/3-LIST/3-2 Website Design & Development.svg";
import MobileApp from "/services/icons/3-LIST/3-3 Mobile App Development.svg";
import LandingPage from "/services/icons/3-LIST/3-4 Landing Page Optimization.svg";
import CustomWebSolutions from "/services/icons/3-LIST/3-5 Custom Web Solutions.svg";
import Banner from "/services/Banner/Web App Development-4.jpg";


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
            <section
              className="text-light py-5 position-relative"
              style={{
                backgroundImage: `url(${Banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* Grey transparent overlay for better text visibility */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  zIndex: 1
                }}
              />
              <div className="container text-center position-relative" style={{
                zIndex: 2,
                backgroundColor: "rgba(0, 40, 80, 0.45)",
                borderRadius: "12px",
                width:"90%",
                padding:"1em",
                backdropFilter: "blur(5px)",
              }}>
                 <motion.h1
                   className="display-4 fw-bold"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                 >
                   Web & App Development
                 </motion.h1>
                 <motion.p
                   className="lead"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                 >
                   Build fast, secure, and modern digital experiences that connect your brand with users worldwide.
                 </motion.p>
                 <motion.a
                   href="#services"
                   className="btn btn-light btn-lg mt-3"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.4 }}
                 >
                   Explore Services
                 </motion.a>
               </div>
            </section>

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
                      icon: WebApp,
                      title: "Web App Development",
                      text: "We develop scalable, high-performance web applications using modern frameworks and RESTful APIs for seamless user experiences.",
                    },
                    {
                      icon: WebsiteDesign,
                      title: "Website Design & Development",
                      text: "From static to dynamic and e-commerce sites, our team delivers custom-built websites optimized for speed and SEO.",
                    },
                    {
                      icon: MobileApp,
                      title: "Mobile App Development",
                      text: "Design and develop intuitive Android and iOS apps using React Native, Flutter, or native SDKs with responsive UI.",
                    },
                    {
                      icon: LandingPage,
                      title: "Landing Page Optimization",
                      text: "Boost conversion rates with optimized layouts, engaging visuals, and performance-driven landing pages.",
                    },
                    {
                      icon: CustomWebSolutions,
                      title: "Custom Web Solutions",
                      text: "Get tailor-made web solutions, dashboards, and integrations built around your workflow and business goals.",
                    },
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                      variants={cardVariant}
                    >
                      <motion.div
                        className="card h-100 border-0"
                        style={{
                          boxShadow: '0 4px 15px rgba(0, 25, 51, 0.3)',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                          width: '100%',
                          maxWidth: '350px',
                          minHeight: '300px'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{
                          y: -5,
                          boxShadow: '0 8px 25px rgba(7, 18, 31, 0.76)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="card-body text-center d-flex flex-column justify-content-center align-items-center"
                        style={{
                          height: '100%',
                          minHeight: '250px',
                          padding: '2rem 1rem'
                        }}>
                          <motion.img
                            src={card.icon}
                            alt={card.title}
                            className="mb-3"
                            style={{
                              width: '4em',
                              height: 'auto',
                              maxWidth: '80px'
                            }}
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                          <div >
                          <h5 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{card.title}</h5>
                          <p className="card-text text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{card.text}</p>
                          <motion.a
                            href="#"
                            className="btn btn-primary mt-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Learn More
                          </motion.a>
                          </div>
                        </div>
                      </motion.div>
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
