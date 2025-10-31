// File: src/pages/WebDesign.tsx
/**
 * @file WebDesign.tsx
 * @description Web Design & Creative Services Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
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
 *  - Footer
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

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
// Component: WebDesign
// ----------------------------------------------------
const Design: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Loader fade-out effect
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
    name: "BrandName Web Design Studio",
    image: "https://www.yourdomain.com/images/brand-logo.png",
    url: "https://www.yourdomain.com/web-design",
    telephone: "+1-800-555-0199",
    email: "info@yourdomain.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1234 Design Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "USA",
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
      "BrandName Web Design Studio specializes in UI/UX Design, Graphic Design, Motion Graphics, 3D Visualization, and VFX — crafting digital experiences that engage and inspire.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Creative Services",
    serviceType: "Web Design and Creative Development",
    provider: {
      "@type": "Organization",
      name: "BrandName Web Design Studio",
      url: "https://www.yourdomain.com",
    },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "We provide professional Web Design and Creative Services — including UI/UX design, logo and brand identity creation, motion graphics, YouTube thumbnails, 3D product visualization, VFX, and post-production media editing.",
    offers: {
      "@type": "Offer",
      url: "https://www.yourdomain.com/contact",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      price: "799",
    },
  };

  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Web Design & Creative Services | Build Stunning Visual Experiences</title>
        <meta
          name="description"
          content="Enhance your brand with premium Web Design and Creative Services — including UI/UX Design, Logo Design, Motion Graphics, 3D Visualization, VFX, and Product Photography."
        />
        <meta
          name="keywords"
          content="Web Design, UI UX Design, Graphic Design, Motion Graphics, Animation, YouTube Thumbnails, 3D Product Visualization, VFX, Post-Production, Product Photography, Videography, Branding, Logo Design"
        />
        <link rel="canonical" href="https://www.yourdomain.com/web-design" />

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
            <strong>Loading Web Design Page...</strong>
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
            <motion.header
              className="bg-primary text-white text-center py-5"
              variants={fadeInUp}
            >
              <div className="container">
                <h1 className="display-4 fw-bold">Web Design & Creative Services</h1>
                <p className="lead">
                  Transform your digital identity with stunning visuals, engaging interfaces, and artistic design that tells your brand’s story.
                </p>
                <motion.a
                  href="#services"
                  className="btn btn-light btn-lg mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Services
                </motion.a>
              </div>
            </motion.header>

            {/* Expanded Content Section */}
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
                  Our Web Design and Creative Services combine strategy, aesthetics, and technology
                  to craft visually striking experiences that engage users and enhance brand value.
                  From <strong>UI/UX Design</strong> that focuses on usability and customer flow,
                  to <strong>Graphic Design</strong> for branding, logos, and marketing collateral,
                  our work ensures every pixel communicates purpose.  
                  We create <strong>Motion Graphics</strong> and <strong>Animations</strong> that breathe
                  life into static visuals, produce <strong>YouTube Thumbnails & Video Assets</strong> that
                  boost viewer engagement, and develop <strong>3D Product Visualizations</strong> that
                  make your offerings tangible and dynamic.  
                  With expertise in <strong>Visual Effects (VFX)</strong>, post-production,
                  <strong> Photography</strong>, and <strong>Videography</strong>, we deliver end-to-end
                  visual solutions that elevate your brand presence across digital channels.
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
                  Our Core Design & Creative Services
                </h2>
                <div className="row g-4">
                  {[
                    {
                      icon: "bi bi-palette text-primary",
                      title: "UI/UX Design",
                      text: "Craft intuitive, user-centered digital interfaces that blend aesthetic design with seamless functionality.",
                      btnClass: "btn-outline-primary",
                    },
                    {
                      icon: "bi bi-brush text-danger",
                      title: "Graphic Design & Branding",
                      text: "Create striking brand visuals including logos, brochures, and identity materials that leave a lasting impression.",
                      btnClass: "btn-outline-danger",
                    },
                    {
                      icon: "bi bi-camera-reels text-warning",
                      title: "Motion Graphics & Animation",
                      text: "Engage audiences through dynamic animations, video intros, and storytelling motion assets.",
                      btnClass: "btn-outline-warning",
                    },
                    {
                      icon: "bi bi-youtube text-danger",
                      title: "YouTube Thumbnails & Video Assets",
                      text: "Design eye-catching video thumbnails, banners, and overlays that maximize click-through rates and viewer retention.",
                      btnClass: "btn-outline-danger",
                    },
                    {
                      icon: "bi bi-cube text-info",
                      title: "3D Product Visualization",
                      text: "Showcase your products with photorealistic 3D renders and interactive visual mockups.",
                      btnClass: "btn-outline-info",
                    },
                    {
                      icon: "bi bi-stars text-success",
                      title: "VFX, Post-Production & Photography",
                      text: "Add cinematic flair to visuals through advanced VFX, editing, photography, and videography expertise.",
                      btnClass: "btn-outline-success",
                    },
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      className="col-md-4"
                      variants={cardVariant}
                    >
                      <div className="card h-100 shadow-sm border-0">
                        <div className="card-body text-center">
                          <i
                            className={`${card.icon} display-5 mb-3`}
                            aria-hidden="true"
                          ></i>
                          <h5 className="card-title">{card.title}</h5>
                          <p className="card-text text-muted">{card.text}</p>
                          <a href="#" className={`btn ${card.btnClass}`}>
                            Learn More
                          </a>
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
                <h3 className="fw-bold mb-3">
                  Ready to Design a Stunning Digital Experience?
                </h3>
                <p className="lead">
                  Let’s bring your vision to life through design that inspires, performs, and engages.
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

export default Design;
