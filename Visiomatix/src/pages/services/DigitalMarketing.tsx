// File: src/pages/DigitalMarketing.tsx

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import SMM from "/services/icons/1-LIST/E - Analytics & ROI Tracking.svg";
import SEOIcon from "/services/icons/1-LIST/E - Content & Video Marketing.svg";
import PPC from "/services/icons/1-LIST/E - Email & Influencer Marketing.svg";
import EmailMarketing from "/services/icons/1-LIST/E - Google Ads & PPC Campaigns.svg";
import ContentMarketing from "/services/icons/1-LIST/E - Online Reputation Management (ORM).svg";
import ORM from "/services/icons/1-LIST/E - Social Media Marketing (SMM).svg";
import EcommerceMarketing from "/services/icons/1-LIST/E-commerce Marketing.svg";
import AnalyticsTracking from "/services/icons/1-LIST/SEO.svg";

import Banner from "/services/Banner/Digital Marketing Services-3.jpg";

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
  visible: { opacity: 1, y: 0, scale: 1 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};


// ----------------------------------------------------
// Component: DigitalMarketing
// ----------------------------------------------------
const DigitalMarketing: React.FC = () => {

  // ----------------------------------------------------
  // JSON-LD Structured Schema
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
      streetAddress: "Office No. 03, Om Sai Apartment, Near Petrol Pump, Ganur Road",
      addressLocality: "Davkhar Nagar, Chandwad, Nashik",
      addressRegion: "Maharashtra",
      postalCode: "423101",
      addressCountry: "India",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    }],
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
    areaServed: { "@type": "Country", name: "United States" },
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
      {/* SEO */}
      <Helmet>
        <title>Digital Marketing Services | Boost Your Brand Online</title>
        <meta
          name="description"
          content="Grow your brand with expert Digital Marketing — including SMM, SEO, PPC, Email, Content, and Influencer Marketing. Drive measurable ROI."
        />
        <link rel="canonical" href="https://www.yourdomain.com/digital-marketing" />

        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>


      {/* ================= HERO SECTION ================= */}
      <motion.div
        key="content"
        id="content"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeIn}
      >
        <section
          className="text-light py-5 position-relative"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            marginTop: "5rem"
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
          />

          <div
            className="container text-center position-relative"
            style={{
              zIndex: 2,
              backgroundColor: "rgba(0, 40, 80, 0.45)",
              borderRadius: "12px",
              width: "90%",
              padding: "1rem",
              backdropFilter: "blur(5px)",
            }}
          >
            <motion.h1
              className="display-4 fw-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Digital Marketing Services
            </motion.h1>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Maximize your online presence with high-impact, data-driven strategies.
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

        {/* ================= CONTENT SECTION ================= */}
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
              Our Digital Marketing solutions empower businesses to thrive in a competitive landscape. 
              We combine creative storytelling, data-driven insights, and modern advertising strategies 
              to help you reach, engage, and convert your audience effectively.
            </p>
          </div>
        </motion.section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="services" className="py-5">
          <motion.div
            className="container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-center mb-4 fw-semibold">
              Our Core Digital Marketing Services
            </h2>

            <div className="row g-4">
              {[
                { icon: SEOIcon, title: "SEO", text: "Improve rankings & organic traffic." },
                { icon: SMM, title: "SMM", text: "Grow your brand on social media." },
                { icon: PPC, title: "PPC Ads", text: "Instant leads & conversions." },
                { icon: EmailMarketing, title: "Email & Influencer Marketing", text: "Build trust & brand visibility." },
                { icon: ContentMarketing, title: "Content & Video Marketing", text: "High-quality engaging content." },
                { icon: ORM, title: "ORM", text: "Protect your online reputation." },
                { icon: EcommerceMarketing, title: "E-commerce Marketing", text: "Boost store sales & conversions." },
                { icon: AnalyticsTracking, title: "Analytics Tracking", text: "Measure ROI with precision." }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  variants={cardVariant}
                >
                  <motion.div
                    className="card h-100 border-0"
                    style={{
                      boxShadow: "0 4px 15px rgba(0, 25, 51, 0.3)",
                      background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                      width: "100%",
                      maxWidth: "350px",
                      minHeight: "300px",
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="card-body text-center d-flex flex-column"
                      style={{ padding: "2rem 1rem" }}
                    >

                      {/* ==== FIXED ICON WRAPPER ==== */}
                      <motion.div
                        className="icon-wrapper d-flex justify-content-center align-items-center mb-3"
                        style={{ width: "80px", height: "80px", margin: "0 auto" }}
                      >
                        <motion.img
                          src={card.icon}
                          alt={card.title}
                          style={{ width: "60px", height: "60px", objectFit: "contain" }}
                          whileHover={{ scale: 1.1 }}
                        />
                      </motion.div>

                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text text-muted">{card.text}</p>

                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= CTA ================= */}
        <motion.section
          className="bg-dark text-light text-center py-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container">
            <h3 className="fw-bold mb-3">Ready to Elevate Your Digital Presence?</h3>
            <p className="lead">
              Let’s create a strategy that transforms your online goals into measurable success.
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

export default DigitalMarketing;
