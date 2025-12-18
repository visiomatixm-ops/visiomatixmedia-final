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
    { question: "Does Visiomatix Media offer internships?", answer: "Yes, we offer internships in various domains including Full Stack Development, Graphic Design, Digital Marketing, and more." },
    { question: "How long is the internship program?", answer: "The internship typically lasts 3 to 6 months, depending on the role and program selected." },
    { question: "Is the internship paid?", answer: "Some internships offer a stipend based on performance. Details vary by role." },
    { question: "Do interns receive a certificate?", answer: "Yes, all interns who successfully complete their program will receive a certificate." },
    { question: "Who can apply for internships?", answer: "Students, fresh graduates, and early-career professionals with basic computer skills and a willingness to learn." },
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
        <Col md={5}>
          <div
    style={{
      background: "#f5f7ff",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 20px 50px rgba(29, 52, 88, 0.15)",
    }}
  >
            <p
              style={{
                fontSize: "14px",
                letterSpacing: "2px",
                color: "#1D3458",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              FAQS
            </p>

            <h2
              style={{
                fontSize: "46px",
                fontWeight: 700,
                color: "#1D3458",
                lineHeight: 1.2,
                marginBottom: "40px",
              }}
            >
              Frequently <br /> Asked Questions
            </h2>

            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: "1.5px solid #1D3458",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    marginBottom: "18px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* QUESTION */}
                  <div
                    style={{
                      padding: "22px 28px",
                      fontSize: "19px",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "#1D3458",
                    }}
                  >
                    <span>{item.question}</span>
                    <span
                      style={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      +
                    </span>
                  </div>

                  {/* ANSWER */}
                 <div
  style={{
    maxHeight: isOpen ? "160px" : "0px",
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
    transition: "max-height 0.4s ease, opacity 0.3s ease",
  }}
>

                    <p
                      style={{
                        padding: "0 28px 22px",
                        fontSize: "16px",
                        color: "#505d75",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        {/* RIGHT – SEND A MESSAGE */}
        <Col md={7}>
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
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* COUNTRY + NUMBER */}
              <Row className="mb-3 text-start">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Country Code</Form.Label>
                    <Form.Select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      {countryCodes.map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.country} ({c.code})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

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
                  variant="primary"
                  className="px-5 py-2 fw-bold"
                >
                  Send Message
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactFormSection;
