/**
 * ===========================================================
 * Filename: blog.tsx
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Visiomatix Blog Page (Light Theme)
 *   Elegant light layout with navy-blue typography,
 *   smooth hover animations, and Framer Motion transitions.
 * ===========================================================
 */

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const blogPosts = [
  {
    image: "/about/Social-Media-Infographics-in-Detail-1.jpg",
    title: "Top 5 Digital Marketing Trends to Watch in 2025",
    excerpt:
      "The digital landscape is evolving faster than ever. Explore emerging trends like AI-driven marketing, influencer authenticity, and video-first content that define 2025’s marketing playbook.",
    author: "Visiomatix Media Team",
    date: "October 2, 2025",
  },
  {
    image: "services/branding.jpg",
    title: "Building a Powerful Brand Identity That Stands Out",
    excerpt:
      "Consistency, storytelling, and purpose drive brand identity. Learn how our creative team crafts visual experiences that connect emotionally with audiences.",
    author: "Creative Division",
    date: "September 25, 2025",
  },
  {
    image: "services/webdesign.jpg",
    title: "Why Responsive Web Design Is Crucial for Modern Businesses",
    excerpt:
      "A seamless user experience across all devices boosts engagement and conversions. Discover our design philosophy behind intuitive, mobile-first websites.",
    author: "Web Development Team",
    date: "September 10, 2025",
  },
  {
    image: "services/photography.jpg",
    title: "How Professional Photography Can Transform Your Brand Image",
    excerpt:
      "Photography goes beyond visuals — it's brand storytelling. See how high-quality imagery builds trust and enhances your digital presence.",
    author: "Photography Studio",
    date: "August 30, 2025",
  },
  {
    image: "services/social-media-networks.jpg",
    title: "Mastering Social Media Strategy in the Attention Economy",
    excerpt:
      "In an era where attention is the new currency, crafting scroll-stopping content is an art. Explore tips to dominate Instagram, LinkedIn, and YouTube with intent.",
    author: "Social Media Division",
    date: "August 12, 2025",
  },
  {
    image: "services/seo-infographic-concept-background_823925-1180.jpg",
    title: "SEO in 2025: Beyond Keywords — It's About Intent",
    excerpt:
      "Google's algorithms now reward authenticity and relevance. Learn how our SEO experts blend human psychology and data-driven strategy to improve rankings.",
    author: "SEO & Analytics Team",
    date: "July 28, 2025",
  },
  {
    image: "services/videography.png",
    title: "The Rise of Video Storytelling in Brand Campaigns",
    excerpt:
      "Short-form videos and cinematic brand films are reshaping online engagement. Discover how we bring stories to life through strategic visual narratives.",
    author: "Production House",
    date: "July 10, 2025",
  },
  {
    image: "services/editing.webp",
    title: "Design Thinking: The Secret to Better UI/UX Experiences",
    excerpt:
      "At Visiomatix, design isn't just visual — it's emotional. We share how user empathy and design thinking drive every digital interface we create.",
    author: "UI/UX Design Lab",
    date: "June 30, 2025",
  },
];

const Blog: React.FC = () => {
  return (
    <>
      {/* ====================== SEO Metadata Section ====================== */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>Visiomatix Media Blog | Digital Marketing, Tech Trends & Insights</title>
        <meta
          name="description"
          content="Stay updated with the latest trends in digital marketing, web development, and technology innovation from the experts at Visiomatix Media."
        />
        <meta name="keywords" content="Visiomatix blog, digital marketing blog, tech trends, web development insights, SEO tips, branding strategies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.visiomatix.com/blog" />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Visiomatix Media Blog | Digital Marketing, Tech Trends & Insights" />
        <meta property="og:description" content="Stay updated with the latest trends in digital marketing, web development, and technology innovation from the experts at Visiomatix Media." />
        <meta property="og:url" content="https://www.visiomatix.com/blog" />
        <meta property="og:image" content="https://www.visiomatix.com/about/Social-Media-Infographics-in-Detail-1.jpg" />
        <meta property="og:site_name" content="Visiomatix Media" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Visiomatix Media Blog | Digital Marketing, Tech Trends & Insights" />
        <meta name="twitter:description" content="Stay updated with the latest trends in digital marketing, web development, and technology innovation from the experts at Visiomatix Media." />
        <meta name="twitter:image" content="https://www.visiomatix.com/about/Social-Media-Infographics-in-Detail-1.jpg" />
      </Helmet>
      {/* ====================== Page Fade Animation ====================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* ====================== Hero Banner ====================== */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "url('/about/blog image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "clamp(40vh, 60vh, 70vh)",
          position: "relative",
          marginBottom: "2rem",
          marginTop: "5rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 40, 80, 0.45)",
          }}
        />
        <div style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(0, 40, 80, 0.45)",
          borderRadius: "12px",
          width: "clamp(85%, 90%, 95%)",
          maxWidth: "100%",
          padding: "clamp(1rem, 3vw, 2rem)",
          backdropFilter: "blur(5px)",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          marginTop: "7em",
        }}>
           <h1 className="display-5 display-sm-6 fw-bold text-white mb-3 mb-sm-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
             Visiomatix Media Blog
           </h1>
           <p className="lead text-white-80 mb-0 text-xs sm:text-sm md:text-base lg:text-lg" style={{ lineHeight: "1.6" }}>
             Insights, trends, and creative updates from our digital experts.
             Welcome to the Visiomatix Media Blog — your go-to destination for the latest in
             technology, innovation, and digital transformation.
             Here, we share expert insights, industry trends, and success stories that inspire
              businesses to stay ahead in an ever-evolving digital world.
              At Visiomatix, we believe that knowledge grows when it's shared.
              Whether you're a startup exploring new tech solutions or an enterprise
              scaling your digital infrastructure, our blog delivers valuable perspectives to
              help you make informed decisions.
           </p>
         </div>
      </section>

      {/* ====================== Blog Grid Section ====================== */}
      <div className="blog">
        <Container className="mb-5">
          <Row className="g-4 card-row">
            {blogPosts.map((post, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="blog-card shadow-sm rounded-4 border-0 h-100 hover-lift">
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    className="blog-card-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <h6 className="fw-bold text-navy mb-2 text-sm sm:text-base">{post.title}</h6>
                    <p className="text-secondary small mb-2 text-xs sm:text-sm">
                      {post.date} • {post.author}
                    </p>
                    <p
                      className="flex-grow-1 text-muted text-xs sm:text-sm"
                    >
                      {post.excerpt}
                    </p>
                    <div className="text-center mt-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="fw-semibold"
                      >
                        Read More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* ====================== Light Theme Styles ====================== */}
        <style>
          {`
            @media screen and (max-width: 500px) {
              p {
                font-size: 12pt !important;
              }

              .smalltypography {
                font-size: 10pt !important;
              }
            }

            .text-navy {
              color: #0b1e34 !important;
            }

            .blog-card {
              background-color: #ffffff;
              color: #0b1e34 !important;
              transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
              border: 1px solid rgba(10, 45, 80, 0.08);
            }

            .blog-card:hover {
              transform: translateY(-6px);
              background-color: #f0f6fc;
              box-shadow: 0 10px 25px rgba(0, 0, 50, 0.1);
            }

            .blog-card-img {
              width: 100%;
              height: 250px;
              object-fit: cover;
              border-top-left-radius: 0.75rem;
              border-top-right-radius: 0.75rem;
            }

            .hover-lift {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .hover-lift:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            }

            .btn-outline-primary {
              color: #0b1e34;
              border-color: #0b1e34;
            }

            .btn-outline-primary:hover {
              background-color: #0b1e34;
              color: #ffffff;
              border-color: #0b1e34;
            }

            .card-row {
              justify-content: center;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Blog;
