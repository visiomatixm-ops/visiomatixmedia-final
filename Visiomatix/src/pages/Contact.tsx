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

import emailIcon from "../assets/icons/email.svg";
import clockIcon from "../assets/icons/clock.svg";
import phoneIcon from "../assets/icons/phone.svg";
import ourOfficeIcon from "../assets/icons/map.svg";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactForm.css";

import FAQ from "../component/FAQ";


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
    captchaToken: ""   // <-- Added here
  });

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FINAL reCAPTCHA handler (ONLY ONE FUNCTION)
  const handleCaptchaChange = (value: string | null) => {
    console.log("Captcha Value:", value);
    setCaptchaValue(value);

    // store in formData also
    setFormData({ ...formData, captchaToken: value || "" });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA before submitting!");
      return;
    }

    alert(
      `Thank you, ${formData.name}! Your inquiry about "${formData.service}" has been submitted successfully.`
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      contactNumber: "",
      service: "",
      subject: "",
      message: "",
      captchaToken: ""
    });

    setCaptchaValue(null);
  };

  const emailAddress = "visiomatixmedia@gmail.com";
  const phoneNumber = "+91 9270271916";

  return (
    <>
      {/* ====================== SEO Meta Tags ====================== */}
      <Helmet>
        <title>Contact Visiomatix Media | Get in Touch for IT Solutions</title>
        <meta
          name="description"
          content="Reach out to Visiomatix Media for business inquiries, project collaborations, or support. Let's build your digital future together."
        />
        <meta
          name="keywords"
          content="contact visiomatix, get in touch, IT services inquiry, software company contact, web development support"
        />
        <link rel="canonical" href="https://visiomatix.com/contact" />
      </Helmet>

      {/* ====================== HERO SECTION ====================== */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center position-relative"
        style={{
          backgroundImage: "url('/about/contact-us-V1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          marginBottom: "3rem",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 49, 64, 0.37)" }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
           // backgroundColor: "rgba(0, 40, 80, 0.45)",
            borderRadius: "12px",
            width: "90%",
            padding: "1em",
            //backdropFilter: "blur(5px)",
            marginTop: "7rem",
          }}
        >
          <h1 className="display-5 fw-bold text-uppercase">Contact Us</h1>
          <p className="lead mb-0">
            We'd love to hear from you! Start a new project or ask anything — our team is ready.
          </p>
        </div>
      </section>

      {/* ====================== CONTACT SECTION ====================== */}
         <Container className="my-5">
  <Row className="g-4 align-items-stretch">

    {/* ---------- LEFT COLUMN ---------- */}
    <Col
      md={5}
      className="text-light rounded-4 p-4 d-flex flex-column justify-content-center shadow-lg"
      style={{ backgroundColor: "#0B1F3A" }}
    >
      <div className="mt-3">
        <h3 className="fw-bold mb-4 text-center text-uppercase">Get in Touch</h3>

        {/* Address */}
        <div className="d-flex align-items-start mb-4 text-start">
          <img src={ourOfficeIcon} width="36" 
          className="me-3 contact-icon" 
          alt="Our Office Icon" />

          <div className="d-flex flex-column align-items-start justify-content-start">
            <h6 className="fw-bold mb-1">Our Office</h6>
            <p className="mb-0">
              Office No. 03, Om Sai Apartment, Near Petrol Pump, <br />
              Ganur Road, Chandwad, Nashik – 423101, Maharashtra – India.
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="d-flex align-items-start mb-4 text-start">
          <img src={phoneIcon} width="36" className="me-3 contact-icon" alt="Phone Icon" />

          <div className="d-flex flex-column align-items-start justify-content-start">
            <h6 className="fw-bold mb-1">Phone</h6>
            <a href={`tel:${phoneNumber}`} className="text-light text-decoration-none">
              {phoneNumber}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="d-flex align-items-start mb-4 text-start">
          <img src={emailIcon} width="36" className="me-3 contact-icon" alt="Email Icon" />

          <div className="d-flex flex-column align-items-start justify-content-start">
            <h6 className="fw-bold mb-1">Email</h6>
            <a href={`mailto:${emailAddress}`} className="text-light text-decoration-none">
              {emailAddress}
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="d-flex align-items-start mb-4 text-start">
          <img src={clockIcon} width="36" className="me-3 contact-icon" alt="Clock Icon" />

          <div className="d-flex flex-column align-items-start justify-content-start">
            <h6 className="fw-bold mb-1">Working Hours</h6>
            <p className="mb-0">Mon - Sat: 10:00 AM – 7:00 PM</p>
          </div>
        </div>
      </div>
    </Col>

    {/* ---------- RIGHT COLUMN ---------- */}
    <Col md={7}>
      <Card className="shadow-lg border-0">
        <Card.Body className="p-4">

          <h2
            className="text-center mb-4 fw-bold text-uppercase"
            style={{ color: "#1D3458" }}
          >
            Send a Message
          </h2>

          <Form onSubmit={handleSubmit}>

            {/* Row 1: Name + Email */}
            <Row className="mb-3 text-start">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
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
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Country Code + Phone */}
                  {/* Single title like Full Name */}
                <Form.Group className="mb-3 text-start" controlId="contactNumberGroup">
                  <Form.Label>Contact Number</Form.Label>

                  <Row className="g-2 align-items-center">
                    {/* Country Code – fixed small width */}
                    <Col md="auto">
                      <Form.Select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="country-code-small"
                        required
                      >
                        {countryCodes.map((item, index) => (
                          <option key={index} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    {/* Contact Number – takes remaining space */}
                    <Col>
                      <Form.Control
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="e.g., 98765 43210"
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>


            {/* Service Dropdown */}
            <Form.Group className="mb-3 text-start" controlId="service">
              <Form.Label>Select Service</Form.Label>
              <Form.Select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Choose a Service...</option>
                <option>Digital Marketing</option>
                <option>Design and Creative Services</option>
                <option>Web App Development</option>
                <option>Business Software Solutions</option>
                <option>E-Commerce Solutions</option>
                <option>Branding and Strategy</option>
              </Form.Select>
            </Form.Group>

            {/* Subject */}
            <Form.Group className="mb-3 text-start" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject of your message"
              />
            </Form.Group>

            {/* Message */}
            <Form.Group className="mb-3 text-start" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              />
            </Form.Group>

            {/* reCAPTCHA */}
            <ReCAPTCHA
              sitekey="6LcJUwwsAAAAAM_k2WUuXkIpG1wZfG4bIpDLIcRP"
              onChange={handleCaptchaChange}
            />

            {/* Submit */}
            <div className="text-center">
              <Button
                    type="submit"
                    className="btn send-message-btn px-5 py-2 fw-bold"
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

{/* ====================== GOOGLE MAP ====================== */}
        <Container className="mb-5">

           <Container className="mb-5">
          <section className="global-section">
            <div className="global-text text-center mb-4">
              <h6 className="global-subtitle">
                VISIOMATIX MEDIA OFFICE LOCATION
              </h6>
              <h2 className="global-title">Visit Our Office</h2>
            </div>

            {/* MAP FRAME */}
            <div className="global-map-wrapper">
              <iframe
                title="Visiomatix Office Location"
                src="https://www.google.com/maps?q=20.3212688,74.238969&z=17&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
                      color: '#ffffff'
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
        </Container>
        




        <FAQ />
      </Container>

        
    </>
  );
};

export default Contact;
