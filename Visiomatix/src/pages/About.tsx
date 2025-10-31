// ===========================================================
// Filename: About.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   About Us page for Visiomatix Media including a hero banner,
//   company story, vision, mission, and team profiles section.
//   Enhanced with SEO-optimized content and improved narrative clarity.
//
// Dependencies:
//   - React
//   - Bootstrap for layout and styling
// ===========================================================

import React from 'react';
// React core import for defining functional component

// ===========================================================
// Functional Component: About
// ===========================================================
const About: React.FC = () => {
  const bgImage = "/about/Digital-Marketing-Services-banner.jpg";

  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner Section */}
      {/* ============================================= */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          position: 'relative',
          marginBottom: '3rem',
        }}
      >
        {/* Overlay for contrast */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        ></div>

        {/* Banner Text */}
        <div style={{ position: 'relative', zIndex: 2,
                     backgroundColor: "rgba(0, 40, 80, 0.45)",
                     borderRadius: "12px",
                     width:"90%",
                     padding:"1em",
                     backdropFilter: "blur(5px)",
         }}>
          <h1 className="display-4 fw-bold">About Visiomatix Media</h1>
          <p className="lead">
            Empowering brands through creative storytelling, digital innovation, and technology-driven solutions that inspire growth.
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Company Story Section */}
      {/* ============================================= */}
      <section className="container mb-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/about/about us image.jpg"
              alt="Visiomatix Company Story"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p>
              Founded with a vision to redefine the intersection of creativity and technology, <strong>Visiomatix Media</strong> began as a small team of digital enthusiasts driven by passion, purpose, and imagination. Today, we stand as a multidisciplinary digital agency delivering solutions that connect brands to audiences through innovative storytelling and design.
            </p>
            <p>
              Our journey has always been fueled by curiosity and collaboration. From crafting visually stunning brand identities to executing impactful marketing campaigns, we help businesses thrive in a rapidly evolving digital landscape — where creativity isn’t just seen but felt.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Vision & Mission Section */}
      {/* ============================================= */}
      <section className="py-5 ">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-aqua">Our Vision & Mission</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="p-4 border-0 rounded shadow-sm h-100"
                style={{ backgroundColor: '#0b1e34' }}
              >
                <h4 className="fw-bold text-info">Our Vision</h4>
                <p className='text-light'>
                  To become a globally trusted creative and technology partner that empowers brands to lead through innovation, authenticity, and meaningful digital experiences. We envision a world where design and technology work together to shape the future of communication.
                </p>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="p-4 border-0 rounded shadow-sm h-100"
                style={{ backgroundColor: '#0b1e34' }}
              >
                <h4 className="fw-bold text-success">Our Mission</h4>
                <p className='text-light'>
                  To craft impactful digital experiences that resonate with audiences, inspire creativity, and deliver measurable results. Our mission is to merge art and analytics — designing strategies that drive engagement, enhance visibility, and elevate brands beyond expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* What We Offer Section */}
      {/* ============================================= */}
      <section
        className="text-light py-5"
        style={{
          backgroundImage: `url(/about/Whadoweoffer.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          height: '40vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h2 className="text-center fw-bold mb-4 text-aqua">What We Offer</h2>
          <p className="text-center w-75 mx-auto">
            At Visiomatix, we specialize in crafting comprehensive digital solutions tailored to each client’s unique vision. Our expertise includes branding, social media strategy, SEO optimization, photography, videography, animation, and web design.  
            Every project we take on is guided by a single purpose — to create immersive experiences that engage audiences and drive business growth.
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Team Profiles Section */}
      {/* ============================================= */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-5 text-light">Meet Our Team</h2>

        <div className="row justify-content-center">
          {/* Team Member 1 */}
          <div className="col-md-4 mb-4">
            <div
              className="card border-0 h-100 transition-all"
              style={{
                backgroundColor: '#102a4a',
                color: 'white',
                minHeight: '520px',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 15px rgba(0, 255, 255, 0.8)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 5px rgba(0, 255, 255, 0.4)')
              }
            >
              <img
                src="/team/rohitshinde.jpg"
                alt="Rohit Shinde - CEO of Visiomatix Media"
                className="card-img-top"
                style={{
                  objectFit: 'cover',
                  height: '320px',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
              <div className="card-body">
                <h5 className="fw-bold text-aqua">Rohit Shinde</h5>
                <p className="text-light mb-1">CEO & Founder</p>
                <p className="small text-secondary text-light">
                  A visionary entrepreneur and creative strategist, Rohit founded <strong>Visiomatix Media</strong> with a mission to redefine how stories are told in the digital age. His forward-thinking approach blends creativity with innovation — empowering brands to engage, inspire, and evolve.
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-md-4 mb-4">
            <div
              className="card border-0 h-100 transition-all"
              style={{
                backgroundColor: '#102a4a',
                color: 'white',
                minHeight: '520px',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 15px rgba(0, 255, 255, 0.8)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 5px rgba(0, 255, 255, 0.4)')
              }
            >
              <img
                src="/team/poojapatil.jpg"
                alt="Pooja Patil - Managing Director of Visiomatix Media"
                className="card-img-top"
                style={{
                  objectFit: 'cover',
                  height: '320px',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
              <div className="card-body">
                <h5 className="fw-bold text-aqua">Pooja Patil</h5>
                <p className="text-light mb-1">Managing Director</p>
                <p className="small text-secondary text-light">
                  A dynamic leader committed to creative excellence and brand innovation. Pooja drives operational success and ensures that every Visiomatix project reflects precision, passion, and purpose — turning ideas into visually compelling digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
