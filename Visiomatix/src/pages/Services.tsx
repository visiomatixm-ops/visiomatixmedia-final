/**
 * ===========================================================
 * Filename: Services.tsx
 * Author: Viral Prajapati
 * Date: 2025-11-01
 * Description:
 *  Visiomatix Media – Complete Digital, Design & Development Solutions
 *  Features:
 *   - Hero section with call-to-action
 *   - Each service category with SVG icons and bullet points
 *   - Bootstrap responsive layout + Framer Motion animations
 * ===========================================================
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";

// -----------------------------
// ICON IMPORTS
// -----------------------------
const DigitalIcon = "/services/icons/digital.svg";
const DesignIcon = "/services/icons/design.svg";
const DevIcon = "/services/icons/dev.svg";
const SoftwareIcon = "/services/icons/software.svg";
const EcommerceIcon = "/services/icons/ecommerce.svg";
const BrandingIcon = "/services/icons/branding.svg";
//const BulletIcon = "/services/icons/bullet.svg"; // small SVG circle/checkmark

// -----------------------------
// Component: Services
// -----------------------------
const Services: React.FC = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Digital Marketing Services",
      image: "about/services-section/01-Digital Marketing Services.png",
      icon: DigitalIcon,
      description:
        "Comprehensive digital marketing strategies designed to grow your business online and reach your audience effectively across all channels.",
      bullets: [
        "Social Media Marketing (SMM)",
        "Search Engine Optimization (SEO)",
        "Google Ads & Pay-Per-Click (PPC) Campaigns",
        "Email & Influencer Marketing",
        "Content & Video Marketing",
        "Online Reputation Management (ORM)",
        "E-commerce Marketing",
        "Analytics & ROI Tracking",
      ],
    },
    {
      title: "Design & Creative Services",
      image: "about/services-section/02-Design Services.png",
      icon: DesignIcon,
      description:
        "From visual identity to immersive digital experiences — our creative team crafts stunning visuals that communicate your brand’s essence.",
      bullets: [
        "UI/UX Design",
        "Graphic Design (Logo, Brochure, Branding)",
        "Motion Graphics & Animation",
        "YouTube Thumbnails & Video Assets",
        "3D Product Visualization",
        "Visual Effects (VFX) & Post-Production",
        "Product Photography & Videography",
      ],
    },
    {
      title: "Web & App Development",
      image: "about/services-section/03-Web & App Development.png",
      icon: DevIcon,
      description:
        "We build secure, scalable, and high-performing websites and apps optimized for performance, conversion, and cross-device experiences.",
      bullets: [
        "Web App Development",
        "Website Design & Development (Static / Dynamic / E-commerce)",
        "Mobile App Development",
        "Landing Page Optimization",
        "Custom Web Solutions",
      ],
    },
    {
      title: "Business Software Solutions",
      image: "about/services-section/04-Branding Strategy.png",
      icon: SoftwareIcon,
      description:
        "Streamline operations and automate workflows with tailored business software built to enhance productivity and customer relationships.",
      bullets: [
        "ERP Development",
        "CRM Development",
        "HRMS Development",
        "AI Voice Sales Assistant Integration",
        "Business Automation Tools",
      ],
    },
    {
      title: "E-commerce Solutions",
      image: "about/services-section/05-E-commerce Solutions.png",
      icon: EcommerceIcon,
      description:
        "Build and grow your online store with our end-to-end e-commerce solutions, optimized for conversions, payments, and marketplace growth.",
      bullets: [
        "E-commerce Website Development",
        "Marketplace Advertising (Amazon, Flipkart, etc.)",
        "Product Listing Optimization",
        "Payment Gateway Integration",
      ],
    },
    {
      title: "Branding & Strategy",
      image: "about/services-section/06-Business Software Solutions.png",
      icon: BrandingIcon,
      description:
        "Define, position, and promote your brand with strategic insights and powerful creative campaigns that drive recognition and loyalty.",
      bullets: [
        "Brand Identity & Positioning",
        "Marketing Strategy & Funnel Planning",
        "Campaign Ideation & Execution",
        "Competitor & Market Research",
      ],
    },
  ];


// ----------------------------------------------------------- // 
// Hero section parallax setup //
//  -----------------------------------------------------------//
 const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"], }); 
 const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); 
 // ----------------------------------------------------------- //
 //  Staggered text animation variants //
 //  -----------------------------------------------------------//
  const textVariants = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 }, }), };

  return (
    <div className="services-page bg-light">
      {/* =================================================== */} 
      {/* Hero Section with Parallax Background */} 
      {/* =================================================== */} 
      <section 
      ref={heroRef} 
      className="jumbotron text-center text-light d-flex align-items-center justify-content-center position-relative py-4 py-sm-3 py-md-2" 
      style={{ 
        height: "clamp(50vh, 65vh, 75vh)", 
        overflow: "hidden", 
        marginBottom: "2rem",
        marginTop:"5rem" }} 
        >

        {/* Background motion layer */} <motion.div style={{
          backgroundImage: "url('/about/our services.png')",
           backgroundSize: "cover",
           backgroundPosition: "center", y: yParallax, }}
           className="position-absolute w-100 h-100" />
         {/* Dark overlay for text contrast */}
          <div className="position-absolute w-100 h-100" 
          style={{ 
           // backgroundColor: "rgba(0,0,0,0.6)" 
            }} 
            >
              </div> {/* Staggered reveal text block */}
          <div className="position-relative z-3 container px-2 px-sm-3 px-md-4 px-lg-5 py-2 py-sm-3 py-md-4 mx-1 mx-sm-2 mx-md-3 mx-lg-4" 
          style={{ position: "relative", 
          zIndex: 2, 
          //backgroundColor: "rgba(0, 40, 80, 0.45)", 
          borderRadius: "12px", 
          backdropFilter: "blur(5px)", 
          maxWidth: "90%", 
          marginTop: "5em", 
          wordWrap: "break-word",
           overflowWrap: "break-word" }} >
            <motion.h1 className="display-6 display-sm-5 display-md-4 display-lg-3 fw-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} >
              Our Services </motion.h1>
            <motion.hr className="border-primary opacity-75 w-25 mx-auto"
            variants={textVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            custom={1} />
             <motion.p className="small fs-7 fs-sm-6 fs-md-5 text-xs sm:text-sm md:text-base"
             variants={textVariants} initial="hidden"
             whileInView="visible" viewport={{ once: true }}
             custom={2} >
             Explore our comprehensive range of creative and digital services, thoughtfully designed to elevate your brand presence across multiple platforms. From innovative graphic design and visually striking branding solutions to data-driven digital marketing strategies, we help you connect with your target audience and boost engagement at every touchpoint.
             </motion.p> 
             {/* <motion.p className="small fs-7 fs-sm-6 fs-md-5" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} > Our services are crafted to deliver measurable results, whether online or offline. Leverage our expertise in website design and development, social media marketing, search engine optimization (SEO), content creation, and multimedia campaigns to ensure your brand not only stands out but also drives conversions and business growth.
              </motion.p>  */}
              {/* <motion.p className="small fs-7 fs-sm-6 fs-md-5" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} > Partner with us to transform your ideas into impactful campaigns, increase visibility, and maximize ROI through tailored strategies that resonate with your audience and strengthen your market presence.

                </motion.p> */}
                      <motion.button
                        className="btn btn-light fw-semibold px-2 px-sm-3 px-md-4 py-1 py-sm-2 mt-2 mt-sm-3 btn-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/contact')}
                      >
                        Get a Proposal →
                      </motion.button>
                </div> </section>
      {/* =========================
          HERO SECTION
       ========================= */}
       

      {/* =========================
          SERVICE CATEGORIES
       ========================= */}
      <section className="py-5">
        <div className="container">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className={`row align-items-center py-5 ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* IMAGE / ICON */}
              <div className="col-md-5 text-center mb-4 mb-md-0">
                <motion.img
                  src={cat.image}
                  alt={`${cat.title} image`}
                  className="img-fluid rounded shadow-sm mb-3"
                  style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />

              </div>

              {/*b text on left CONTENT */}
             <div className="col-md-6 order-md- text-start">
                {/* Title centered */}
              <h2 className="fw-bold text-dark mb-3 h3 d-flex align-items-center">                  <motion.img
                    src={cat.icon}
                    alt={`${cat.title} icon`}
                    className="img-fluid p-2 bg-white shadow-sm me-2"
                    style={{ width: "50px", height: "50px" }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                {cat.title}
                </h2>
                <p className="text-dark mb-3 fs-6 text-start">
                  {cat.description}
                  </p>
                <ul className="list-unstyled mt-3 ps-0 text-start">
                  {cat.bullets.map((point, i) => (
                    <li
                      key={i}
                      //className="d-flex align-items-start mb-2 "
                      style={{
                            display:"flex",
                            alignItems:"baseline",
                            gap:"10px",
                            marginBottom:"10px",

                      }}  
                    >
                       <span
                          //className="me-2"
                          style={{
                            fontSize: "22px",
                            lineHeight: "24px",
                            color: "#102a4a",
                           // display: "inline-flex",
                           // alignItems: "center",
                            //justifyContent: "center",
                            marginTop: "14px",
                            textAlign:"center",
                            //flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                      
                        {/*Bullet text */}
                        <span
                            style={{
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#212529",
                            }}
                          >
                            {point}
                          </span>
                                        
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
