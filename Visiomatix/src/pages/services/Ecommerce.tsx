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

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import EcomWebApp from "/services/icons/5-LIST/5-1 E-commerce Website Development.svg";
import MarketplaceAdvertising from "/services/icons/5-LIST/5-2 Marketplace Advertising.svg";
import ProductListingOptimization from "/services/icons/5-LIST/5-3 Product Listing Optimization.svg";
import PaymentGatewayIntegration from "/services/icons/5-LIST/5-4 Payment Gateway Integration.svg";
import Banner from "/services/Banner/E-commerce Services with minimal illustration not more and not low-4.jpg";
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

  // ----------------------------------------------------
  // JSON-LD Schema (LocalBusiness + Service)
  // ----------------------------------------------------
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Visiomatix E-commerce Solutions",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/ecommerce-solutions",
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
      "Visiomatix specializes in E-commerce website development, marketplace advertising, product listing optimization, and payment gateway integration — delivering high-conversion online stores.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "E-commerce Solutions",
    serviceType:
      "E-commerce Development, Online Store Design, Marketplace Advertising, Payment Gateway Integration",
    provider: {
      "@type": "Organization",
      name: "Visiomatix E-commerce Solutions",
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
          content="Launch your online business with Visiomatix’s E-commerce Solutions — custom online stores, marketplace advertising (Amazon, Flipkart), product listing optimization, and secure payment gateways."
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
                  backgroundColor: '#091726b5',
                  zIndex: 1
                }}
              />
              <div className="container position-relative" style={{
                zIndex: 2,
                backgroundColor: "rgba(0, 40, 80, 0.45)",
                borderRadius: "12px",
                width:"90%",
                padding:"1em",
                backdropFilter: "blur(5px)",
                marginTop: '7rem',
              }}>
                 <div className="row align-items-center">
                   <div className="col-md-6">
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
                   <div className="col-md-6 text-center mt-4 mt-md-0">
                     {/* <motion.img
                       src="/services/5_E-commerce Solutions.jpg"
                       alt="E-commerce Solutions Illustration"
                       className="img-fluid rounded-3 shadow-sm"
                       style={{width:"20em"}}
                       initial={{ opacity: 0, x: 30 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8, delay: 0.6 }}
                     /> */}
                   </div>
                 </div>
               </div>
            </section>

            {/* Description Section */}
            <section className="py-5 bg-light">
              <div className="container">
                <p className="lead text-muted text-center mx-auto" style={{ maxWidth: "850px" }}>
                  With <strong>Visiomatix’s E-commerce Solutions</strong>, your online
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
                      icon: EcomWebApp,
                      img: "https://www.yourdomain.com/images/ecommerce-website.svg",
                    },
                    {
                      title: "Marketplace Advertising (Amazon, Flipkart, etc.)",
                      text: "Maximize visibility across major marketplaces with optimized advertising campaigns that boost sales and improve return on ad spend.",
                      icon: MarketplaceAdvertising,
                      img: "https://www.yourdomain.com/images/marketplace-ads.svg",
                    },
                    {
                      title: "Product Listing Optimization",
                      text: "Improve search rankings and conversion rates with SEO-optimized product titles, descriptions, and structured data for better discoverability.",
                      icon: ProductListingOptimization,
                      img: "https://www.yourdomain.com/images/product-listing.svg",
                    },
                    {
                      title: "Payment Gateway Integration",
                      text: "Secure and smooth checkout experiences with integrated payment gateways supporting all major providers — Stripe, PayPal, Razorpay, and more.",
                      icon: PaymentGatewayIntegration,
                      img: "https://www.yourdomain.com/images/payment-gateway.svg",
                    },
                  ].map((service, idx) => (
                    <motion.div
                      key={idx}
                      className="col-md-6 col-lg-6"
                      variants={cardVariant}
                    >
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                          <div className="mb-3">
                            <motion.img
                              src={service.icon}
                              alt={service.title}
                              style={{ width: '64px', height: '64px' }}
                              className="mb-3"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: idx * 0.1
                              }}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -10, 10, -10, 0],
                                transition: {
                                  rotate: {
                                    duration: 0.6,
                                    ease: "easeInOut"
                                  }
                                }
                              }}
                            />
                          </div>
                          <h5 className="card-title fw-bold">
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
    </>
  );
};

export default Ecommerce;
