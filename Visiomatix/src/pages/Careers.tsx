// ===========================================================
// Filename: Careers.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   Careers page showcasing open roles, detailed job sections,
//   and an application form. Layout matches Visiomatix theme.
// ===========================================================

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// React-Bootstrap imports for layout, cards, and forms

const Careers: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Temporary form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted successfully for ${formData.role}!`);
    setFormData({ name: "", email: "", role: "", message: "" });
  };

  // Job data
  const jobOpenings = [
    {
      title: "Frontend Developer",
      experience: "1–3 years (Interns & Freshers welcome)",
      responsibilities: [
        "Develop responsive web interfaces using React.js or similar frameworks.",
        "Collaborate with designers to translate UI/UX wireframes into working code.",
        "Optimize applications for maximum speed and scalability.",
      ],
      skills: [
        "Proficient in HTML5, CSS3, JavaScript (ES6+)",
        "Experience with React.js, Bootstrap, and TailwindCSS",
        "Basic understanding of REST APIs",
      ],
      employment: "Full-time / Internship",
      salary: "₹15,000 – ₹35,000 per month (based on experience)",
    },
    {
      title: "Backend Developer",
      experience: "2–4 years preferred",
      responsibilities: [
        "Design and maintain RESTful APIs using Node.js, Express, or Java Spring Boot.",
        "Integrate databases such as MySQL, PostgreSQL, or MongoDB.",
        "Ensure data security and optimize performance for scalability.",
      ],
      skills: [
        "Strong knowledge of Java, Spring Boot or Node.js",
        "Understanding of JWT Authentication & Microservices",
        "Experience with Oracle or MariaDB preferred",
      ],
      employment: "Full-time",
      salary: "₹25,000 – ₹60,000 per month",
    },
    {
      title: "Fullstack Developer",
      experience: "2–5 years preferred",
      responsibilities: [
        "Develop and maintain end-to-end web applications.",
        "Integrate backend APIs with modern frontends.",
        "Work with designers and DevOps teams to ensure smooth deployment.",
      ],
      skills: [
        "Proficiency in Java (Spring Boot) and React.js",
        "Understanding of RESTful architecture and database schema design",
        "Experience in CI/CD pipelines and Git workflow",
      ],
      employment: "Full-time / Remote Option",
      salary: "₹40,000 – ₹80,000 per month",
    },
  ];

  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner Section */}
      {/* ============================================= */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('/about/careers.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        {/* Dark overlay for text */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        ></div>

        {/* Banner Text */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-5 fw-bold">Careers at Visiomatix</h1>
          <p className="lead">
            Join our creative team and build impactful digital experiences.
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Job Openings Section */}
      {/* ============================================= */}
      <Container>
        {jobOpenings.map((job, index) => (
          <Card key={index} className="mb-5 shadow-sm border-0 rounded-4">
            <Card.Body>
              <h4 className="fw-semibold mb-3 text-primary">{job.title}</h4>

              <Row>
                <Col md={6}>
                  <p>
                    <strong>Experience Criteria:</strong> {job.experience}
                  </p>
                  <p>
                    <strong>Type of Employment:</strong> {job.employment}
                  </p>
                  <p>
                    <strong>Salary / Stipend Range:</strong> {job.salary}
                  </p>
                </Col>

                <Col md={6}>
                  <p>
                    <strong>Preferred Skills:</strong>
                  </p>
                  <ul>
                    {job.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </Col>
              </Row>

              <div>
                <p>
                  <strong>Responsibilities:</strong>
                </p>
                <ul>
                  {job.responsibilities.map((task, j) => (
                    <li key={j}>{task}</li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* ============================================= */}
      {/* Application Form Section */}
      {/* ============================================= */}
      <Container className="mb-5">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body>
            <h4 className="fw-bold mb-3 text-center">Apply Now</h4>
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

              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Applying For</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a role</option>
                  {jobOpenings.map((job, idx) => (
                    <option key={idx} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Why do you want to join us?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about yourself..."
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="px-4">
                  Submit Application
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Careers;
