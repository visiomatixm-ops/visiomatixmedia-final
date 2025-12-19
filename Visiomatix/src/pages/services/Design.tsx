// File: src/pages/Design.tsx
/**
 * @file Design.tsx
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

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import UIUX from "/services/icons/2-LIST/2-1 UI UX design.svg";
import GraphicDesign from "/services/icons/2-LIST/2-2 Graphic Design.svg";
import MotionGraphics from "/services/icons/2-LIST/2-3 motion graphics.svg";
import YouTubeThumbnails from "/services/icons/2-LIST/2-4 Youtube thumbnail.svg";
import ThreeDVisualization from "/services/icons/2-LIST/2-5 3D Product Visualization.svg";
import VFXPostProduction from "/services/icons/2-LIST/2-6 VFX, Post-Production & Photography.svg";
import ProductPhotography from "/services/icons/2-LIST/2-7 Product Photography & Videography.svg";
import Banner from "/services/Banner/Design & Creative Services-2.jpg";



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
// Component: Design
// ----------------------------------------------------
const Design: React.FC = () => {

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
                  backgroundColor: 'rgba(20, 40, 71, 0.57)',
                  zIndex: 1,
                }}
              />
              <div className="container text-center position-relative" style={{
                zIndex: 2,
                backgroundColor: "rgba(0, 40, 80, 0.45)",
                borderRadius: "12px",
                width:"90%",
                padding:"1em",
                backdropFilter: "blur(5px)",
                marginTop: '6rem',

              }}>
                 <motion.h1
                   className="display-4 fw-bold"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                 >
                   Web Design & Creative Services
                 </motion.h1>
                 <motion.p
                   className="lead"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                 >
                   Transform your digital identity with stunning visuals, engaging interfaces, and artistic design that tells your brand's story.
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

            {/* Expanded Content Section */}
            <motion.section
              className="py-5 bg-light"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="container">
                <p className="lead text-dark mx-auto visiomatix-text"
                  style={{ maxWidth: "850px",
                  textAlign:"justify",
                  lineHeight:"1.8"


                   }}
                >
                  Our Web Design and Creative Services combine strategy, aesthetics, and technology
                  to craft visually striking experiences that engage users and enhance brand value.
                  From UI/UX Design that focuses on usability and customer flow,
                  to Graphic Design for branding, logos, and marketing collateral,
                  our work ensures every pixel communicates purpose.  
                  We create Motion Graphics and Animations that breathe
                  life into static visuals, produce YouTube Thumbnails & Video Assets that
                  boost viewer engagement, and develop 3D Product Visualizations that
                  make your offerings tangible and dynamic.  
                  With expertise in Visual Effects (VFX), post-production,
                   Photography, and Videography, we deliver end-to-end
                  visual solutions that elevate your brand presence across digital channels.
                </p>
              </div>
            </motion.section>

            {/* Services Section */}
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

      {/* ---------- FIRST ROW (4 CARDS) ---------- */}
      {[
        {
          icon: UIUX,
          title: "UI/UX Design",
          text: "Craft intuitive, user-centered digital interfaces that blend aesthetic design with seamless functionality Our UI/UX design approach focuses on user research, wireframing prototyping,.",
        },
        {
          icon: GraphicDesign,
          title: "Graphic Design & Branding",
          text: "Create striking brand visuals including logos, brochures, and identity materials that leave a lasting impression we ensure consistency across all platforms..",
        },
        {
          icon: MotionGraphics,
          title: "Motion Graphics & Animation",
          text: "Engage audiences through dynamic animations, video intros, and storytelling motion assets Our animations enhance brand recall and boost.",
        },
        {
          icon: YouTubeThumbnails,
          title: "YouTube Thumbnails & Video Assets",
          text: "Design eye-catching video thumbnails, banners, and overlays that maximize viewer retention Our designs focus on strong visuals, readable typography.",
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
              boxShadow: "0 4px 15px rgba(0, 25, 51, 0.3)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              width: "100%",
              maxWidth: "350px",
              minHeight: "300px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 8px 25px rgba(0, 25, 51, 0.4)",
              transition: { duration: 0.3 },
            }}
          >
            <div
              className="card-body text-center d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100%", padding: "2rem 1rem" }}
            >
              {/* --- SMALL FIXED ICON --- */}
              <div
                className="icon-box mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.img
                  src={card.icon}
                  alt={card.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <h5 className="card-title">{card.title}</h5>
              <p className="card-text text-start">{card.text}</p>      {/* text-muted */}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ---------- SECOND ROW (3 CARDS) ---------- */}
      {[
        {
          icon: ThreeDVisualization,
          title: "3D Product Visualization",
          text: "Showcase your products with photorealistic 3D renders and interactive visual mockups From e-commerce mockups to interactive renders and promotional visuals.",
        },
        {
          icon: VFXPostProduction,
          title: "VFX, Post-Production & Photography",
          text: "Add cinematic flair with VFX, editing, photography, and advanced post-production Our team ensures every frame looks polished, impactful.",
        },
        {
          icon: ProductPhotography,
          title: "Product Photography & Videography",
          text: "Capture stunning product images and videos that highlight features and drive conversions Our visuals are optimized for e-commerce platforms.",
        },
      ].map((card, idx) => (
        <motion.div
          key={idx}
          className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
          variants={cardVariant}
        >
          <motion.div
            className="card h-100 border-0"
            style={{
              boxShadow: "0 4px 15px rgba(0, 25, 51, 0.3)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              width: "100%",
              maxWidth: "350px",
              minHeight: "300px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
            whileHover={{
              y: -5,
              boxShadow: "0 8px 25px rgba(0, 25, 51, 0.4)",
              transition: { duration: 0.3 },
            }}
          >
            <div
              className="card-body text-center d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100%", padding: "2rem 1rem" }}
            >
              {/* --- SMALL FIXED ICON --- */}
              <div
                className="icon-box mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.img
                  src={card.icon}
                  alt={card.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <h5 className="card-title">{card.title}</h5>
              <p className="card-text text-start">{card.text}</p>      {/* text-muted */}
            </div>
          </motion.div>
        </motion.div>
      ))}

    </div>
  </motion.div>
</section>



</motion.div>
</>
  );
};

export default Design;
