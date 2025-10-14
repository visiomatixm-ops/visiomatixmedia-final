/**
 * File: src/components/ServiceCard.tsx
 * Author: Viral Prajapati
 * Date: 12-Oct-2025
 * Description:
 *  Reusable Bootstrap + Framer Motion service card component.
 *  Displays a square image that increases border-radius on hover.
 */

import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  image?: string;
  title: string;
  description: string;
  hoverRadius?: number; // optional hover border-radius
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description, hoverRadius = 100 }) => {
  const fallbackImage = "https://via.placeholder.com/400x250.png?text=Visiomatix+Service";

  // Framer Motion animation for image hover
  const imageHover = {
    scale: 1.1,
    borderRadius: `${hoverRadius}px`,
    transition: { duration: 0.8 },
  };

  return (
    <div className=" card border-0 shadow-sm rounded-4 overflow-hidden text-center position-relative h-100">
      {/* ====================== Image Section ====================== */}
      <motion.img
        src={image || fallbackImage}
        alt={title}
        className="card-img-top img-fluid"
        onError={(e) => ((e.currentTarget.src = fallbackImage))}
        style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius:5, margin: "1rem auto 0", background:"white" }} // default small radius
        whileHover={imageHover} // animate scale + radius
      />

      {/* ====================== Card Body Section ====================== */}
      <div className="card-theme card-body">
        <h5 className="card-theme card-title fw-semibold">{title}</h5>
        <p className="card-theme card-text ">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
