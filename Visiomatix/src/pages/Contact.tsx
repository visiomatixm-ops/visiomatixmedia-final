// ===========================================================
// Filename: Contact.tsx
// Author: Priyanka Ganvir
// Updated: 13-Nov-2025
// Description:
//   Complete "Contact Us" page with:
//   - Responsive layout
//   - Email, Phone, Address, Working Hours
//   - Contact Form with validation
//   - Google Maps section
// ===========================================================

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import emailIcon from "../assets/icons/email.svg";
import clockIcon from "../assets/icons/clock.svg";
import phoneIcon from "../assets/icons/phone.svg";
import ourOfficeIcon from "../assets/icons/map.svg";

import FAQ from "../component/FAQ";
import "./ContactForm.css";

// ====================== COUNTRY CODE LIST ======================
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+81", country: "Japan" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+86", country: "China" },
  { code: "+971", country: "UAE" },
  { code: "+92", country: "Pakistan" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+880", country: "Bangladesh" },
  { code: "+34", country: "Spain" },
  { code: "+55", country: "Brazil" },
  { code: "+7", country: "Russia" },
  { code: "+82", country: "South Korea" },
  { code: "+353", country: "Ireland" },
  { code: "+31", country: "Netherlands" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+972", country: "Israel" },
  { code: "+27", country: "South Africa" },
  { code: "+20", country: "Egypt" },
  { code: "+65", country: "Singapore" },
  { code: "+98", country: "Iran" },
  { code: "+90", country: "Turkey" },
];

// ====================== MAIN CONTACT COMPONENT ======================
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    contactNumber: "",
    service: "",
    subject: "",
    message: "",
    captchaToken: "",
  });

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setFormData({ ...formData, captchaToken: value || "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA before submitting!");
      return;
    }

    alert(`Thank you, ${formData.name}! Your message has been sent.`);

    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      contactNumber: "",
      service: "",
      subject: "",
      message: "",
      captchaToken: "",
    });

    setCaptchaValue(null);
  };

  const emailAddress = "visiomatixmedia@gmail.com";
  const phoneNumber = "+91 9270271916";

  return (
    <>
      {/* ====================== SEO ====================== */}
      <Helmet>
        <title>Contact Visiomatix Media | Get in Touch</title>
        <meta
          name="description"
          content="Reach out to Visiomatix Media for business inquiries and IT solutions."
        />
      </Helmet>

      {/* ====================== HERO ====================== */}
      <section
        className="text-center text-light d-flex align-items-center justify-content-center position-relative"
        style={{
          backgroundImage: "url('/about/contact-us-V1.png')",
          backgroundSize: "cover",
          height: "80vh",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />
        <div className="position-relative">
          <h1 className="display-5 fw-bold text-uppercase">Contact Us</h1>
          <p className="lead">
            Start a new project or ask anything — our team is ready.
          </p>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <Container className="my-5">
        <Row className="g-4 align-items-stretch">
          {/* LEFT */}
          <Col
            md={5}
            className="text-light rounded-4 p-4 shadow-lg"
            style={{ backgroundColor: "#0B1F3A" }}
          >
            <h3 className="fw-bold mb-4 text-center">Get in Touch</h3>

            {[ 
              { icon: ourOfficeIcon, title: "Our Office", text: "Office No. 03, Om Sai Apartment, Chandwad, Nashik – 423101" },
              { icon: phoneIcon, title: "Phone", text: phoneNumber, link: `tel:${phoneNumber}` },
              { icon: emailIcon, title: "Email", text: emailAddress, link: `mailto:${emailAddress}` },
              { icon: clockIcon, title: "Working Hours", text: "Mon - Sat: 10:00 AM – 7:00 PM" },
            ].map((item, i) => (
              <div key={i} className="d-flex mb-4">
                <img src={item.icon} width="34" className="me-3" />
                <div>
                  <h6 className="fw-bold text-start">{item.title}</h6>
                  {item.link ? (
                    <a href={item.link} className="text-light text-decoration-none">
                      {item.text}
                    </a>
                  ) : (
                    <p className="mb-0">{item.text}</p>
                  )}
                </div>
              </div>
            ))}
          </Col>

          {/* RIGHT */}
          <Col md={7}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h3 className="text-center fw-bold mb-4">Send a Message</h3>

                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Control name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    </Col>
                    <Col md={6}>
                      <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md="auto">
                      <Form.Select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                        {countryCodes.map((c, i) => (
                          <option key={i}>{c.code}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Control name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
                    </Col>
                  </Row>

                  <Form.Select className="mb-3" name="service" value={formData.service} onChange={handleChange} required>
                    <option value="">Select Service</option>
                    <option>Digital Marketing</option>
                    <option>Web Development</option>
                    <option>Business Software</option>
                  </Form.Select>

                  <Form.Control className="mb-3" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                  <Form.Control as="textarea" rows={4} className="mb-3" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />

                  <ReCAPTCHA sitekey="6LcJUwwsAAAAAM_k2WUuXkIpG1wZfG4bIpDLIcRP" onChange={handleCaptchaChange} />

                  <div className="text-center mt-3">
                    <Button type="submit" className="px-5 fw-bold" style={{backgroundColor:"#1D3458",color:"#fff",border:"none"}}>
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ====================== GOOGLE MAP ====================== */}
      <section className="mb-5">
        <Container className="text-center mb-4">
          <h6 className="text-uppercase text-muted">Office Location</h6>
          <h2 className="fw-bold">Visit Our Office</h2>
        </Container>

        <div style={{ width: "100%", height: "450px", border:"20px" }}>
          <iframe
            title="Visiomatix Office"
            src="https://www.google.com/maps?q=20.3212688,74.238969&z=17&output=embed"
            style={{ width: "90%", height: "90%", border: "5" }}
            loading="lazy"
            allowFullScreen
          />
        </div>

        <div className="text-center mt-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=20.3212688,74.238969"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                      backgroundColor: '#1D3458',
                      borderColor: '#1D3458',
                      color: '#ffffff',
                    }}
                    onMouseEnter={e => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.backgroundColor = '#162a46';
                      target.style.borderColor = '#162a46';
                    }}
                    onMouseLeave={e => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.backgroundColor = '#1D3458';
                      target.style.borderColor = '#1D3458';
                    }}
                                >
                  📍 Get Directions
                </a>
              </div>
      </section>

      <FAQ />
    </>
  );
};

export default Contact;