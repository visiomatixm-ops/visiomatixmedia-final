/**
 * ===========================================================
 * Filename: Services.tsx
 * Author: Viral Prajapati
 * Date: 10-Oct-2025
 * Description:
 *   "Our Services" page enhanced with cinematic animations using
 *   Framer Motion and useScroll:
 *   - Image scaling (Y) from bottom on scroll
 *   - Alternating text slide-in
 *   - Parallax hero background effect
 *   - Staggered text reveal (title → line → paragraph)
 * ===========================================================
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ===========================================================
// Functional Component: Services
// ===========================================================
const Services: React.FC = () => {
  // Array of all service details
  const services = [
    {
      image: "/services/editing.webp",
      title: "Video Editing",
      description:
        "Our expert editors craft professional-grade visuals that captivate your audience. Using cutting-edge tools like Premiere Pro and DaVinci Resolve, we enhance storytelling through seamless transitions, color grading, and cinematic effects. Whether it’s a product ad or a short film, we ensure your footage stands out.",
    },
    {
      image: "/services/animation.jpg",
      title: "2D/3D Animation",
      description:
        "Bring your ideas to life with dynamic 2D and 3D animations. Our creative team blends art and motion to produce visually appealing advertisements, explainer videos, and character-based storytelling that leaves a lasting impression on viewers.",
    },
    {
      image: "/services/branding.jpg",
      title: "Brand Design",
      description:
        "Your brand is your story — we make sure it’s unforgettable. From logos and brand palettes to typography and tone, we create unique brand identities that resonate with your audience and reflect your business values perfectly.",
    },
    {
      image: "/services/photography.jpg",
      title: "Photography",
      description:
        "Capture every detail with precision. We specialize in product, event, and portrait photography using professional-grade equipment and creative direction to deliver high-quality imagery that tells your story beautifully.",
    },
    {
      image: "/services/videography.png",
      title: "Videography",
      description:
        "Capture every detail with precision. We specialize in product, event, and portrait photography using professional-grade equipment and creative direction to deliver high-quality imagery that tells your story beautifully.",
    },
    {
      image: "/services/webdesign.jpg",
      title: "WebDesign",
      description:
        "Capture every detail with precision. We specialize in product, event, and portrait photography using professional-grade equipment and creative direction to deliver high-quality imagery that tells your story beautifully.",
    },
    {
      image: "/services/motion.jpg",
      title: "MotionGraphics",
      description:
        "Capture every detail with precision. We specialize in product, event, and portrait photography using professional-grade equipment and creative direction to deliver high-quality imagery that tells your story beautifully.",
    },
  ];

  // Refs for parallax effect in hero banner
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Transform for parallax background (moves slower than scroll)
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Animation variants for staggered text reveal
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner Section with Parallax */}
      {/* ============================================= */}
      <section
        ref={heroRef}
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center position-relative"
        style={{
          height: "70vh",
          overflow: "hidden",
          marginBottom: "3rem",
        }}
      >
        {/* Parallax background using motion.div */}
        <motion.div
          style={{
            backgroundImage: `url('/about/Blog.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: yParallax,
          }}
          className="position-absolute w-100 h-100"
        />

        {/* Overlay for better text visibility */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        {/* Staggered text reveal */}
        <div className="position-relative z-3">
          <motion.h1
            className="display-5 fw-bold"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            Our Services
          </motion.h1>
          <motion.hr
            className="border-primary opacity-75 w-25 mx-auto"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          />
          <motion.p
            className="lead"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            Transforming your ideas into powerful visual experiences.
          </motion.p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Services Section */}
      {/* ============================================= */}
      <section className="dark-theme-font container my-5">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`row align-items-center mb-5 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Image Column - scales vertically on scroll */}
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ originY: 1 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="img-fluid rounded shadow-lg"
                style={{
                  width: "100%",
                  height: "45vh",
                  objectFit: "cover",
                  background:"white"
                }}
              />
            </motion.div>

            {/* Text Column - slides in alternately */}
            <motion.div
              className="col-md-6"
              initial={{
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
              }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeInOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="fw-bold mb-3 text-primary">{service.title}</h2>
              <p
                className="dark-theme-font   mb-3"
                style={{ textAlign: "justify" }}
              >
                {service.description}
              </p>
              <hr className="border-primary opacity-50 w-25" />
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* ============================================= */}
      {/* Outro Section */}
      {/* ============================================= */}
      <section
        className="text-center text-light py-5 position-relative overflow-hidden"
        style={{
          backgroundImage: `url('/about/Digital-Marketing-Services-banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        <motion.div
          className="container position-relative z-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="fw-bold mb-3">Why Choose Visiomatix Media?</h2>
          <p className="w-75 mx-auto">
            We go beyond visuals — we deliver experiences. Our multidisciplinary
            team works collaboratively to ensure that every project aligns with
            your goals, reflects your vision, and connects with your audience.
            Creativity, precision, and professionalism define every service we
            offer.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Services;
