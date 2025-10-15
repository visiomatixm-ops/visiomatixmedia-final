/**
 * ===========================================================
 * Filename: Services.tsx
 * Author: Viral Prajapati
 * Date: 15-Oct-2025
 * Description:
 *   "Our Services" page enhanced with cinematic animations using
 *   Framer Motion and useScroll:
 *   - Image scales vertically (Y-axis) from bottom on scroll
 *   - Alternating text slide-in effect
 *   - Parallax hero background motion
 *   - Staggered reveal of heading, line, and paragraph
 *   - Optimized responsive layout with contained images
 * ===========================================================
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ===========================================================
// Functional Component: Services
// ===========================================================
const Services: React.FC = () => {
  // -----------------------------------------------------------
  // Array of service data
  // -----------------------------------------------------------
  const services = [
    {
      image: "/services/editing.webp",
      title: "Video Editing",
      description:
        "Our expert editors craft professional-grade visuals that captivate your audience. Using cutting-edge tools like Premiere Pro and DaVinci Resolve, we enhance storytelling through seamless transitions, color grading, and cinematic effects.",
    },
    {
      image: "/services/animation.jpg",
      title: "2D/3D Animation",
      description:
        "Bring your ideas to life with dynamic 2D and 3D animations. We create visually engaging advertisements, explainer videos, and character-driven storytelling for impactful communication.",
    },
    {
      image: "/services/branding.jpg",
      title: "Brand Design",
      description:
        "Your brand is your identity — we ensure it’s memorable. From logos and color palettes to typography and tone, we build identities that resonate and endure.",
    },
    {
      image: "/services/photography.jpg",
      title: "Photography",
      description:
        "Capture moments that matter. We specialize in product, portrait, and event photography with professional direction and precision lighting.",
    },
    {
      image: "/services/videography.png",
      title: "Videography",
      description:
        "Our videographers transform visuals into stories. From corporate events to cinematic reels, every frame reflects your brand’s essence.",
    },
    {
      image: "/services/webdesign.jpg",
      title: "Web Design",
      description:
        "We design responsive, aesthetic, and user-friendly websites that align with your brand’s goals and modern digital standards.",
    },
    {
      image: "/services/motion.jpg",
      title: "Motion Graphics",
      description:
        "Engage your audience with fluid and dynamic visuals. We merge design and animation to create sleek motion graphics for digital storytelling.",
    },
  ];

  // -----------------------------------------------------------
  // Hero section parallax setup
  // -----------------------------------------------------------
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // -----------------------------------------------------------
  // Staggered text animation variants
  // -----------------------------------------------------------
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  // ===========================================================
  // Render JSX
  // ===========================================================
  return (
    <>
      {/* =================================================== */}
      {/* Hero Section with Parallax Background */}
      {/* =================================================== */}
      <section
        ref={heroRef}
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center position-relative"
        style={{
          height: "70vh",
          overflow: "hidden",
          marginBottom: "3rem",
        }}
      >
        {/* Background motion layer */}
        <motion.div
          style={{
            backgroundImage: `url('/about/Blog.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: yParallax,
          }}
          className="position-absolute w-100 h-100"
        />

        {/* Dark overlay for text contrast */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        {/* Staggered reveal text block */}
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

      {/* =================================================== */}
      {/* Services Grid Section */}
      {/* =================================================== */}
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
            {/* ---------------- Image Column ---------------- */}
            <motion.div
              className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center"
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
                  height: "55vh",
                  objectFit: "contain",
                  background: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </motion.div>

            {/* ---------------- Text Column ---------------- */}
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
                className="dark-theme-font mb-3"
                style={{
                  textAlign: "justify",
                  fontSize: "1rem",
                  lineHeight: "1.7",
                }}
              >
                {service.description}
              </p>
              <hr className="border-primary opacity-50 w-25" />
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* =================================================== */}
      {/* Outro Section */}
      {/* =================================================== */}
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
            team ensures that every project aligns with your goals, reflects
            your vision, and connects with your audience. Creativity, precision,
            and professionalism define every service we offer.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Services;
