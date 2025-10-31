/**
 * @file Ecommerce.tsx
 * @description E-commerce Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion + Helmet + SEO JSON-LD Schema
 * @framework Vite + SWC
 * @version 2.1.0
 *
 * Layout Summary:
 *  - Fade-in Loader
 *  - Helmet SEO + LocalBusiness + Service JSON-LD
 *  - Split Hero Section (dark gradient + image)
 *  - Rich descriptive content (~250 words)
 *  - Four Product-style Service Cards
 *  - CTA Section
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

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
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// ----------------------------------------------------
// Component: Ecommerce
// ----------------------------------------------------
const Ecommerce: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------
  // JSON-LD Schema (LocalBusiness + Service)
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BrandName E-commerce Solutions",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/ecommerce-solutions",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4567 Commerce Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "USA",
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
      "BrandName specializes in E-commerce website development, marketplace advertising, product listing optimization, and payment gateway integration — delivering high-conversion online stores.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "E-commerce Solutions",
    serviceType:
      "E-commerce Development, Online Store Design, Marketplace Advertising, Payment Gateway Integration",
    provider: {
      "@type": "Organization",
      name: "BrandName E-commerce Solutions",
      url: "https://www.yourdomain.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "End-to-end E-commerce solutions including online store creation, product listing optimization, and marketplace advertising for Amazon, Flipkart, and more.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "999",
    },
  };

  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------
  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>E-commerce Solutions | Online Store Development & Marketplace Advertising</title>
        <meta
          name="description"
          content="Launch your online business with BrandName’s E-commerce Solutions — custom online stores, marketplace advertising (Amazon, Flipkart), product listing optimization, and secure payment gateways."
        />
        <meta
          name="keywords"
          content="E-commerce Development, Marketplace Advertising, Amazon Ads, Flipkart Ads, Product Listing Optimization, Payment Gateway Integration, Shopify Development, WooCommerce, Magento, Custom E-commerce Solutions"
        />
        <link
          rel="canonical"
          href="https://www.yourdomain.com/ecommerce-solutions"
        />

        {/* Structured JSON-LD */}
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
            <strong>Loading E-commerce Solutions...</strong>
          </motion.div>
        ) : (
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
            <section className="bg-dark text-light py-5 position-relative overflow-hidden">
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "radial-gradient(circle at top right, #0d6efd33, transparent 70%)",
                }}
              />
              <div className="container position-relative">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h1 className="display-5 fw-bold">E-commerce Solutions</h1>
                    <p className="lead mt-3">
                      Build, advertise, and scale your online store with powerful
                      e-commerce technology and multi-marketplace growth strategies.
                    </p>
                    <motion.a
                      href="#services"
                      className="btn btn-primary btn-lg mt-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Discover More
                    </motion.a>
                  </div>
                  <div className="col-md-6 text-center mt-4 mt-md-0">
                    <img
                      src="https://www.yourdomain.com/images/ecommerce-hero.svg"
                      alt="E-commerce Solutions Illustration"
                      className="img-fluid rounded-3 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Description Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-muted text-center mx-auto" style={{ maxWidth: "850px" }}>
                  With <strong>BrandName’s E-commerce Solutions</strong>, your online
                  business gains the advantage of modern design, flawless user
                  experience, and deep marketplace integration. Whether it’s a
                  <strong> Shopify store, WooCommerce website,</strong> or a
                  <strong> custom-built e-commerce platform</strong>, we combine
                  performance optimization, automation, and analytics for
                  measurable growth. Our marketplace advertising services on
                  <strong> Amazon, Flipkart,</strong> and more help maximize
                  visibility, while <strong>Product Listing Optimization</strong> and
                  <strong> secure Payment Gateway Integration</strong> ensure a seamless,
                  high-conversion shopping experience for your customers.
                </p>
              </div>
            </section>

            {/* Services Section */}
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
                      text: "Custom-built online stores that deliver seamless shopping experiences. From user-friendly UI to scalable backend solutions — we craft stores designed to convert.",
                      icon: "bi bi-cart-check text-primary",
                      img: "https://www.yourdomain.com/images/ecommerce-website.svg",
                    },
                    {
                      title: "Marketplace Advertising (Amazon, Flipkart, etc.)",
                      text: "Maximize visibility across major marketplaces with optimized advertising campaigns that boost sales and improve return on ad spend.",
                      icon: "bi bi-bag-heart text-success",
                      img: "https://www.yourdomain.com/images/marketplace-ads.svg",
                    },
                    {
                      title: "Product Listing Optimization",
                      text: "Improve search rankings and conversion rates with SEO-optimized product titles, descriptions, and structured data for better discoverability.",
                      icon: "bi bi-list-check text-warning",
                      img: "https://www.yourdomain.com/images/product-listing.svg",
                    },
                    {
                      title: "Payment Gateway Integration",
                      text: "Secure and smooth checkout experiences with integrated payment gateways supporting all major providers — Stripe, PayPal, Razorpay, and more.",
                      icon: "bi bi-credit-card text-danger",
                      img: "https://www.yourdomain.com/images/payment-gateway.svg",
                    },
                  ].map((service, idx) => (
                    <motion.div
                      key={idx}
                      className="col-md-6 col-lg-6"
                      variants={cardVariant}
                    >
                      <div className="card border-0 shadow-sm h-100">
                        <img
                          src={service.img}
                          alt={service.title}
                          className="card-img-top rounded-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            <i className={`${service.icon} me-2`}></i>
                            {service.title}
                          </h5>
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
                  Partner with us to build, optimize, and grow your digital store —
                  with technology that sells.
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
        )}
      </AnimatePresence>
    </>
  );
};

export default Ecommerce;
