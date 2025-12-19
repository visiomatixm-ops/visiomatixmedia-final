/**
 * @file Ecommerce.tsx
 * @description E-commerce Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion + Helmet + SEO JSON-LD Schema
 * @framework Vite + SWC
 * @version 2.1.0
 */

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import EcomWebApp from "/services/icons/5-LIST/5-1 E-commerce Website Development.svg";
import MarketplaceAdvertising from "/services/icons/5-LIST/5-2 Marketplace Advertising.svg";
import ProductListingOptimization from "/services/icons/5-LIST/5-3 PRODUCT LISTING ICON.svg";
import PaymentGatewayIntegration from "/services/icons/5-LIST/5-4 Payment Gateway Integration.svg";


// ---------------- Framer Motion Variants ----------------
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// ---------------- Component ----------------
const Ecommerce: React.FC = () => {
  const businessSchema = {};
  const serviceSchema = {};

  return (
    <>
    {/* ADD THIS INTERNAL STYLE BLOCK OR MOVE TO YOUR CSS FILE 
        to match the "Web App Development" card style 
      */}
      <style>{`
        .visiomatix-service-card {
          background: #fff;
          border-radius: 12px;
          padding: 40px 30px; /* Increased padding like Image 2 */
          text-align: center; /* Center everything */
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .service-description {
          color: #555;
          line-height: 1.6;
          font-size: 0.95rem;
          margin-top: 10px;
        }
      `}</style>


      {/* SEO */}
      <Helmet>
        <title>E-commerce Solutions | Online Store Development & Marketplace Advertising</title>
        <meta
          name="description"
          content="Launch your online business with Visiomatix’s E-commerce Solutions — custom online stores, marketplace advertising (Amazon, Flipkart), product listing optimization, and secure payment gateways."
        />
        <meta
          name="keywords"
          content="E-commerce Development, Marketplace Advertising, Amazon Ads, Flipkart Ads, Product Listing Optimization, Payment Gateway Integration, Shopify Development, WooCommerce, Magento"
        />
        <link rel="canonical" href="https://www.yourdomain.com/ecommerce-solutions" />

        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
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
        {/* ---------------- Hero Section ---------------- */}
        <section
          className="text-light py-5 position-relative"
          style={{
           // backgroundImage: `url(${Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="container position-relative d-flex justify-content-center text-center"
            style={{
              zIndex: 2,
              backgroundColor: "rgba(0, 40, 80, 0.45)",
              borderRadius: "12px",
              width: "90%",
              padding: "2em",
              backdropFilter: "blur(5px)",
              marginTop: "7rem",
            }}
          >
            <div className="col-md-8">
              <motion.h1
                className="display-5 fw-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                E-commerce Solutions
              </motion.h1>

              <motion.p
                className="lead mt-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Build, advertise, and scale your online store with powerful
                e-commerce technology and multi-marketplace growth strategies.
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
               Explore Solutions
              </motion.a>
            </div>
          </div>
        </section>

        {/* ---------------- Description ---------------- */}
        <section className="py-5 bg-light">
          <div className="container">
            <p
                className="lead text-dark mx-auto visiomatix-text"
                style={{ maxWidth: "850px",
                textAlign:"justify",
                lineHeight:"1.8"
               }}
            >
              With Visiomatix’s E-commerce Solutions, your online
              business gains modern design, smooth user experience, and deep
              marketplace integration. Whether it’s a Shopify,
               WooCommerce, or custom-built store, we
              deliver performance-driven results. Boost visibility with
              Amazon & Flipkart ads, optimized listings, and secure
              payment gateways.
            </p>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section id="services" className="py-5">
  <motion.div
    className="container"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <h2 className="text-center fw-semibold mb-5">
      Our E-commerce Services
    </h2>

    <div className="row g-4 justify-content-center">

      {[
        {
          title: "E-commerce Website Development",
          points: [
            "Custom Shopify & WooCommerce Stores",
            "Fast, Responsive UI",
            "Scalable Backend Architecture",
          ],
          icon: EcomWebApp,
        },
        {
          title: "Marketplace Advertising",
          points: [
            "Amazon Ads Management",
            "Flipkart Sponsored Campaigns",
            "ROI-focused PPC Strategy",
          ],
          icon: MarketplaceAdvertising,
        },
        {
          title: "Product Listing Optimization",
          points: [
            "SEO-rich Titles & Descriptions",
            "Keyword Optimization",
            "High Conversion Content",
          ],
          icon: ProductListingOptimization,
        },
        {
          title: "Payment Gateway Integration",
          points: [
            "Razorpay, Stripe & PayPal",
            "Secure Checkout Flow",
            "Multi-currency Support",
          ],
          icon: PaymentGatewayIntegration,
        },
      ].map((service, idx) => (
        <motion.div
          key={idx}
          className="col-12 col-md-6 col-lg-6"
          variants={cardVariant}
        >
          <div className="visiomatix-service-card h-100">

            {/* ICON */}
            <motion.img
                src={service.icon}
                alt={service.title}
                className="mb-4"
                style={{ width: "56px", height: "56px" }}
                whileHover={{ scale: 1.08 }}
              />

              <h5 className="fw-bold mb-3" 
              style={{ fontSize: "1.25rem" }}>
                {service.title}
              </h5>

              <ul className="list-unstyled text-start mx-auto mb-0">
                {service.points.map((point, i) => (
                  <li key={i} 
                  className="mb-1" 
                  style={{ fontSize: "0.92rem" }}>
                  
                     {point}
                  </li>
                ))}
              </ul>


          </div>
        </motion.div>
      ))}

    </div>
  </motion.div>
</section>


        {/* ---------------- CTA ---------------- */}
        <motion.section
          className="bg-dark text-light text-center py-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container">
            <h3 className="fw-bold mb-3">Launch Your E-commerce Business Today</h3>
            <p className="lead">
              Partner with us to build, optimize, and scale your online store.
            </p>
            <motion.a
              href="/contact"
              className="btn btn-primary btn-lg mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Ecommerce;
