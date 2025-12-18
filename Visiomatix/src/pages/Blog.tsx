/**
 * ===========================================================
 * Filename: Blog.tsx
 * Author: Amol Nichit
 * Description:
 *   Visiomatix Blog Page — Clean, Unified Button Style & Compact Layout
 * ===========================================================
 */
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import blogData from "./data/blogData";
const blogPosts = [
  {
    image: "/about/blog/1-Top 5 Digital Marketing.png",
    title: "Top 5 Digital Marketing Trends to Watch in 2025",
    excerpt:
      "The digital landscape is evolving faster than ever. Explore emerging trends like AI-driven marketing, influencer authenticity, and video-first content that define 2025’s marketing playbook.",
    author: "Visiomatix Media Team",
  },
  {
    image: "/about/blog/2-Building a Powerful.png",
    title: "Building a Powerful Brand Identity That Stands Out",
    excerpt:
      "Consistency, storytelling, and purpose drive brand identity. Learn how our creative team crafts visual experiences that connect emotionally with audiences.",
    author: "Creative Division",
  },
  {
    image: "/about/blog/3-Why Responsive Web Design.png",
    title: "Why Responsive Web Design Is Crucial for Modern Businesses",
    excerpt:
      "A seamless user experience across all devices boosts engagement and conversions. Discover our design philosophy behind intuitive, mobile-first websites.",
    author: "Web Development Team",
  },
  {
    image: "/about/blog/4-How Professional Photography.png",
    title: "How Professional Photography Can Transform Your Brand Image",
    excerpt:
      "Photography goes beyond visuals — it's brand storytelling. See how high-quality imagery builds trust and enhances your digital presence.",
    author: "Photography Studio",
  },
  {
    image: "/about/blog/5-Mastering Social Media Strategy.png",
    title: "Mastering Social Media Strategy in the Attention Economy",
    excerpt:
      "In an era where attention is the new currency, crafting scroll-stopping content is an art. Explore tips to dominate Instagram, LinkedIn, and YouTube with intent.",
    author: "Social Media Division",
  },
  {
    image: "/about/blog/6-SEO in 2025 Beyond Keywords.png",
    title: "SEO in 2025: Beyond Keywords — It's About Intent",
    excerpt:
      "Google's algorithms now reward authenticity and relevance. Learn how our SEO experts blend human psychology and data-driven strategy to improve rankings.",
    author: "SEO & Analytics Team",
  },
  {
    image: "/about/blog/7-The Rise of Video Storytelling.png",
    title: "The Rise of Video Storytelling in Brand Campaigns",
    excerpt:
      "Short-form videos and cinematic brand films are reshaping online engagement. Discover how we bring stories to life through strategic visual narratives.",
    author: "Production House",
  },
  {
    image: "/about/blog/8-Design Thinking The Secret.png",
    title: "Design Thinking: The Secret to Better UI/UX Experiences",
    excerpt:
      "At Visiomatix, design isn't just visual — it's emotional. We share how user empathy and design thinking drive every digital interface we create.",
    author: "UI/UX Design Lab",
  },
];
const Blog: React.FC = () => {
  const navigate = useNavigate();
  const handleReadMore = (post: any) => {
    const match = blogData.find(
      (b) => b.title.trim().toLowerCase() === post.title.trim().toLowerCase()
    );
    if (match) {
      navigate(`/article/${match.id}`, { state: { blog: match } });
    } else {
      navigate(`/article/1`, { state: { blog: post } });
    }
  };
  return (
    <>
      <Helmet>
        <title>
          Visiomatix Media Blog | Digital Insights & Marketing Trends
        </title>
        <meta
          name="description"
          content="Stay updated with the latest trends in digital marketing, web design, and technology innovation from the experts at Visiomatix Media."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      {/* ===== Hero Banner (Compact Spacing) ===== */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/about/blog-image-V1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "45vh",
          position: "relative",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            // backgroundColor: "rgba(18, 34, 51, 0.45)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            // backgroundColor: "rgba(0, 40, 80, 0.35)",
            borderRadius: "8px",
            width: "85%",
            maxWidth: "850px",
            padding: "1rem 1.2rem",
            backdropFilter: "blur(3px)",
          }}
        >
          <h1
            className="fw-bold text-white mb-2"
            style={{ fontSize: "1.8rem" }}
          >
            Visiomatix Media Blog
          </h1>
          <p
            className="text-white-80 mb-0"
            style={{ lineHeight: "1.5", fontSize: "0.95rem", opacity: 0.95 }}
          >
            Insights, trends, and creative updates from our digital experts.
            Explore marketing innovations, design ideas, and expert thoughts
            that help brands grow in today’s fast-changing digital world.
          </p>
        </div>
      </section>
      {/* ===== Blog Cards ===== */}
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
                  <Card.Body className="d-flex flex-column blog-card-body">
                    <h6 className="blog-title">{post.title}</h6>

                    <p className="blog-author">By {post.author}</p>

                    <p className="blog-excerpt">{post.excerpt}</p>

                    <div className="mt-auto text-center">
                      <button
                        className="main-btn"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More →
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* ===== Styles ===== */}
        <style>{`
          .text-navy {
            color: #0B1E34 !important;
          }
          .blog-card {
            background-color: #fff;
            transition: all 0.3s ease;
            border: 1px solid rgba(10, 45, 80, 0.08);
          }
           /* -------------------------------
   BLOG CARD – UNIFORM IMAGE SIZE
-------------------------------- */
.blog-card {
  background: #fff;
  border: 1px solid rgba(10, 45, 80, 0.08);
  border-radius: 12px;
  transition: 0.3s ease;
  overflow: hidden;
}

/* Wrapper with FIXED HEIGHT for ALL IMAGES */
.blog-img-wrapper {
  width: 100%;
  height: 240px;                   /* SAME HEIGHT FOR ALL IMAGES */
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f2f2;
}

/* Image inside wrapper */
.blog-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;               /* CROPS nicely & keeps size equal */
  border-radius: 12px 12px 0 0;
}

/* Card Hover */
.blog-card:hover {
  transform: translateY(-6px);
  background-color: #F4F8FC;
  box-shadow: 0 10px 25px rgba(0, 0, 50, 0.1);
}

/* Navy Text */
.text-navy {
  color: #0B1E34 !important;
}

/* Button Style */
.main-btn {
  background-color: #0B1E34;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.main-btn:hover {
  background-color: #163D6C;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .blog-img-wrapper {
    height: 190px;                 /* Adjust for mobile */
  }
  .main-btn {
    padding: 0.6rem 1.3rem;
    font-size: 0.95rem;
  }
}
  /* Title – fixed height */
.blog-title {
  font-weight: 700;
  color: #0B1E34;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 0.35rem;
  text-align: left;  

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
}

.blog-author {
  font-size: 0.78rem;
  color: #000000;   
  margin-bottom: 0.6rem;
  text-align: center;   
}

  .blog-excerpt {
  font-size: 0.88rem;
  line-height: 1.7;
  color: #000000;   

  text-align: left;        
  padding-right: 0.25rem;   
  padding-left: 0;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  margin-bottom: 1rem;
}

    `}</style>
      </div>
    </>
  );
};
export default Blog;
