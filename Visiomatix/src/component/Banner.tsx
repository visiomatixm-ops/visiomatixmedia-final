/**
 * File: Banner.tsx
 * Location: src/components/
 * Author: Viral Prajapati
 * Date: 07-Oct-2025
 * Description:
 *  A reusable Banner component built using React + TypeScript + Bootstrap.
 *  It displays a background image, a transparent overlay, and some styled text content.
 */

import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  description?:string;
  bgImage: string;
  height?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, description, bgImage, height = "70vh" }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: height,
        position: "relative",
        marginTop:"15em"
      }}
    >
      {/* Transparent Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      {/* Text Content */}
      <div
        className="p-4"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1 className="fw-bold">{title}</h1>
        {subtitle && <p className="lead mt-2">{subtitle}</p>}
        {description && <p className="lead mt-2"> {description}</p>}

      </div>
    </div>
  );
};

export default Banner;
