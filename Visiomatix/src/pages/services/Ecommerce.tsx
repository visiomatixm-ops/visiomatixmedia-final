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
import Banner from "/services/Banner/E-commerce Services with minimal illustration not more and not low-4.jpg";

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
  const businessSchema = { /* unchanged JSON-LD */ };
  const serviceSchema = { /* unchanged JSON-LD */ };

  return (
    <>
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
            backgroundImage: `url(${Banner})`,
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
                Discover More
              </motion.a>
            </div>
          </div>
        </section>

        {/* ---------------- Description ---------------- */}
        <section className="py-5 bg-light">
          <div className="container">
            <p
              className="lead text-muted text-center mx-auto"
              style={{ maxWidth: "850px" }}
            >
              With <strong>Visiomatix’s E-commerce Solutions</strong>, your online
              business gains modern design, smooth user experience, and deep
              marketplace integration. Whether it’s a <strong>Shopify</strong>,
              <strong> WooCommerce,</strong> or <strong>custom-built</strong> store, we
              deliver performance-driven results. Boost visibility with
              <strong> Amazon & Flipkart ads,</strong> optimized listings, and secure
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

            <div className="row g-4">
              {[
                {
                  title: "E-commerce Website Development",
                  text: "Custom-built online stores with smooth UI and scalable backend for high conversions.",
                  icon: EcomWebApp,
                },
                {
                  title: "Marketplace Advertising (Amazon, Flipkart, etc.)",
                  text: "Boost marketplace visibility with optimized PPC campaigns.",
                  icon: MarketplaceAdvertising,
                },
                {
                  title: "Product Listing Optimization",
                  text: "SEO-rich titles, descriptions, and backend keywords for higher ranking.",
                  icon: ProductListingOptimization,
                },
                {
                  title: "Payment Gateway Integration",
                  text: "Secure checkout using Razorpay, Stripe, PayPal, and more.",
                  icon: PaymentGatewayIntegration,
                },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  className="col-md-6 col-lg-6"
                  variants={cardVariant}
                >
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">

                      {/* ---------------- UPDATED ICON CODE ---------------- */}
                      <motion.img
                        src={service.icon}
                        alt={service.title}
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "contain",
                        }}
                        className="mb-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: idx * 0.1,
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -10, 10, -10, 0],
                          transition: {
                            rotate: {
                              duration: 0.6,
                              ease: "easeInOut",
                            },
                          },
                        }}
                      />
                      {/* ---------------------------------------------------- */}

                      <h5 className="card-title fw-bold">{service.title}</h5>

                      <p className="card-text text-muted mt-2">
                        {service.text}
                      </p>
                    </div>
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
