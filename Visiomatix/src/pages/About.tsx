// ===========================================================
// Filename: About.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   About Us page for Visiomatix Media including a hero banner,
//   company story, vision, mission, and team profiles section.
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
  const bgImage = "/about/banner.webp";

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
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="display-4 fw-bold">About Visiomatix Media</h1>
          <p className="lead">
            Where Creativity Meets Innovation in the World of Digital Media.
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
              src="/about/Digital-Marketing-Services-banner.jpg"
              alt="Company Story"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6 text-light">
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p>
              Founded with a vision to redefine creativity, <strong>Visiomatix Media</strong> began its journey as a small team of passionate creators. Over time, we’ve evolved into a full-fledged digital agency providing comprehensive solutions across design, media, and technology.
            </p>
            <p>
              From concept to execution, our team blends strategy with storytelling to help brands grow in today’s digital-first world.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Vision & Mission Section */}
      {/* ============================================= */}
      <section className="py-5 bg-dark text-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-aqua">Our Vision & Mission</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="p-4 border-0 rounded shadow-sm h-100"
                style={{ backgroundColor: '#0b1e34' }}
              >
                <h4 className="fw-bold text-info">Our Vision</h4>
                <p>
                  To become a globally recognized media house that inspires creativity, empowers brands, and drives innovation in digital storytelling.
                </p>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="p-4 border-0 rounded shadow-sm h-100"
                style={{ backgroundColor: '#0b1e34' }}
              >
                <h4 className="fw-bold text-success">Our Mission</h4>
                <p>
                  To deliver impactful visual experiences by combining art, technology, and strategy — transforming ideas into engaging digital realities that connect with audiences.
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
            Our expertise spans across branding, digital marketing,
            photography, videography, animation, and web design.  
            Each project we undertake is an opportunity to innovate,
            inspire, and deliver exceptional visual experiences.
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
                backgroundColor: '#102a4a', // Lighter navy
                color: 'white',
                minHeight: '520px',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)', // Aqua glow
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
                alt="Rohit Shinde"
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
                <p className="small text-secondary">
                  A visionary leader shaping the future of digital storytelling. With a passion for creativity and innovation, Rohit founded Visiomatix Media to bridge art and technology — delivering impactful visuals and transformative experiences.
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
                alt="Pooja Patil"
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
                <p className="small text-secondary">
                  A dynamic leader driving creative excellence and operational growth. Pooja ensures Visiomatix Media continues to deliver impactful stories and visionary media experiences.
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
