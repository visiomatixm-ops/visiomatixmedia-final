// ===========================================================
// Filename: Contact.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   Contact Us page with elegant form, responsive design,
//   and embedded Google Map for office location.
// ===========================================================

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Contact: React.FC = () => {
  // -----------------------------
  // Form state
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Handle form submission
  // -----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you, ${formData.name}! Your message has been submitted successfully.`
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner Section */}
      {/* ============================================= */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/about/contact-us-concept-icons-such-as-mobile-phone-e-mail-address-chat-global-communication-on-dark-blue-background-for-presentation-web-banner-article-business-and-network-connection-and-company-free-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        {/* Overlay for text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you. Reach out with your questions or ideas.
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Contact Form Section */}
      {/* ============================================= */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg rounded-4 border-0 p-4">
              <Card.Body>
                <h4 className="fw-bold mb-4 text-center">Get in Touch</h4>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject of your message"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-5 py-2 fw-bold"
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ============================================= */}
      {/* Google Maps Section */}
      {/* ============================================= */}
      <Container className="mb-5">
        <h4 className="fw-bold mb-4 text-center">Our Location</h4>
        <div className="ratio ratio-16x9 shadow rounded-4">
          {/* 
            Google Maps Embed:
            - Replace the src URL with your own Google Maps embed link
            - Steps to configure:
              1. Go to Google Maps and find your office location.
              2. Click "Share" > "Embed a map" > Copy the iframe link.
              3. Replace the URL in the src attribute below.
              4. Adjust width, height, and zoom level if needed.
          */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456789!2d72.8300!3d19.2300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c00000000000%3A0x123456789abcdef!2sRandom%20Location!5e0!3m2!1sen!2sin!4v1696740000000!5m2!1sen!2sin"
            title="Visiomatix Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </>
  );
};

export default Contact;
