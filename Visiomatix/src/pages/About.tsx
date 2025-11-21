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
//   - Bootstrap for layout and styling (Implied by class names)
// ===========================================================

import React from "react";

// ===========================================================
// Sub-Component: BannerContent (Hero Header Text)
// ===========================================================
const About: React.FC = () => {
  const bgImage = "/about/Digital-Marketing-Services-banner.jpg";

  // Reusable hover effect for Vision/Mission cards
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, isOver: boolean) => {
    const element = e.currentTarget;
    if (isOver) {
      element.style.transform = "translateY(-6px)";
      element.style.boxShadow = "0 0 18px rgba(0,191,255,0.6)";
    } else {
      element.style.transform = "translateY(0)";
      element.style.boxShadow = "0 0 12px rgba(0,191,255,0.4)";
    }
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#0b1e34",
    color: "#ffffff",
    borderRadius: "16px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 0 12px rgba(0,191,255,0.4)",
    textAlign: "left",
    padding: "2rem",
    width: "100%",
    height: "100%",
  };

  const listStyle: React.CSSProperties = {
    listStyleType: "disc",
    textAlign: "left",
    paddingLeft: "1.5rem",
    margin: "0",
    lineHeight: "1.8",
  };

  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner Section */}
      {/* ============================================= */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
          marginBottom: "3rem",
          marginTop: "5rem",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(14, 5, 5, 0.6)",
          }}
        />
        {/* Hero Content */}
        <div style={{ zIndex: 2, position: "relative" }}>
          <h1 className="display-4 fw-bold">Welcome to Visiomatix Media</h1>
          <p className="lead">Creative Growth Partner in the Digital World</p>
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
          style={{ width: "110%", height: "auto" }}
        />
      </div>
      {/* *** CODE CHANGED HERE *** */}
      {/* Changed 'col-md-6 text-light' to 'col-md-6 text-dark' or just 'col-md-6' */}
      <div className="col-md-6 text-dark"> 
        <h2 className="fw-bold mb-3">Our Story</h2>
        <p>
          Every big brand starts with a bold idea and so did we. Visiomatix Media was founded with a simple yet powerful mission: to bring creative vision and digital innovation together under one roof.
    
          What began as a small team of passionate designers, developers, and marketers has evolved into a growing agency focused on helping businesses build their identity, expand their reach, and achieve real results online.
       
      
          We may be new, but our ideas are bold, our energy is unstoppable, and our commitment to our clients is unmatched.
        
          At Visiomatix Media, we believe that great design, smart marketing, and strong strategy can transform any business no matter its size into a brand that stands out.
        
          From branding and design to digital marketing and web development, every project we take on is an opportunity to create impact, tell stories that matter, and grow alongside our clients.
      
          We’re not just another agency we’re your creative growth partner in the digital world.
        </p>
      </div>
    </div>
</section>

      {/* ============================================= */}
      {/* Vision & Mission Section */}
      {/* ============================================= */}
     <section className="py-5">
  <div className="container text-center">
<h2
  className="fw-bold mb-4 text-center text-sm sm:text-base md:text-lg lg:text-xl"
  style={{ color: "#000000" }} // <-- Black color
>
  Our Vision & Mission
</h2>
    <div className="row">
      <div className="col-md-6 mb-4">
        <div
          className="p-4 border-0 rounded shadow-sm h-100"
          style={{ backgroundColor: '#0b1e34' }}
        >
          <h4 className="fw-bold text-info">Our Vision</h4>

          <p className="text-light mb-4"

          style={{

                    color: '#ffffff',

                    fontSize: '0.9rem',

                    lineHeight: '1.7',

                    textAlign: 'left',

                    paddingLeft: '1.7rem',

                  }}>

            To become a globally trusted creative and technology partner that empowers brands to lead through innovation, authenticity, and meaningful digital experiences.

          </p>

          <ul className="text-light text-start mx-auto" 

          style={{

                    maxWidth: '100%',

                    paddingLeft: '1.9rem',

                    marginBottom: 0,

                    listStyleType: 'disc',

                    color: '#ffffff',

                    lineHeight: '1.5',

                    fontSize: '0.9rem',

                  }}>

            <li>Build a future where design and technology work together seamlessly.</li>

            <li>Inspire creativity that drives measurable growth for brands.</li>

            <li>Set new standards in digital storytelling and brand communication.</li>

            <li>Grow into a recognized global agency known for innovation and integrity.</li>

          </ul>

        </div>

      </div>

      <div className="col-md-6 mb-4">

        <div

          className="p-4 border-0 rounded shadow-sm h-100"

          style={{ backgroundColor: '#0b1e34' }}

        >

          <h4 className="fw-bold text-info">Our Mission</h4>

                <p

                  className="text-light mb-4"

                  style={{

                    color: '#ffffff',

                    fontSize: '0.9rem',

                    lineHeight: '1.5',

                    textAlign: 'left',

                    paddingLeft: '1.7rem',

                  }}

                >

                  To craft impactful digital experiences that resonate with audiences, inspire

                  creativity, and deliver measurable results for every client.

                </p>

                <ul

                  className="text-light text-start text"

                  style={{

                    maxWidth: '100%',

                    paddingLeft: '1.7rem',

                    marginBottom: 0,

                    listStyleType: 'disc',

                    color: '#ffffff',

                    lineHeight: '1.7',

                    fontSize: '0.9rem',

                  }}

                >

                  <li>Deliver innovative, high-quality, and result-driven media solutions.</li>

                  <li>Build long-term relationships through transparency, trust, and collaboration.</li>

                  <li>Empower young creators and professionals to grow in the digital landscape.</li>

                  <li>Bridge art and analytics — creating strategies that inspire and perform.</li>

                </ul>

        </div>

      </div>

    </div>

  </div>

</section>




      {/* ============================================= */}
      {/* What We Offer Section */}
      {/* ============================================= */}
      <section className="what-we-offer-section text-light py-4 py-md-5" >
        <div className="background-overlay" ></div>
        <div
          className="container position-relative content-wrapper"
          style={{
            background: "#0b1e3494",
            borderRadius: "12px",
          }}
        >
          {/*update :blue text-aqua-> white*/}
          <h2 className="text-center fw-bold mb-3 mb-md-4 responsive-heading"style={{ color: "#ffffff" }}>
            What We Offer
          </h2>
          <p className="text-center responsive-text mx-auto">
            At Visiomatix, we specialize in crafting comprehensive digital solutions tailored to each client's unique vision. Our expertise includes branding, social media strategy, SEO optimization, photography, videography, animation, and web design.
            Every project we take on is guided by a single purpose — to create immersive experiences that engage audiences and drive business growth.
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Team Profiles Section (Leadership) */}
      {/* ============================================= */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-5" style={{ color: "#ffffff" }}>Meet Our Team</h2>

        <div className="row justify-content-center">

          {/* Team Member 1 - CEO */}
          <div className="col-md-4 mb-4">
            <div
              className="card border-0 h-100 transition-all"
              style={{
                backgroundColor: '#102a4a',
                 color: '#ffffff',
                minHeight: '520px',
                boxShadow: '0 0 5px rgba(230, 241, 241, 0.4)',
                borderRadius: '12px',
                
              }}
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
                <h5 className="fw-bold" style={{ color: "#ffffff" }} >Rohit Shinde</h5>
                <p className="text-light mb-1">CEO & Founder</p>
                <p className="small text-secondary text-light">
                  A visionary entrepreneur and creative strategist, Rohit founded <strong>Visiomatix Media</strong> with a mission to redefine how stories are told in the digital age. His forward-thinking approach blends creativity with innovation — empowering brands to engage, inspire, and evolve.
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 2 - MD */}
          <div className="col-md-4 mb-4">
            <div
              className="card border-0 h-100 transition-all"
              style={{
                backgroundColor: '#102a4a',
                color: '#ffffff',
                minHeight: '520px',
                boxShadow: '0 0 5px rgba(216, 224, 224, 0.4)',
                borderRadius: '12px',
              }}
              
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
                <h5 className="fw-bold" style={{ color: "#ffffff" }}>Pooja Patil</h5>
                 <p style={{ color: "#ffffff" }}>Managing Director</p>
                 <p className="small" style={{ color: "#ffffff" }}>
                  A dynamic leader committed to creative excellence and brand innovation. Pooja drives operational success and ensures that every Visiomatix project reflects precision, passion, and purpose — turning ideas into visually compelling digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* The Founder's Story Section */}
      {/* ============================================= */}
      <section className="py-5" style={{ backgroundColor: '#08172b' }}>
        <div className="container">
          <div className="row align-items-center">
            
            {/* Founder Image */}
            <div className="col-md-5 mb-4 mb-md-0">
              <img
                src="/team/rohitshinde.jpg"
                alt="Rohit Shinde - Founder of Visiomatix Media"
                className="img-fluid rounded shadow-lg"
                style={{
                  border: '3px solid #e4ededff',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Founder Content */}
            <div className="col-md-7 text-light">
              <h2 className="fw-bold mb-3"  style={{ color: "#fff" }}>The Founder's Story</h2>
              <p>
                <strong>Visiomatix Media</strong> was founded by <strong>Rohit Shinde</strong>, 
                a passionate graphic designer and entrepreneur from Nashik. With years of hands-on 
                experience in digital arts, branding, and creative storytelling, Rohit envisioned 
                building an agency that doesn’t just “design” — but creates experiences that speak volumes.
              </p>
              <p>
                His journey from working as a graphic designer at <strong>Shaurya Digital Arts</strong> <br/>
                to becoming the <strong>Founder & CEO of Visiomatix Media</strong> is a true story 
                of passion, persistence, and innovation. Rohit believes in nurturing talent, adapting 
                to evolving trends, and building a team that thrives on creativity, collaboration, and trust.
              </p>
              <ul className="text-start text-light" style={{ maxWidth: '90%' }}>
                <li>Encourages innovation through creative freedom.</li>
                <li>Focuses on empowering young designers and creators.</li>
                <li>Leads with transparency, teamwork, and vision.</li>
                <li>Believes in turning bold ideas into impactful digital experiences.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* ============================================= */}
      {/* Meet the Rest of the Team Section */}
      {/* ============================================= */}
                    <section className="container text-center my-5">
                      <h2 className="fw-bold mb-4" style={{ color: "#000" }}>
                          Meet the Rest of the Team
                    </h2>
                <p className="mb-5 w-75 mx-auto" style={{ color: "#000" }}>
                  At <strong>Visiomatix Media</strong>, our team is our biggest strength.
                  We are a diverse group of designers, developers, marketers, and strategists
                  united by one goal — to create meaningful, result-driven digital experiences
                  that help brands grow and connect.
                </p>
                    <div className="row justify-content-center">

                        {/* HR Team */}
                        <div className="col-md-3 mb-4">
                <div
                  className="card border-0 h-100 text-light"
                  style={{
                    backgroundColor: '#102a4a',
                    boxShadow: '0 0 5px rgba(13, 22, 22, 0.4)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                                }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 0 15px rgba(227, 233, 233, 0.8)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '0 0 5px rgba(227, 238, 238, 0.4)')
                  }
                >
                  <img
                    src="/people/Person2.jpeg"
                    alt="Dharshinie Anbazhagan - HR"
                    className="card-img-top"
                    style={{
                      height: '216px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold" style={{ color: "#fff" }}>Dharshinie Anbazhagan</h5>
                    <p className="text-light mb-1">Human Resources (HR)</p>
                    <p className="small text-secondary text-light">
                      Leads with a people-first approach — fostering collaboration, creativity,
                      and a strong workplace culture at Visiomatix Media.
                    </p>
                  </div>
                </div>
              </div>

          {/* Design Team */}
          <div className="col-md-3 mb-4">
            <div
              className="card border-0 h-100 text-light"
              style={{
                backgroundColor: '#102a4a',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(229, 236, 236, 0.8)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 5px rgba(231, 238, 238, 0.4)')
              }
            >
              <img
                src="/people/Person1.jpeg"
                alt="Design Team"
                className="card-img-top"
                style={{
                  height: '216px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
              <div className="card-body">
                <h5 className="fw-bold" style={{ color: "#fff" }}>Design Team</h5>
                <p className="text-light mb-1">Creative Department</p>
                <p className="small text-secondary text-light">
                  A passionate group of visual thinkers specializing in branding,
                  motion graphics, and UI/UX — turning ideas into stunning digital visuals.
                </p>
              </div>
            </div>
          </div>

          {/* Marketing Team */}
          <div className="col-md-3 mb-4">
            <div
              className="card border-0 h-100 text-light"
              style={{
                backgroundColor: '#102a4a',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(226, 239, 239, 0.8)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 5px rgba(228, 240, 240, 0.4)')
              }
            >
              <img
                src="/people/Person3.jpeg"
                alt="Marketing Team"
                className="card-img-top"
                style={{
                  height: '216px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
              <div className="card-body">
                <h5 className="fw-bold" style={{ color: "#fff" }}>Marketing Team</h5>
                <p className="text-light mb-1">Digital Strategy</p>
                <p className="small text-secondary text-light">
                  SEO experts, social media specialists, and ad strategists — driving engagement
                  and helping brands build lasting digital connections.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Team */}
          <div className="col-md-3 mb-4">
            <div
              className="card border-0 h-100 text-light"
              style={{
                backgroundColor: '#102a4a',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.4)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(240, 252, 252, 0.8)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 5px rgba(213, 232, 232, 0.4)')
              }
            >
              <img
                src="/people/Person3.jpeg"
                alt="Tech Team"
                className="card-img-top"
                style={{
                  height: '216px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              />
              <div className="card-body">
                <h5 className="fw-bold"style={{ color: "#fff" }}>Tech Team</h5>
                <p className="text-light mb-1">Development & IT</p>
                <p className="small text-secondary text-light">
                  Web developers and IT professionals who bring creativity to life — ensuring
                  every digital experience is smooth, fast, and functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Custom Styles */}
      {/* ============================================= */}
      <style>
        {`
          /* Note: The 'text-aqua' class is not defined in standard Bootstrap; 
             it is assumed to be a custom class, likely defined elsewhere
             or meant to be a direct style like #00ffff. */
             
          .text-aqua {
              color: #00ffff !important; /* Adding direct color for clarity */
          }

          @media screen and (max-width: 500px) {
            p {
              font-size: 12pt !important;
            }
          }

          .what-we-offer-section {
            background-image: url(/about/Whadoweoffer.webp);
            background-size: cover;
            background-position: center;
            position: relative;
            min-height: 40vh;
            display: flex;
            align-items: center;
          }

          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
          }

          .content-wrapper {
            z-index: 2;
            padding: 2rem 1rem;
          }

          .responsive-heading {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            line-height: 1.2;
          }

          .responsive-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.6;
            max-width: 90%;
            width: 100%;
          }

          @media screen and (max-width: 500px) {
            .what-we-offer-section {
              min-height: 50vh;
              padding: 3rem 0;
            }

            .content-wrapper {
              padding: 1.5rem 1rem;
            }

            .responsive-heading {
              font-size: 1.25rem;
              margin-bottom: 1rem !important;
            }

            .responsive-text {
              font-size: 12pt !important;
              line-height: 1.5;
              max-width: 95%;
            }
          }
        `}
      </style>
    </>
  );
};

export default About;