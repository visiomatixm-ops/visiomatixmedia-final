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
      "Photography goes beyond visuals — it’s brand storytelling. See how high-quality imagery builds trust and enhances your digital presence.",
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
    title: "SEO in 2025: Beyond Keywords — It’s About Intent",
    excerpt:
      "Google’s algorithms now reward authenticity and relevance. Learn how our SEO experts blend human psychology and data-driven strategy to improve rankings.",
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
      "At Visiomatix, design isn’t just visual — it’s emotional. We share how user empathy and design thinking drive every digital interface we create.",
    author: "UI/UX Design Lab",
    date: "June 30, 2025",
  },
];

const Blog: React.FC = () => {
  return (
    <>
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
            "url('/about/Social-Media-Infographics-in-Detail-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          marginBottom: "3rem",
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
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-6 fw-bold text-white">
            Visiomatix Media Blog
          </h1>
          <p className="lead text-white-50" style={{ fontSize: "0.95rem" }}>
            Insights, trends, and creative updates from our digital experts.
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
                    <h6 className="fw-bold text-navy mb-2">{post.title}</h6>
                    <p className="text-secondary small mb-2">
                      {post.date} • {post.author}
                    </p>
                    <p
                      className="flex-grow-1 text-muted"
                      style={{ fontSize: "0.85rem" }}
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
