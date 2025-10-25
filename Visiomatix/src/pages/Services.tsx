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
 *   - SEO-optimized, descriptive service content for digital marketing and creative media
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
        "Transform raw footage into professional, cinematic-quality videos with our expert video editing services. Utilizing industry-standard tools like Adobe Premiere Pro and DaVinci Resolve, we enhance storytelling through precise color grading, smooth transitions, motion effects, and sound design. Perfect for marketing campaigns, brand storytelling, YouTube content, and corporate videos, our editing services help your content stand out and captivate audiences.",
    },
    {
      image: "/services/animation.jpg",
      title: "2D/3D Animation",
      description:
        "Bring imagination to life with our high-quality 2D and 3D animation services. We create engaging explainer videos, animated commercials, and character-driven storytelling for brands, startups, and enterprises. Our animations not only attract attention but also improve brand recall and simplify complex messages, making your communication both entertaining and effective.",
    },
    {
      image: "/services/branding.jpg",
      title: "Brand Design",
      description:
        "Build a powerful and memorable brand identity with our branding services. From logos, typography, and color palettes to complete brand guidelines, we craft cohesive visual systems that resonate with your target audience. Our branding solutions focus on enhancing recognition, credibility, and trust, ensuring your brand stands out in competitive markets.",
    },
    {
      image: "/services/photography.jpg",
      title: "Photography",
      description:
        "Capture the essence of your brand, products, or events with professional photography. Our team specializes in product photography, lifestyle shoots, corporate portraits, and event coverage. With attention to lighting, composition, and storytelling, we create visually compelling images that strengthen your brand identity and increase engagement across digital channels.",
    },
    {
      image: "/services/videography.png",
      title: "Videography",
      description:
        "Deliver cinematic storytelling through our expert videography services. We cover corporate events, product launches, promotional campaigns, and creative content production. Every frame is crafted to engage your audience, reflect your brand’s identity, and leave a lasting impression that drives visibility and growth.",
    },
    {
      image: "/services/webdesign.jpg",
      title: "Web Design",
      description:
        "Design impactful, responsive, and visually striking websites that enhance user experience and drive conversions. We specialize in creating user-friendly interfaces, intuitive navigation, and seamless mobile optimization. Each website is strategically designed to reflect your brand identity, attract visitors, and convert them into loyal customers.",
    },
    {
      image: "/services/motion.jpg",
      title: "Motion Graphics",
      description:
        "Bring your brand to life with dynamic motion graphics that communicate ideas effectively. We design animations for social media, presentations, advertisements, and explainer videos. By combining design, movement, and storytelling, our motion graphics help increase engagement, retention, and brand awareness across multiple platforms.",
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
        <div className="position-relative z-3" 
                style={{
                  position: "relative",
                  zIndex: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  width:"90%",
                  padding:"1em",
                  backdropFilter: "blur(5px)",
                }}
        >
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
          Explore our comprehensive range of creative and digital services, thoughtfully designed to elevate your brand presence across multiple platforms. From innovative graphic design and visually striking branding solutions to data-driven digital marketing strategies, we help you connect with your target audience and boost engagement at every touchpoint.
                </motion.p>
        <motion.p
            className="lead"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >      
          Our services are crafted to deliver measurable results, whether online or offline. Leverage our expertise in website design and development, social media marketing, search engine optimization (SEO), content creation, and multimedia campaigns to ensure your brand not only stands out but also drives conversions and business growth.
                </motion.p>
        <motion.p
            className="lead"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >   
          Partner with us to transform your ideas into impactful campaigns, increase visibility, and maximize ROI through tailored strategies that resonate with your audience and strengthen your market presence.
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
                alt={service.title + " - Professional Service by Visiomatix Media"}
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
            At Visiomatix Media, we combine creativity, technology, and strategy
            to deliver outstanding digital solutions. From conceptualization to
            execution, every service is designed to enhance brand identity,
            increase audience engagement, and generate measurable business
            results. Partner with us to transform ideas into compelling visual
            experiences that leave a lasting impact.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Services;
