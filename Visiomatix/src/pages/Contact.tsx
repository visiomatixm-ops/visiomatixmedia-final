// ===========================================================
// Filename: Contact.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   "Contact Us" page with responsive side-by-side layout:
//   - Elegant navy-blue theme
//   - Contact details with SVG icons
//   - Form with validation and shadow effects
//   - Google Maps embedded for location
// ===========================================================

import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

// ===========================================================
// Functional Component: Contact
// ===========================================================
const Contact: React.FC = () => {
  // -----------------------------
  // Form state management
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you, ${formData.name}! Your message has been submitted successfully.`
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // ===========================================================
  // JSX Render
  // ===========================================================
  return (
    <>
      {/* ====================== SEO Meta Tags ====================== */}
      <Helmet>
    <title>Contact Visiomatix Media | Get in Touch for IT Solutions</title>
<meta name="description" content="Reach out to Visiomatix Media for business inquiries, project collaborations, or support. Let's build your digital future together." />
<meta name="keywords" content="contact visiomatix, get in touch, IT services inquiry, software company contact, web development support" />
<link rel="canonical" href="https://visiomatix.com/contact" />

      
      </Helmet>
      {/* =================================================== */}
      {/* Hero Section */}
      {/* =================================================== */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center position-relative"
        style={{
          backgroundImage:
            "url('/about/contact-us-concept-icons-such-as-mobile-phone-e-mail-address-chat-global-communication-on-dark-blue-background-for-presentation-web-banner-article-business-and-network-connection-and-company-free-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          marginBottom: "3rem",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,64,0.6)" }}
        ></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead mb-0">
            We'd love to hear from you. Reach out with your questions or ideas.At Visiomatix Media,
             we value collaboration, innovation, and connection. Whether you're looking to start a 
             new project, request a demo, or simply learn more about our services — our team is 
             here to help.
          </p>
        </div>
      </section>

      {/* =================================================== */}
      {/* Contact Section with Flex Layout */}
      {/* =================================================== */}
      <Container className="my-5">
        <Row className="g-4 align-items-stretch">
          {/* ---------------- Left Column: Contact Details ---------------- */}
          <Col
            md={5}
            className="text-light rounded-4 p-4 d-flex flex-column justify-content-center shadow-lg"
            style={{
              backgroundColor: "#0B1F3A",
            }}
          >
            <h3 className="fw-bold mb-4 text-center text-uppercase">
              Get in Touch
            </h3>

            {/* Address */}
            <div className="d-flex align-items-start mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="#00b4d8"
                className="bi bi-geo-alt-fill me-3 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 1 0 2 6c0 4.314 6 10 6 10zM8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              <div>
                <h6 className="fw-bold mb-1">Our Office</h6>
                <p className="mb-0">
                  501, Creative Business Park,<br />
                  Andheri West, Mumbai – 400058
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="d-flex align-items-start mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="#00b4d8"
                className="bi bi-telephone-fill me-3 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.612.163L6.29 2.92a1.745 1.745 0 0 1-.234 2.57L5.06 6.403a11.42 11.42 0 0 0 4.538 4.538l.914-1a1.745 1.745 0 0 1 2.57-.234l2.246 1.793c.731.584.878 1.665.163 2.396l-1.045 1.046a2.01 2.01 0 0 1-2.174.486C8.773 14.763 3.586 9.577 1.447 3.26A2.01 2.01 0 0 1 1.885.511z"
                />
              </svg>
              <div>
                <h6 className="fw-bold mb-1">Phone</h6>
                <p className="mb-0">+91 98765 43210</p>
              </div>
            </div>

            {/* Email */}
            <div className="d-flex align-items-start mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="#00b4d8"
                className="bi bi-envelope-fill me-3 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.143l-6.57-4.027L8 9.586l-1.239-.757z" />
              </svg>
              <div>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="mb-0">info@visiomatixmedia.com</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="d-flex align-items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="#00b4d8"
                className="bi bi-clock-fill me-3 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.5 3a.5.5 0 0 0-1 0v5.25l4.5 2.67a.5.5 0 0 0 .5-.866L7.5 7.75V3z" />
              </svg>
              <div>
                <h6 className="fw-bold mb-1">Working Hours</h6>
                <p className="mb-0">Mon - Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </Col>

          {/* ---------------- Right Column: Contact Form ---------------- */}
          <Col md={7}>
            <Card className="shadow-lg rounded-4 border-0 p-4 h-100">
              <Card.Body>
                <h4 className="fw-bold mb-4 text-center text-primary">
                  Send Us a Message
                </h4>
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
                          placeholder="Enter your name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
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

      {/* =================================================== */}
      {/* Google Maps Section */}
      {/* =================================================== */}
      <Container className="mb-5">
        <h4 className="fw-bold mb-4 text-center text-primary">Our Location</h4>
        <div className="ratio ratio-16x9 shadow rounded-4">
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





