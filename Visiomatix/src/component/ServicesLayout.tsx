/**
 * ===========================================================
 * File: src/components/ServicesLayout.tsx
 * Author: Viral Prajapati
 * Date: 15-Oct-2025
 * Description:
 *  Light-themed responsive grid layout of multimedia service cards.
 *  - Cards fade in/out when scrolled into/out of view.
 *  - Cards scale up smoothly on hover and scale down on exit.
 *  - Card images are circular.
 *  - Light background with blue accent hover.
 * ===========================================================
 */

import React from "react";
import ServiceCard from "./ServiceCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Service {
  image: string;
  title: string;
  description: string;
}

interface ServiceCardWrapperProps {
  service: Service;
  cardVariants: {
    hidden: { opacity: number; y: number; scale: number };
    visible: { opacity: number; y: number; scale: number; transition: { duration: number } };
    exit: { opacity: number; y: number; scale: number; transition: { duration: number } };
    hover: { scale: number; transition: { duration: number } };
  };
}

const ServiceCardWrapper: React.FC<ServiceCardWrapperProps> = ({ service, cardVariants }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="card-theme col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center p-3"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      whileHover="hover"
    >
      <ServiceCard
        image={service.image}
        title={service.title}
        description={service.description}
        hoverRadius={120} // slightly rounder hover radius for circular cards
      />
    </motion.div>
  );
};

// Example service images
import DigitalMarketing from "/public/services/1_DIGITAL MARKETING SERVICES.jpg";
import AnimationImage from "/public/services/2d_3d animation-1.jpg";
import BrandingImage from "/public/services/6_BRAND&STRATEGY.jpg";
import PhotographyImage from "/public/services/photography-1.jpg";
import VideographyImage from "/public/services/videography-1.jpg";
import MotionImage from "/public/services/motion.jpg";
import WebDesignImage from "/public/services/web-design-1.jpg";
import GraphicImage from "/public/services/graphic-1.jpg";
// ✅ Light Theme Styles
const cardThemeStyles = `
  .card-theme {
    background-color: #ffffff !important; /* White background */
    border: 1px solid rgba(0, 0, 0, 0.08); /* Subtle light border */
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* Soft gray shadow */
    transition: all 0.3s ease-in-out;
  }

  .card-theme:hover {
    background-color: #f8fbff !important; /* Soft blue-white hover */
    border-color: rgba(0, 120, 255, 0.3);
    box-shadow: 0 4px 15px rgba(0, 120, 255, 0.25);
    transform: translateY(-6px);
  }

  .card-theme h5 {
    color: #0b1e34 !important; /* Dark navy title */
  }

  .card-theme p {
    color: #555555 !important; /* Muted text */
  }

  .card-theme img {
    border-radius: 50%; /* Circular image */
    border: 2px solid rgba(0, 120, 255, 0.2);
    background: #ffffff;
    transition: all 0.4s ease;
  }

  .card-theme:hover img {
    border-color: rgba(0, 120, 255, 0.5);
    transform: scale(1.05);
  }

  h2.section-heading {
    color: #0b1e34;
    letter-spacing: 0.05em;
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .card-theme {
      border-radius: 0.8rem;
    }
  }
`;

const ServicesLayout: React.FC = () => {
  const services = [
    { image: DigitalMarketing, title: "Digital Marketing", description: "Digital marketing is the strategic use of online channels to promote brands, engage audiences, and drive measurable business growth." },
    { image: AnimationImage, title: "2D/3D Animation", description: "Creative animation services for advertisements and films." },
    { image: BrandingImage, title: "Brand Design", description: "Crafting unique brand identities for your business." },
    { image: PhotographyImage, title: "Photography", description: "High-quality photoshoots for events, products, and portfolios." },
    { image: VideographyImage, title: "Videography", description: "End-to-end video production for commercials and events." },
    { image: MotionImage, title: "Motion Graphics", description: "Eye-catching motion designs for social media and ads." },
    { image: WebDesignImage, title: "Web Design", description: "Modern and responsive websites for creative industries." },
    { image: GraphicImage, title: "Graphic Design", description: "Logos, posters, and marketing materials that stand out." }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="container my-5">
      {/* Inject local light theme styles */}
      <style>{cardThemeStyles}</style>

      <h2 className="text-center section-heading">Our Multimedia Services</h2>

      {/* Responsive Grid */}
      <div className="row g-4">
        {services.map((service, index) => {
          return (
            <ServiceCardWrapper
              key={index}
              service={service}
              cardVariants={cardVariants}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServicesLayout;
