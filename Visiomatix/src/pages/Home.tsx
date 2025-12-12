/**
 * ===========================================================
 * File: src/pages/Home.tsx
 * Author: Viral Prajapati
 * Date: 12-Oct-2025
 * Description:
 *  This is the Home page of the Visiomatix website.
 *  It includes a carousel slider, multiple banner sections,
 *  the Founder Story, Team section, and services layout.
 * ===========================================================
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ServicesLayout from "../component/ServicesLayout";
import CarouselComponent from "../component/CarouselComponent";
import FeaturedServices from "../component/FeaturedServices";
import ContactFormSection from "../component/ContactFormSection"; // <-- CORRECTED PATH
import "../styles/ContactForm.css";
import PartnersandCertifications from "../component/PartnersandCertifications";
//import TestimonialsSection from "../pages/Testimonials";
import ClientLogos from "../component/ClientLogos";


{/*---icon */}
import emailIcon from "../assets/icons/email.svg";
import clockIcon from "../assets/icons/clock.svg";
import phoneIcon from "../assets/icons/phone.svg";
import ourOfficeIcon from "../assets/icons/map.svg";

const Home: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Visiomatix",
    "url": "https://visiomatix.com",
    "logo": "https://visiomatix.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/visiomatix",
      "https://www.twitter.com/visiomatix",
      "https://www.linkedin.com/company/visiomatix",
    ],
    description:
      "Visiomatix is a technology-driven digital marketing and web development company.",
  };

  return (
    <>
      {/* --------------------- SEO Section --------------------- */}
      <Helmet>
        <title>Visiomatix | Digital Marketing & Web Development Company</title>
        <meta
          name="description"
          content="Visiomatix empowers businesses with digital marketing, web development, SEO, and branding solutions."
        />
        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* --------------------- Page Animation Wrapper --------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
       // className="p-4 sm:p-6 md:p-8"
      >
        <div>
          {/* --------------------- Carousel --------------------- */}
          <CarouselComponent />

          {/* --------------------- Featured Services --------------------- */}
          <FeaturedServices />

          {/* --------------------- Top Banner --------------------- */}
          {/*<Banner
            title="Welcome to Visiomatix"
            subtitle="Innovating Vision with Technology"
            description="We redefine digital transformation through design & technology."
            bgImage={Banner1}
            height="40vh"
          />*/}

          {/* --------------------- Services Section --------------------- */}
          <ServicesLayout />


          {/* --------------------- CLIENT LOGOS SECTION --------------------- */}
        <ClientLogos />

          {/* ----------------------------------------------------
               NEW SECTION: FOUNDER STORY
          ---------------------------------------------------- */}
          <section className="py-5" style={{ backgroundColor: "#08172b" }}>
            <div className="container">
              <div className="row align-items-center">

                {/* Founder Image */}
                <div className="col-md-5 mb-4 mb-md-0">
                  <img
                    src="/team/rohitshinde.jpg"
                    alt="Rohit Shinde - Founder of Visiomatix Media"
                    className="img-fluid rounded shadow-lg"
                    style={{
                      border: "3px solid #e4ededff",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Founder Content */}
                <div className="col-md-7 text-light">
                  <h2 className="fw-bold mb-1" style={{ color: "#fff" }}>
                    Rohit Shinde
                  </h2>
                  <h3 className="mb-4" style={{ color: "#fff", fontSize: "1.25rem" }}>
                    FOUNDER & CEO DIGITIZE MATIX
                  </h3>


                  <p className="text-start">
                    Visiomatix Media was founded by
                    Rohit Shinde, a passionate graphic designer
                    and entrepreneur from Nashik. With years of hands-on
                    experience in digital arts, branding, and creative
                    storytelling, Rohit envisioned building an agency that
                    doesn’t just design but creates meaningful visual
                    experiences.
                  </p>

                  <p className="text-start">
                    His journey from working at
                    Shaurya Digital Arts to becoming the
                    Founder & CEO of Visiomatix Media is a true
                    story of passion and innovation. He leads with a belief in
                    empowering young creators and building a team that thrives
                    on creativity and collaboration.
                  </p>

                  <ul className="text-start text-light"
                    style={{ maxWidth: "90%" }}>
                    <li>Encourages innovation through creative freedom.</li>
                    <li>Empowers young designers and creators.</li>
                    <li>Leads with vision, teamwork, and integrity.</li>
                    <li>Turns bold ideas into impactful digital experiences.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/*-------------FAQ section*/}

          {/* <section className="py-5" style={{ backgroundColor: "#eaeef3ff" }}>
            <div className="container">
              <FAQ />
            </div>
          </section>*/}

          {/*-----------Global map-------*/}

              {/*<img src="/map/wolrdmap.jpeg" alt="World Map" />*/}

      {/* ----------- TESTIMONIALS SECTION (Home Page only) ----------- */}
       {/* <TestimonialsSection />*/}


    {/*-------------CONTACT SECTION---------------*/}
               <section id="contact">
                <ContactFormSection
                  ourOfficeIcon={ourOfficeIcon}
                  phoneIcon={phoneIcon}
                  emailIcon={emailIcon}
                  clockIcon={clockIcon}
                  phoneNumber="+91 70206 70894"
                  emailAddress="visiomatixmedia@gmail.com"
                  formData={{}}
                  handleChange={() => {}}
                  handleSubmit={() => {}}
                  handleCaptchaChange={() => {}}
                />
              </section>
                {/*-----------partners------- */}
                 <PartnersandCertifications/>

          {/* ----------------------------------------------------
               TEAM SECTION
          ---------------------------------------------------- */}

          {/* --------------------- Bottom Banner --------------------- */}
          {/*<Banner
            title="Crafting Digital Experiences"
            subtitle="Beautiful, Scalable, and Secure Solutions"
            description="We build digital ecosystems that elevate brands."
            bgImage={Banner2}
            height="40vh"
          />*/}

        </div>
      </motion.div>



      {/* --------------------- Mobile Font Fix --------------------- */}
      <style>
        {`
          @media screen and (max-width: 500px) {
            p {
              font-size: 12pt !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
