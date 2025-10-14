/**
 * File: ServicesLayout.tsx
 * Location: src/components/
 * Author: Viral Prajapati
 * Date: 12-Oct-2025
 * Description:
 *  Displays a responsive grid layout of multimedia service cards with Framer Motion animations.
 *  Cards fade in when scrolled into view, fade out when scrolled out.
 *  Cards scale up smoothly on hover and scale down on exit.
 *  Card images are circular.
 */

import React from "react";
import ServiceCard from "./ServiceCard";
import "bootstrap/dist/css/bootstrap.min.css";

// Framer Motion imports
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Example service images
import EditingImage from "/public/services/editing.webp";
import AnimationImage from "/public/services/animation.jpg";
import BrandingImage from "/public/services/branding.jpg";
import PhotographyImage from "/public/services/photography.jpg";
import VideographyImage from "/public/services/videography.png";
import MotionImage from "/public/services/motion.jpg";
import WebDesignImage from "/public/services/webdesign.jpg";
import GraphicImage from "/public/services/graphic.jpg";

// ✅ Custom style overrides (Bootstrap-safe)
const cardThemeStyles = `
  .card-theme {
    background-color: #1e2d44ff !important; /* Dark background */
    border: 1px solid rgba(0, 255, 255, 0.2); /* Subtle aqua border */
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 255, 255, 0.1); /* Light aqua shadow */
    transition: all 0.3s ease-in-out;
  }

  .card-theme:hover {
    background-color: #222831 !important; /* Slightly lighter shade on hover */
    transform: translateY(-5px);
  }

  .card-theme h5,
  .card-theme p {
    color: #e0f7fa !important; /* Soft aqua text */
  }

  .card-theme img {
    border-radius: 12px;
    background:white;
    border: 2px solid rgba(0, 255, 255, 0.3);
  }
`;

const ServicesLayout: React.FC = () => {
  // Sample service data
  const services = [
    { image: EditingImage, title: "Video Editing", description: "Professional editing to create stunning cinematic visuals." },
    { image: AnimationImage, title: "2D/3D Animation", description: "Creative animation services for advertisements and films." },
    { image: BrandingImage, title: "Brand Design", description: "Crafting unique brand identities for your business." },
    { image: PhotographyImage, title: "Photography", description: "High-quality photoshoots for events, products, and portfolios." },
    { image: VideographyImage, title: "Videography", description: "End-to-end video production for commercials and events." },
    { image: MotionImage, title: "Motion Graphics", description: "Eye-catching motion designs for social media and ads." },
    { image: WebDesignImage, title: "Web Design", description: "Modern and responsive websites for creative industries." },
    { image: GraphicImage, title: "Graphic Design", description: "Logos, posters, and marketing materials that stand out." },
  ];

  // Framer Motion variants (unchanged)
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="container my-5">
      {/* Inject local style overrides */}
      <style>{cardThemeStyles}</style>

      <h2 className="text-center mb-4 fw-bold text-light">Our Multimedia Services</h2>

      {/* Responsive Bootstrap Grid */}
      <div className="row g-4">
        {services.map((service, index) => {
          const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

          return (
            <motion.div
              key={index}
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
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesLayout;
