/**
 * @file Ecommerce.tsx
 * @description E-commerce Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion + Helmet + SEO JSON-LD Schema
 * @framework Vite + SWC
 * @version 2.3.1
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

  const services = [
    {
      icon: EcomWebApp,
      title: "E-commerce Website Development",
      text: "Fast, secure, and scalable online stores with modern UI, optimized checkout flows, and conversion-focused architecture.",
    },
    {
      icon: MarketplaceAdvertising,
      title: "Marketplace Advertising (Amazon, Flipkart, etc.)",
      text: "Data-driven PPC campaigns with keyword targeting, bid optimization, and performance tracking to increase sales.",
    },
    {
      icon: ProductListingOptimization,
      title: "Product Listing Optimization",
      text: "SEO-optimized titles, bullet points, descriptions, and backend keywords to improve rankings and click-through rates.",
    },
    {
      icon: PaymentGatewayIntegration,
      title: "Payment Gateway Integration",
      text: "Secure payment integration with Razorpay, Stripe, and PayPal for faster checkout and better customer trust.",
    },
  ];

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
        {/* Hero Section */}
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
            <div className="col-md-8 text-center">
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

        {/* Description Section */}
        <section className="pt-3 pb-1 bg-light">
          <div className="container">
            <p
              className="lead text-dark text-center mx-auto mb-0"
              style={{ maxWidth: "850px", fontSize: "1rem", lineHeight: "1.55" }}
            >
              With Visiomatix’s E-commerce Solutions, your online business gains
              modern design, smooth user experience, and deep marketplace
              integration. Whether it’s a Shopify, WooCommerce, or custom-built
              store, we deliver performance-driven results. Boost visibility
              with Amazon & Flipkart ads, optimized listings, and secure
              payment gateways.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="pt-1 pb-5">
          <motion.div
            className="container-lg"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-center fw-semibold mt-4 mb-4">
              Our E-commerce Services
            </h2>

            <div className="row g-4">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="card h-100 border-0"
                    style={{
                      boxShadow: "0 4px 15px rgba(0, 25, 51, 0.3)",
                      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                      width: "100%",
                      maxWidth: "350px",
                      minHeight: "300px",
                      borderRadius: "12px",
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 8px 25px rgba(0, 25, 51, 0.4)",
                      transition: { duration: 0.3 },
                    }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div
                      className="card-body d-flex flex-column align-items-start"
                      style={{ height: "100%", padding: "2rem 1rem" }}
                    >
                      {/* Icon centered */}
                      <div className="d-flex justify-content-center w-100 mb-3">
                        <motion.img
                          src={service.icon}
                          alt={service.title}
                          style={{ width: "50px", height: "50px", objectFit: "contain" }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Left-aligned black text */}
                      <h5 className="fw-bold text-dark mt-2">{service.title}</h5>
                      <p className="text-dark text-start">{service.text}</p>
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
