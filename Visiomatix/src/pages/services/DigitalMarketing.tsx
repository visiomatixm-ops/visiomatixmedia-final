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
      "We provide comprehensive Digital Marketing services including SEO, Social Media Marketing, Google Ads, Email Campaigns, Influencer Collaborations, Content Creation, Video Marketing, ORM, and Analytics Tracking.",
  };

  const services = [
    {
      icon: SEOIcon,
      title: "SEO",
      // text: "Improve rankings & organic traffic.",
      description:
        "We enhance your website with keyword research, on-page optimization, technical SEO, and link building to drive sustainable organic growth Keyword research & competitor analysis High-authority backlink building.",
    },
    {
      icon: SMM,
      title: "SMM",
      // text: "Grow your brand on social media.",
      description:
        "Our social media campaigns increase engagement, followers, and brand awareness across platforms like Instagram, Facebook, and LinkedIn Social media strategy & content planning Creative posts.",
    },
    {
      icon: PPC,
      title: "PPC Ads",
      // text: "Instant leads & conversions.",
      description:
        "Instant leads & conversions we manage data-driven Google Ads and paid campaigns focused on high-intent traffic, conversions, and maximum ROI Google Search & Display Ads Keyword bidding & ad copy optimization.",
    },
    {
      icon: EmailMarketing,
      title: "Email & Influencer Marketing",
      // text: "Build trust & brand visibility.",
      description:
        "Build trust & brand visibility from automated email funnels to influencer partnerships, we nurture leads and amplify your brand’s credibility Email campaign design & automation.",
    },
    {
      icon: ContentMarketing,
      title: "Content & Video Marketing",
      // text: "High-quality engaging content.",
      description:
        "High-quality engaging content we create blogs, videos, and creative assets that educate, engage, and convert audiences across digital channels SEO-optimized blogs & articles.",
    },
    {
      icon: ORM,
      title: "ORM",
      // text: "Protect your online reputation.",
      description:
        "Protect your online reputation our ORM solutions monitor reviews, manage customer feedback, and strengthen your brand image online Review monitoring & response management.",
    },
    {
      icon: EcommerceMarketing,
      title: "E-commerce Marketing",
      // text: "Boost store sales & conversions.",
      description:
        "Boost store sales & conversions we optimize product listings, funnels, and paid ads to increase sales, retention, and average order value Product listing optimization.",
    },
    {
      icon: AnalyticsTracking,
      title: "Analytics Tracking",
      // text: "Measure ROI with precision.",
      description:
        "Measure ROI with precision advanced analytics, dashboards, and reporting give you complete visibility into campaign performance and ROI Google Analytics & GA4 setup.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing Services | Boost Your Brand Online</title>
        <meta
          name="description"
          content="Grow your brand with expert Digital Marketing — including SMM, SEO, PPC, Email, Content, and Influencer Marketing. Drive measurable ROI."
        />
        <link rel="canonical" href="https://www.yourdomain.com/digital-marketing" />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
            marginTop: "5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
          <div className="container text-center position-relative" 
          style={{ zIndex: 2 }}>
            <h1 className="display-4 fw-bold">Digital Marketing Services</h1>
            <p className="lead">Maximize your online presence with data-driven strategies.</p>
            <a href="#services" className="btn btn-light btn-lg mt-3">Explore Services</a>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="py-5">
  <motion.div 
    className="container" 
    variants={staggerContainer} 
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: true }}
  >
    <h2 className="text-center mb-5 fw-semibold">Our Core Digital Marketing Services</h2>
    <div className="row g-4">
      {services.map((card, idx) => (
        <motion.div 
          key={idx} 
          className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" 
          variants={cardVariant}
        >
          <motion.div 
            className="card h-100 border-0 rounded-4" 
            style={{ 
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)", 
              maxWidth: 350,
              backgroundColor: "#fff" 
            }} 
            whileHover={{ y: -8 }}
          >
            <div className="card-body text-center d-flex flex-column p-4">
              {/* ICON */}
              <div className="mb-3 d-flex justify-content-center align-items-center"
               style={{ height: "80px" }}>
                <img src={card.icon} 
                alt={card.title} 
                style={{ width: 60, height: "auto" }} />
              </div>

              {/* TITLE */}
              <h5 className="fw-bold mb-3">{card.title}</h5>

              {/* DESCRIPTION - Corrected Alignment */}
              <p 
                className="mb-0 text-start" 
                style={{ 
                  fontSize: "0.92rem", 
                  color: "#555",
                  textAlign: "center", // This centers the text block like your goal image
                  lineHeight: "1.6",    // Adds breathing room between lines
                  wordSpacing: "-0.5px" // Makes the text look tighter and cleaner
                }}
              >
                {card.description}
              </p> 
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

        {/* ================= CTA ================= */}
        <section
            className="d-flex align-items-center text-center"
            style={{
               backgroundColor: "#ffffff",
             // backgroundImage:
                //"url('/about/Blur images/web & app dev.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "320px",
              position: "relative",
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#1D3458",
                opacity: 0.85,
                zIndex: 1,
              }}
            ></div>

            {/* Content */}
            <div
              className="container position-relative text-white"
              style={{ zIndex: 2 }}
            >
             <h3
                className="fw-bold mb-3"
                style={{ color: "#000000" }}
              >
                Ready to Elevate Your Digital Presence?
              </h3>

              <p
                className="lead mb-4"
                style={{ color: "#000000" }}
              >
                Let’s create a strategy that drives measurable success.
              </p>

              <a
                  href="/contact"
                  className="btn btn-lg px-4"
                  style={{
                    backgroundColor: "#1D3458",
                    color: "#ffffff",
                    border: "1px solid #1D3458",
                  }}
                >
                  Get in Touch
                </a>

            </div>
          </section>

      </motion.div>
    </>
  );
};

export default DigitalMarketing;