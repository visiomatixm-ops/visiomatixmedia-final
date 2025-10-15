// ===========================================================
// Filename: Careers.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Updated On: 15-Oct-2025
// Description:
//   Careers page showcasing open roles, detailed job sections,
//   and an enhanced modal-based application form with
//   dynamic sections for education and work experience.
// ===========================================================

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

// ===========================================================
// Component: Careers
// ===========================================================
const Careers: React.FC = () => {
  // --------------------------------------
  // Modal visibility state
  // --------------------------------------
  const [showModal, setShowModal] = useState(false);

  // --------------------------------------
  // Main form state
  // --------------------------------------
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
  });

  // --------------------------------------
  // Dynamic data arrays
  // --------------------------------------
  const [schools, setSchools] = useState([{ name: "", year: "", percentage: "" }]);
  const [colleges, setColleges] = useState([{ name: "", degree: "", year: "", cgpa: "" }]);
  const [experiences, setExperiences] = useState([{ company: "", role: "", years: "" }]);

  // --------------------------------------
  // Job listing data
  // --------------------------------------
  const jobOpenings = [
    {
      title: "Frontend Developer",
      experience: "1–3 years (Interns & Freshers welcome)",
      responsibilities: [
        "Develop responsive interfaces using React.js.",
        "Collaborate with designers to build pixel-perfect UIs.",
        "Optimize apps for speed and scalability.",
      ],
      skills: [
        "HTML5, CSS3, JavaScript (ES6+)",
        "React.js, Bootstrap, TailwindCSS",
        "Basic REST API knowledge",
      ],
      employment: "Full-time / Internship",
      salary: "₹15,000 – ₹35,000 per month",
    },
    {
      title: "Backend Developer",
      experience: "2–4 years preferred",
      responsibilities: [
        "Build RESTful APIs using Node.js or Spring Boot.",
        "Integrate MySQL, PostgreSQL, or MongoDB.",
        "Focus on security and performance.",
      ],
      skills: ["Node.js / Java Spring Boot", "JWT Authentication", "Database Design"],
      employment: "Full-time",
      salary: "₹25,000 – ₹60,000 per month",
    },
  ];

  // ===========================================================
  // Handlers
  // ===========================================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDynamicChange = (
    type: "schools" | "colleges" | "experiences",
    index: number,
    field: string,
    value: string
  ) => {
    const stateSetter =
      type === "schools" ? setSchools : type === "colleges" ? setColleges : setExperiences;
    const currentData =
      type === "schools" ? [...schools] : type === "colleges" ? [...colleges] : [...experiences];
    currentData[index][field] = value;
    stateSetter(currentData);
  };

  const handleAddField = (type: "schools" | "colleges" | "experiences") => {
    if (type === "schools") setSchools([...schools, { name: "", year: "", percentage: "" }]);
    if (type === "colleges")
      setColleges([...colleges, { name: "", degree: "", year: "", cgpa: "" }]);
    if (type === "experiences")
      setExperiences([...experiences, { company: "", role: "", years: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted successfully by ${formData.firstname} ${formData.lastname}!`);
    setShowModal(false);
    setFormData({ firstname: "", lastname: "", dob: "", gender: "" });
    setSchools([{ name: "", year: "", percentage: "" }]);
    setColleges([{ name: "", degree: "", year: "", cgpa: "" }]);
    setExperiences([{ company: "", role: "", years: "" }]);
  };

  // ===========================================================
  // Render
  // ===========================================================
  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner */}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,64,0.6)",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-5 fw-bold">Careers at Visiomatix</h1>
          <p className="lead">Join our innovative engineering team.</p>
        </div>
      </section>

      {/* ============================================= */}
      {/* Job Cards */}
      {/* ============================================= */}
      <Container>
        {jobOpenings.map((job, index) => (
          <Card key={index} className="mb-5 shadow-sm border-0 rounded-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h4 className="fw-semibold mb-2 text-primary">{job.title}</h4>
                  <p className="mb-1">
                    <strong>Experience:</strong> {job.experience}
                  </p>
                  <p className="mb-1">
                    <strong>Employment:</strong> {job.employment}
                  </p>
                  <p className="mb-3">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                </Col>
                <Col md={4} className="text-md-end text-center">
                  <Button
                    variant="primary"
                    className="fw-semibold px-4"
                    onClick={() => setShowModal(true)}
                  >
                    Apply Now
                  </Button>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <strong>Preferred Skills:</strong>
                  <ul>{job.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </Col>
                <Col md={6}>
                  <strong>Responsibilities:</strong>
                  <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* ============================================= */}
      {/* Apply Modal */}
      {/* ============================================= */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Apply for Position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* ------------------------ Section 1 ------------------------ */}
            <h5 className="mb-3 text-primary">Personal Information</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Trans</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* ------------------------ Section 2 ------------------------ */}
            <h5 className="mt-4 text-primary d-flex align-items-center">
              School Details
              <PlusCircle
                className="ms-2 text-success cursor-pointer"
                size={20}
                onClick={() => handleAddField("schools")}
              />
            </h5>
            {schools.map((school, idx) => (
              <Row key={idx} className="mb-2">
                <Col md={6}>
                  <Form.Control
                    placeholder="School Name"
                    value={school.name}
                    onChange={(e) =>
                      handleDynamicChange("schools", idx, "name", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    placeholder="Year"
                    value={school.year}
                    onChange={(e) =>
                      handleDynamicChange("schools", idx, "year", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    placeholder="Percentage"
                    value={school.percentage}
                    onChange={(e) =>
                      handleDynamicChange("schools", idx, "percentage", e.target.value)
                    }
                    required
                  />
                </Col>
              </Row>
            ))}

            {/* ------------------------ Section 3 ------------------------ */}
            <h5 className="mt-4 text-primary d-flex align-items-center">
              College Details
              <PlusCircle
                className="ms-2 text-success cursor-pointer"
                size={20}
                onClick={() => handleAddField("colleges")}
              />
            </h5>
            {colleges.map((college, idx) => (
              <Row key={idx} className="mb-2">
                <Col md={4}>
                  <Form.Control
                    placeholder="College Name"
                    value={college.name}
                    onChange={(e) =>
                      handleDynamicChange("colleges", idx, "name", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Degree"
                    value={college.degree}
                    onChange={(e) =>
                      handleDynamicChange("colleges", idx, "degree", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    placeholder="Year"
                    value={college.year}
                    onChange={(e) =>
                      handleDynamicChange("colleges", idx, "year", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    placeholder="CGPA"
                    value={college.cgpa}
                    onChange={(e) =>
                      handleDynamicChange("colleges", idx, "cgpa", e.target.value)
                    }
                    required
                  />
                </Col>
              </Row>
            ))}

            {/* ------------------------ Section 4 ------------------------ */}
            <h5 className="mt-4 text-primary d-flex align-items-center">
              Work Experience
              <PlusCircle
                className="ms-2 text-success cursor-pointer"
                size={20}
                onClick={() => handleAddField("experiences")}
              />
            </h5>
            {experiences.map((exp, idx) => (
              <Row key={idx} className="mb-2">
                <Col md={5}>
                  <Form.Control
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      handleDynamicChange("experiences", idx, "company", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={5}>
                  <Form.Control
                    placeholder="Role / Designation"
                    value={exp.role}
                    onChange={(e) =>
                      handleDynamicChange("experiences", idx, "role", e.target.value)
                    }
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    placeholder="Years"
                    value={exp.years}
                    onChange={(e) =>
                      handleDynamicChange("experiences", idx, "years", e.target.value)
                    }
                    required
                  />
                </Col>
              </Row>
            ))}

            <div className="text-center mt-4">
              <Button variant="primary" type="submit" className="px-5">
                Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Careers;
