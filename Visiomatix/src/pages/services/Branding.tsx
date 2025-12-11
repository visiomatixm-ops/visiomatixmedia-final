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

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import BrandingIdentity from "/services/icons/6-LIST/BRANDING - Marketing Strategy & Funnel Planning.svg";
import MarketingStrategy from "/services/icons/6-LIST/BRANDING - Brand Identity & Positioning.svg";
import CampaignIdeation from "/services/icons/6-LIST/BRANDING - Campaign Ideation & Execution.svg";
import CompetitorResearch from "/services/icons/6-LIST/BRANDING - Competitor & Market Research.svg";
import Banner from "/services/Banner/Branding & Strategy Services-2.jpg";

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

  // ----------------------------------------------------
  // JSON-LD Schema: LocalBusiness + Service
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Visiomatix Branding & Strategy Agency",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/branding-strategy",
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
      "Visiomatix is a creative Branding & Strategy agency helping businesses establish strong brand identity, marketing strategy, and impactful campaign planning for growth.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding & Strategy Services",
    serviceType: "Brand Development, Strategy Planning, Campaign Execution",
    provider: {
      "@type": "Organization",
      name: "Visiomatix Branding & Strategy Agency",
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
          content="Shape your brand identity and marketing direction with Visiomatix’s Branding & Strategy services — covering brand positioning, market research, and campaign execution."
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

          <motion.div
            key="content"
            id="content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInUp}
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
              <div className="container text-center" style={{
                position: "relative",
                zIndex: 2,
                backgroundColor: "rgba(0, 40, 80, 0.45)",
                borderRadius: "12px",
                width:"90%",
                padding:"1em",
                backdropFilter: "blur(5px)",
                marginTop: '7rem',
              }}>
                <motion.h1
                  className="display-5 fw-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Branding & Strategy
                </motion.h1>
                <motion.p
                  className="lead mt-3 mx-auto text-sm sm:text-base md:text-lg"
                  style={{ maxWidth: "750px" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Build a brand that connects, communicates, and converts.
                  From identity to execution — we transform your business vision into a strong, market-ready brand presence.
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
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-dark text-center mx-auto text-sm sm:text-base md:text-lg" style={{ maxWidth: "850px" }}>
                  At Visiomatix, we craft powerful brand strategies that align creativity with data-driven insights.
                  Our experts analyze audience psychology, market behavior, and competitor dynamics to position your brand effectively.
                  We help define your Brand Identity & Positioning with clear differentiation, develop holistic
                   Marketing Strategies and conversion-driven Funnel Planning, and execute high-impact
                   Campaigns that deliver measurable growth.
                  Our in-depth Competitor & Market Research provides clarity and direction — enabling your brand to lead with confidence and creativity.
                </p>
              </div>
            </section>

            {/* Services Section */}
    {/* Services Section */}
<section id="services" className="py-5">
  <motion.div
    className="container"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <h2 className="text-center fw-semibold mb-5 text-sm sm:text-base md:text-lg lg:text-xl">
      Our Branding & Strategy Services
    </h2>

    <div className="row g-4">
      {[
        {
          icon: BrandingIdentity,
          title: "Brand Identity & Positioning",
          text: "Define how your audience perceives you — with visual identity, tone, and positioning that reflect your business values and vision.",
        },
        {
          icon: MarketingStrategy,
          title: "Marketing Strategy & Funnel Planning",
          text: "Develop data-backed strategies that optimize every stage of your customer journey — from awareness to conversion.",
        },
        {
          icon: CampaignIdeation,
          title: "Campaign Ideation & Execution",
          text: "Plan, create, and launch creative campaigns that boost brand visibility, engagement, and long-term customer loyalty.",
        },
        {
          icon: CompetitorResearch,
          title: "Competitor & Market Research",
          text: "Analyze market trends, study competitors, and identify opportunities to ensure your brand stays ahead of the curve.",
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          className="col-md-6 col-lg-6"
          variants={cardVariant}
        >
          <div className="card h-100 border-0 shadow-sm p-4 text-center">

            {/* ✅ ICON CENTER FIX ADDED HERE */}
            <div className="d-flex justify-content-center mb-3">
              <motion.img
                src={item.icon}
                alt={item.title}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: idx * 0.1,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -8, 8, -8, 0],
                  transition: {
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  },
                }}
              />
            </div>
            {/* ✅ END ICON BLOCK */}

            <h5 className="fw-bold text-sm sm:text-base md:text-lg">
              {item.title}
            </h5>
            <p className="text-muted text-sm sm:text-base">
              {item.text}
            </p>
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
                <h3 className="fw-bold mb-3 text-sm sm:text-base md:text-lg lg:text-xl">Ready to Build a Brand that Lasts?</h3>
                <p className="lead text-sm sm:text-base md:text-lg">
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
    </>
  );
};

export default Branding;
