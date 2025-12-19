/**
 * ===========================================================
 * File: src/components/ServiceCard.tsx
 * Author: Viral Prajapati
 * Date: 15-Oct-2025
 * Description:
 *  Light-themed reusable Bootstrap + Framer Motion service card.
 *  - White background with soft shadow
 *  - Navy text with blue accent hover
 *  - Square image becomes rounded + scaled on hover
 * ===========================================================
 */

import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  image?: string;
  title: string;
  description: string;
  hoverRadius?: number; // optional hover border-radius
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  hoverRadius = 100,
}) => {
  const fallbackImage =
    "https://via.placeholder.com/400x250.png?text=Visiomatix+Service";

  // Framer Motion hover animation for image
  const imageHover = {
    scale: 1.08,
    borderRadius: `${hoverRadius}px`,
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      className="card border-0 shadow-sm rounded-4 overflow-hidden text-center position-relative h-100 service-card"
      whileHover={{
        boxShadow: "0 0 15px rgba(0, 120, 255, 0.3)",
        transition: { duration: 0.3 },
      }}
    >
      {/* ====================== Image Section ====================== */}
      <motion.img
        src={image || fallbackImage}
        alt={title}
        className="card-img-top img-fluid"
        onError={(e) => ((e.currentTarget.src = fallbackImage))}
        style={{
          width: "clamp(180px, 25vw, 250px)",
          height: "clamp(180px, 25vw, 250px)",
          objectFit: "cover",
          borderRadius: 8,
          margin: "1rem auto 0",
          background: "white",
          transition: "border-radius 0.5s ease",
        }}
        whileHover={imageHover}
      />

      {/* ====================== Card Body Section ====================== */}
      <div className="card-body p-3 p-sm-4">
        <h5 className="card-title fw-semibold text-dark mb-3 h6 h-sm-5">{title}</h5>
        <p
  className="card-text text-start mb-0 small fs-7 fs-sm-6"
  style={{ color: "#000" }}
>
  {description}
</p>
</div>

      {/* ====================== Inline Light Theme CSS ====================== */}
      <style>
        {`
          .service-card {
            background-color: #ffffff;
            color: #0b1e34;
            transition: all 0.3s ease-in-out;
            border-radius: 1.2rem;
          }

          .service-card:hover {
            transform: translateY(-5px);
          }

          .service-card .card-title {
            color: #0b1e34;
            font-size: 1.25rem;
            letter-spacing: 0.02em;
          }

          .service-card .card-text {
            color: #333333;
            font-size: 0.95rem;
            line-height: 1.6;
          }

          /* Hover accent underline for title */
          .service-card:hover .card-title {
            color: #0078ff;
            transition: color 0.3s ease;
          }

          /* Responsive image sizing */
          @media (max-width: 576px) {
            .service-card img {
              width: 150px !important;
              height: 150px !important;
            }
          }

          @media (max-width: 768px) and (min-width: 577px) {
            .service-card img {
              width: 200px !important;
              height: 200px !important;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default ServiceCard;
