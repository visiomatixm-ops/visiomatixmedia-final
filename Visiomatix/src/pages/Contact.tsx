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
          backgroundImage: "url('/about/contact-us.jpg')",
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
            backgroundColor: "rgba(0, 40, 80, 0.45)",
            borderRadius: "12px",
            width: "90%",
            padding: "1em",
            backdropFilter: "blur(5px)",
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
      <h3 className="fw-bold mb-4 text-center text-uppercase">Get in Touch</h3>

      {/* Address */}
      <div className="d-flex align-items-start mb-4">
        <img src={ourOfficeIcon} width="36" className="me-3 contact-icon" alt="Our Office Icon" />
        <div style={{    display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                        flexDirection:'column'}}>
          <h6 className="fw-bold mb-1">Our Office</h6>
          <p className="mb-0" style={{display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                        flexDirection:'column'}}>
            Office No. 03, Om Sai Apartment, Near Petrol Pump,
            <br />
            Ganur Road, Chandwad, Nashik – 423101, Maharashtra – India.
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-start mb-4">
        <img src={phoneIcon} width="36" className="me-3 contact-icon" alt="Phone Icon" />
        <div style={{display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                        flexDirection:'column'}}>
          <h6 className="fw-bold mb-1">Phone</h6>
          <a href={`tel:${phoneNumber}`} className="text-light text-decoration-none">
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="d-flex align-items-start mb-4">
        <img src={emailIcon} width="36" className="me-3 contact-icon" alt="Email Icon" />
        <div style={{display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                        flexDirection:'column'}}>          <h6 className="fw-bold mb-1">Email</h6>
          <a href={`mailto:${emailAddress}`} className="text-light text-decoration-none">
            {emailAddress}
          </a>
        </div>
      </div>

      {/* Working Hours */}
      <div className="d-flex align-items-start">
        <img src={clockIcon} width="36" className="me-3 contact-icon" alt="Clock Icon" />
        <div style={{display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                        flexDirection:'column'}}>          <h6 className="fw-bold mb-1">Working Hours</h6>
          <p className="mb-0">Mon - Sat: 10:00 AM – 7:00 PM</p>
        </div>
      </div>
    </Col>


          {/* ---------- RIGHT COLUMN ---------- */}
          <Col md={7}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
               <h2 className="text-center mb-4 fw-bold text-uppercase"
                      style={{ color: "#0a0808ff" }}
                    
                      >
                    Send a Message
                    
                    </h2>

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

                  {/* Country Code + Phone */}
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="countryCode">
                        <Form.Label>Country Code</Form.Label>
                        <Form.Select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="country-code-dropdown"
                          required
                        >
                          {countryCodes.map((item, index) => (
                            <option key={index} value={item.code}>
                              {item.country} ({item.code})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group controlId="contactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                          placeholder="e.g., 98765 43210"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Service Dropdown */}
                  <Form.Group className="mb-3" controlId="service">
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
                  <Form.Group className="mb-3" controlId="subject">
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
                  <Form.Group className="mb-3" controlId="message">
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

                  {/* reCAPTCHA (FINAL WORKING VERSION) */}
                    <ReCAPTCHA
                            sitekey="6LcJUwwsAAAAAM_k2WUuXkIpG1wZfG4bIpDLIcRP"
                            onChange={handleCaptchaChange}
                          />



                  {/* Submit Button */}
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

      {/* ====================== GOOGLE MAP ====================== */}
      <Container className="mb-5">
        <h4 className="fw-bold mb-4 text-center text-primary">
          Our Location
        </h4>

        <div className="ratio ratio-16x9 shadow rounded-4">
          <iframe
            src="https://maps.google.com/maps?q=Office%20No.%2003%2C%20Om%20Sai%20Apartment%2C%20Near%20Petrol%20Pump%2C%20Ganur%20Road%2C%20Davkhar%20Nagar%2C%20Chandwad%2C%20Nashik%20%E2%80%93%20423101.%20Maharashtra%20%E2%80%93%20India&output=embed"
            title="Visiomatix Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
      <div>
        <FAQ />
      </div>
    </>
  );
};

export default Contact;
