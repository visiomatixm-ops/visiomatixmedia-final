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

const Banner: React.FC<BannerProps> = ({ title, subtitle, description, bgImage, height = "clamp(50vh, 70vh, 90vh)" }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center text-white py-4 py-sm-3"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: height,
        position: "relative",
        marginTop: "clamp(8rem, 15rem, 20rem)"
      }}
    >
      {/* Transparent Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.47)",
        }}
      ></div>

      {/* Text Content */}
      <div
        className="container px-2 px-sm-3 px-md-4 py-2 py-sm-3 py-md-4 mx-1 mx-sm-2 mx-md-3"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          backdropFilter: "blur(5px)",
          maxWidth: "90%",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <h1 className="fw-bold mb-2 mb-sm-3">{title}</h1>
        {subtitle && <p className="lead mt-1 mt-sm-2 mb-1 mb-sm-2">{subtitle}</p>}
        {description && <p
        className="banner-description lead  mt-1 mt-sm-2 mb-0">{description}</p>}

      </div>
    </div>
  );
};

<style>
{`
  @media screen and (max-width: 500px) {
    .banner-description {
      font-size: 10pt !important;
    }
  }

  .banner-description {
    font-size: 10pt !important;
  }
`}
</style>

export default Banner;
