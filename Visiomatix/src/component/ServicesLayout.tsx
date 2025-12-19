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
import DigitalMarketing from "/public/services/01-digital-marketing.png";
import AnimationImage from "/public/services/2d_3d animation-1.png";
import BrandingImage from "/public/services/6_BRAND&STRATEGY.png";
import PhotographyImage from "/public/services/photography-1.png";
import VideographyImage from "/public/services/videography-1.png";
import MotionImage from "/public/services/motion.png";
import WebDesignImage from "/public/services/web-design-1.png";
import GraphicImage from "/public/services/graphic-1.png";


// ✅ Elegant Light Theme Styles
const cardThemeStyles = `
  .card-theme {
    background: #ffffff !important; /* Solid white background */
    margin-bottom: 2rem; /* Increased gap between cards */
    border-radius: 1.5rem;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    position: relative;
  }

  .card-theme::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #007bff;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card-theme:hover {
    background: #f8fbff !important; /* Light blue-white hover */
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(0, 123, 255, 0.2);
  }

  .card-theme:hover::before {
    opacity: 1;
  }

  .card-theme h5 {
    color: #0b1e34 !important; /* Dark navy title */
    font-size: 1.1rem; /* Uniform text size */
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .card-theme p {
    font-size: 0.9rem; /* Uniform text size */
    color: #6c757d;
    line-height: 1.5;
  }

  .card-theme img {
    border-radius: 50%; /* Circular image */
    background: #ffffff;
    transition: all 0.4s ease;
    border: 3px solid #ffffff;
    margin: 1em;
  }

  .card-theme:hover img {
    transform: scale(1.1) rotate(5deg);
  }

  h2.section-heading {
    color: #0b1e34;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .card-theme {
      border-radius: 1rem;
      margin-bottom: 1.5rem;
    }

    .card-theme:hover {
      transform: translateY(-5px) scale(1.01);
    }
  }
`;

const ServicesLayout: React.FC = () => {
  const services = [
    { image: DigitalMarketing, title: "Digital Marketing", description: "Digital marketing is the strategic use of online channels to promote brands, engage audiences, and drive measurable business growth." },
    { image: AnimationImage, title: "2D/3D Animation", description: "Creative animation services for advertisements and films Engaging 2D and 3D animations designed for advertisements, explainer videos, films." },
    { image: BrandingImage, title: "Brand Design", description: "Crafting unique brand identities for your businessWe create strong and memorable brand identities that reflect your business values." },
    { image: PhotographyImage, title: "Photography", description: "High-quality photoshoots for events, products, and portfolios Professional photography services for events, products, corporate profiles,." },
    { image: VideographyImage, title: "Videography", description: "End-to-end video production for commercials and events Complete video production services including concept planning, shooting, editing,." },
    { image: MotionImage, title: "Motion Graphics", description: "Eye-catching motion designs for social media and ads Dynamic and eye-catching motion graphics designed for social media, ads, presentations,." },
    { image: WebDesignImage, title: "Web Design", description: "Modern and responsive websites for creative industries Modern, responsive, and user-friendly website designs tailored for creative industries." },
    { image: GraphicImage, title: "Graphic Design", description: "Logos, posters, and marketing materials that stand out Creative graphic design solutions including logos, brochures, posters, banners,." }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="container my-5 text-start">
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