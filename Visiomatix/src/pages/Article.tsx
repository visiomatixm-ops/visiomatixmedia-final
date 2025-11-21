/**
 * ===========================================================
 * Filename: Article.tsx
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Article Page Component for displaying full blog post content.
 *   Receives post data via location state and renders in a page-like structure.
 * ===========================================================
 */

import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const Article: React.FC = () => {
  const location = useLocation();
  const post = location.state?.blog;

  if (!post) {
    return (
      <Container className="text-center mt-5">
        <h2>Article not found</h2>
        <p>The requested article could not be loaded.</p>
      </Container>
    );
  }

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>{post.title} | Visiomatix Media Blog</title>
        <meta name="description" content={post.shortDesc} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.shortDesc} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`https://www.visiomatix.com/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} />
      </Helmet>

      {/* Page Fade Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Hero Section */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('${post.image}')`,
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
        <div
          style={{
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
          }}
        >
          <h1 className="display-5 display-sm-6 fw-bold text-white mb-3 mb-sm-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {post.title}
          </h1>
          <p className="lead text-white-80 mb-0 text-xs sm:text-sm md:text-base lg:text-lg">
            {post.date} • {post.author}
          </p>
        </div>
      </section>

      {/* Article Content Section */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="article-content">
              <p className="text-muted mb-4">{post.shortDesc}</p>
              <div className="article-body">
                {/* Placeholder for full content - in real implementation, this would be post.content */}
                <div dangerouslySetInnerHTML={{ __html: post.fullDesc }} />
                {/* Add more content structure as needed */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Light Theme Styles */}
      <style>
        {`
          .article-content {
            background-color: #ffffff;
            color: #0b1e34;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .article-body p {
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }

          @media screen and (max-width: 500px) {
            .article-content {
              padding: 1rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Article;