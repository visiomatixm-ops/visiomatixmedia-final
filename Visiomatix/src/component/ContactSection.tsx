import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

// ======================================================================
// COUNTRY CODE LIST
// ======================================================================
const countryCodes: { code: string; country: string }[] = [
  { code: "+1", country: "United States" },
  { code: "+7", country: "Russia" },
  { code: "+20", country: "Egypt" },
  { code: "+27", country: "South Africa" },
  { code: "+30", country: "Greece" },
  { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" },
  { code: "+33", country: "France" },
  { code: "+34", country: "Spain" },
  { code: "+36", country: "Hungary" },
  { code: "+39", country: "Italy" },
  { code: "+40", country: "Romania" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+44", country: "United Kingdom" },
  { code: "+45", country: "Denmark" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" },
  { code: "+49", country: "Germany" },
  { code: "+52", country: "Mexico" },
  { code: "+55", country: "Brazil" },
  { code: "+60", country: "Malaysia" },
  { code: "+61", country: "Australia" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+64", country: "New Zealand" },
  { code: "+65", country: "Singapore" },
  { code: "+66", country: "Thailand" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+86", country: "China" },
  { code: "+90", country: "Turkey" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+95", country: "Myanmar" },
  { code: "+98", country: "Iran" },
  { code: "+212", country: "Morocco" },
  { code: "+234", country: "Nigeria" },
  { code: "+251", country: "Ethiopia" },
  { code: "+254", country: "Kenya" },
  { code: "+260", country: "Zambia" },
  { code: "+350", country: "Gibraltar" },
  { code: "+351", country: "Portugal" },
  { code: "+352", country: "Luxembourg" },
  { code: "+353", country: "Ireland" },
  { code: "+354", country: "Iceland" },
  { code: "+380", country: "Ukraine" },
  { code: "+971", country: "UAE" },
  { code: "+972", country: "Israel" },
];

// ======================================================================
// TYPES
// ======================================================================
interface ContactSectionProps {
  ourOfficeIcon: string;
  phoneIcon: string;
  emailIcon: string;
  clockIcon: string;

  phoneNumber: string;
  emailAddress: string;

  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCaptchaChange: (value: string | null) => void;
}

// ======================================================================
// COMPONENT
// ======================================================================

const ContactSection: React.FC<ContactSectionProps> = (props) => {
  const {
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
  } = props;


  return (
    <Container className="my-5">
      <Row className="g-4 align-items-stretch">

        {/* LEFT COLUMN */}
        <Col
          md={5}
          className="text-light rounded-4 p-4 shadow-lg"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <h3 className="fw-bold mb-4 text-center text-uppercase">
            Get in Touch
          </h3>

          {/* Office */}
          <div className="d-flex align-items-start mb-4 text-start">
              <img src={ourOfficeIcon} alt="Office" className="contact-icon" />            <div className="ms-3">
              <h6 className="fw-bold mb-1">Our Office</h6>
              <p className="mb-0">
                Office No. 03, Om Sai Apartment, Near Petrol Pump,<br />
                Ganur Road, Chandwad, Nashik – 423101, Maharashtra – India.
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="d-flex align-items-start mb-4 text-start">
            <img src={phoneIcon} alt="Phone" className="contact-icon" />            <div className="ms-3">
              <h6 className="fw-bold mb-1">Phone</h6>
              <a href={`tel:${phoneNumber}`} className="text-light text-decoration-none">
                {phoneNumber}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="d-flex align-items-start mb-4 text-start">
              <img src={emailIcon} alt="Email" className="contact-icon" />            <div className="ms-3">
              <h6 className="fw-bold mb-1">Email</h6>
              <a href={`mailto:${emailAddress}`} className="text-light text-decoration-none">
                {emailAddress}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="d-flex align-items-start mb-4 text-start">
              <img src={clockIcon} alt="Clock" className="contact-icon" />            <div className="ms-3">
              <h6 className="fw-bold mb-1">Working Hours</h6>
              <p className="mb-0">Mon - Sat: 10:00 AM – 7:00 PM</p>
            </div>
          </div>
        </Col>

        {/* RIGHT COLUMN */}
        <Col md={7}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">

              <h2 className="text-center mb-4 fw-bold text-uppercase" style={{ color: "#0a0808" }}>
                Send a Message
              </h2>

              <Form onSubmit={handleSubmit}>

                {/* NAME + EMAIL */}
                <Row className="mb-3 text-start">
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

                {/* COUNTRY CODE + PHONE */}
                <Row className="mb-3 text-start">
                  <Col md={4}>
                    <Form.Group controlId="countryCode">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="country-dropdown"
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
                        placeholder="e.g., 98765 43210"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* SERVICE */}
                <Form.Group className="mb-3 text-start" 
                  controlId="service">
                  <Form.Label>Select Service</Form.Label>
                  <Form.Select name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Choose a Service...</option>
                    <option>Digital Marketing</option>
                    <option>Design and Creative Services</option>
                    <option>Web App Development</option>
                    <option>Business Software Solutions</option>
                    <option>E-Commerce Solutions</option>
                    <option>Branding and Strategy</option>
                  </Form.Select>
                </Form.Group>

                {/* SUBJECT */}
                <Form.Group className="mb-3 text-start" 
                controlId="subject">
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

                {/* MESSAGE */}
                <Form.Group className="mb-3 text-start" controlId="message">
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

                {/* reCAPTCHA */}
                <ReCAPTCHA
                  sitekey="6LcJUwwsAAAAAM_k2WUuXkIpG1wZfG4bIpDLIcRP"
                  onChange={handleCaptchaChange}
                />

                {/* SUBMIT */}
                <div className="text-center mt-3">
                  <Button type="submit" variant="primary" className="px-5 py-2 fw-bold">
                    Send Message
                  </Button>
                </div>

              </Form>

            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default ContactSection;

