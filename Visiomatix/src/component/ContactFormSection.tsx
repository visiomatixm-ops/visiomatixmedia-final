import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/ContactForm.css";

interface Props {
  ourOfficeIcon: string;
  phoneIcon: string;
  emailIcon: string;
  clockIcon: string;
  phoneNumber: string;
  emailAddress: string;
  formData: any;
  handleChange: any;
  handleSubmit: any;
  handleCaptchaChange: any;
}

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
  // ...
];

const faqs = [
    { question: "What services does Visiomatix Media offer?", answer: "We provide branding, digital marketing, motion graphics, graphic design, 3D modeling, VFX, and advertising solutions tailored to business needs." },
    { question: "How can I contact Visiomatix Media?", answer: "You can reach us via email at visiomatixmedia@gmail.com or call/WhatsApp +91 89991 01916." },
    { question: "What does Visiomatix Media specialize in?", answer: "Visiomatix Media is a full-service digital growth agency specializing in brand strategy, creative design, website development, digital marketing, SEO, performance marketing, and AI-powered visual solutions." },
   { question: "How does Visiomatix Media approach client projects?", answer: "We follow a structured, strategy-first approach that begins with research and planning, followed by execution and continuous performance optimization." },
    //{ question: "What makes Visiomatix Media different from other agencies?", answer: "Our strength lies in combining strategic thinking, creative excellence, data-driven execution, and AI-powered solutions to deliver consistent results." },
    //{ question: "Do you offer customized solutions or fixed packages?", answer: "We primarily offer customized solutions aligned with business goals, industry requirements, and budgets to ensure maximum ROI" },
  // { question: "How do you ensure quality and consistency across deliverables?", answer: "All deliverables go through a defined quality-control process, including internal reviews and brand guideline checks" },
   // { question: "How is project progress communicated to clients?", answer: "Clients receive structured reports, milestone updates, and performance insights through regular communication" },
   // { question: "How is project progress communicated to clients?", answer: "Businesses can get started by submitting a service request through our website or scheduling aconsultation with our team." },

];


const ContactFormSection: React.FC<Props> = ({
  ourOfficeIcon,
  phoneIcon,
  emailIcon,
  clockIcon,
  phoneNumber,
  emailAddress,
  formData,
  handleChange,
  handleSubmit,
  handleCaptchaChange,
}) => {
  // ✅ Hooks must be inside component
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* LEFT – FAQ SECTION */}
        <Col md={6}>
          <Card
            className="shadow-lg border-0 rounded-4 p-4 h-100"
            style={{ background: "rgb(14, 53, 92)", color: "white" }}
          >
            <div className="faq-container">
              <div className="faq-left mb-4">
                <p className="faq-subtitle">FAQS</p>
                <h2 className="faq-heading">
                  Frequently <br /> Asked Questions
                </h2>
              </div>

              <div className="faq-right">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className={`faq-card ${
                      openIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleFAQ(index)}
                    style={{
                      cursor: "pointer",
                      background: "rgb(11, 31, 58)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="faq-question d-flex justify-content-between align-items-center">
                      <span style={{ color: 'white',paddingLeft:'8px' }}>{item.question}</span>
                      <span
                        className={`icon ${openIndex === index ? "rotate" : ""}`}
                        style={{ fontSize: "22px", color: 'white' }}
                      >
                        +
                      </span>
                    </div>

                    {openIndex === index && (
                      <div className="faq-answer mt-2" style={{ background: "rgb(20, 50, 80)", color: 'white', padding: '10px' }} onClick={(e) => e.stopPropagation()}>
                        <p style={{ color: 'white', lineHeight: '1.5', textAlign: 'left' }}>
                            {item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* RIGHT – SEND A MESSAGE */}
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 p-4 h-100">
            <h2 className="text-center mb-4 fw-bold text-uppercase">
              Send a Message
            </h2>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3 text-start">
                <Col md={6}>
                  <Form.Group>
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
                  <Form.Group>
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

              {/* COUNTRY + NUMBER */}
              {/* Main Label like "Full Name" */}
              {/* COUNTRY CODE + PHONE */}
<Form.Group className="mb-3 text-start" controlId="contactNumberGroup">
  <Form.Label>Contact Number</Form.Label>

  <Row className="g-2 align-items-center">
    {/* Country Code – fixed small width */}
    <Col md="auto">
      <Form.Select
        name="countryCode"
        value={formData.countryCode}
        onChange={handleChange}
        className="country-code-select"
        required
      >
        {countryCodes.map((item, index) => (
          <option key={index} value={item.code}>
            {item.code} {/* Only show code */}
          </option>
        ))}
      </Form.Select>
    </Col>

    {/* Contact Number – remaining space */}
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

              {/* SERVICE */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Select Service</Form.Label>
                <Form.Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a Service...</option>
                  <option>Digital Marketing</option>
                  <option>Web App Development</option>
                  <option>Branding</option>
                  <option>Design</option>
                </Form.Select>
              </Form.Group>

              {/* MESSAGE */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <ReCAPTCHA
                sitekey="6LcJUwwsAAAAAM_k2WUuXkIpG1wZfG4bIpDLIcRP"
                onChange={handleCaptchaChange}
              />

              <div className="text-center mt-3">
                <Button
                  type="submit"
                 // variant="primary"
                  className="px-5 py-2 fw-bold"
                >
                  Send Message
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* ---------- LEFT COLUMN ---------- */}
      {/*<Row className="g-4 mt-4">
        <Col
          md={12}
          className="text-light rounded-4 p-4 d-flex flex-column justify-content-center shadow-lg"
          style={{ backgroundColor: "#0B1F3A", width: '80%', margin: '0 auto' }}
        >
          <div className="mt-3">
            <h3 className="fw-bold mb-4 text-center text-uppercase">Get in Touch</h3>

            {/* Address */}
           {/* <div className="d-flex align-items-start mb-4 text-start">
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
          {/*  <div className="d-flex align-items-start mb-4 text-start">
              <img src={phoneIcon} width="36" className="me-3 contact-icon" alt="Phone Icon" />

              <div className="d-flex flex-column align-items-start justify-content-start">
                <h6 className="fw-bold mb-1">Phone</h6>
                <a href={`tel:${phoneNumber}`} className="text-light text-decoration-none">
                  {phoneNumber}
                </a>
              </div>
            </div>

            {/* Email */}
           {/* <div className="d-flex align-items-start mb-4 text-start">
              <img src={emailIcon} width="36" className="me-3 contact-icon" alt="Email Icon" />

              <div className="d-flex flex-column align-items-start justify-content-start">
                <h6 className="fw-bold mb-1">Email</h6>
                <a href={`mailto:${emailAddress}`} className="text-light text-decoration-none">
                  {emailAddress}
                </a>
              </div>
            </div>

            {/* Working Hours */}
           {/* <div className="d-flex align-items-start mb-4 text-start">
              <img src={clockIcon} width="36" className="me-3 contact-icon" alt="Clock Icon" />

              <div className="d-flex flex-column align-items-start justify-content-start">
                <h6 className="fw-bold mb-1">Working Hours</h6>
                <p className="mb-0">Mon - Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>*/}
    </Container>
  );
};

export default ContactFormSection;