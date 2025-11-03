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
  Accordion,
} from "react-bootstrap";
import { PlusCircle, ChevronDown, ChevronUp } from "react-bootstrap-icons";

// ===========================================================
// Type Definitions
// ===========================================================
interface School {
  name: string;
  year: string;
  percentage: string;
}

interface College {
  name: string;
  degree: string;
  year: string;
  cgpa: string;
}

interface Experience {
  company: string;
  role: string;
  years: string;
}

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
  const [schools, setSchools] = useState<School[]>([{ name: "", year: "", percentage: "" }]);
  const [colleges, setColleges] = useState<College[]>([{ name: "", degree: "", year: "", cgpa: "" }]);
  const [experiences, setExperiences] = useState<Experience[]>([{ company: "", role: "", years: "" }]);

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
      employment: "Full-time",
      salary: "₹15,000 – ₹35,000 per month",
      type: "job",
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
      type: "job",
    },
     {
      title: "Fullstack Developer",
      experience: "2–4 years preferred",
      responsibilities: [
        "Build RESTful APIs using Node.js or Spring Boot.",
        "Integrate MySQL, PostgreSQL, or MongoDB.",
        "Focus on security and performance.",
      ],
      skills: ["Node.js / Java Spring Boot", "JWT Authentication", "Database Design"],
      employment: "Full-time",
      salary: "₹25,000 – ₹60,000 per month",
      type: "job",
    },
  ];

  const internshipOpenings = [
    {
      title: "Frontend Development Intern",
      experience: "0–1 years (Freshers welcome)",
      responsibilities: [
        "Learn and implement responsive web interfaces.",
        "Work with senior developers on real projects.",
        "Participate in code reviews and team meetings.",
      ],
      skills: [
        "Basic HTML5, CSS3, JavaScript",
        "Interest in React.js",
        "Eagerness to learn",
      ],
      employment: "Internship (3-6 months)",
      salary: "₹8,000 – ₹15,000 per month",
      type: "internship",
    },
    {
      title: "Backend Development Intern",
      experience: "0–1 years (Freshers welcome)",
      responsibilities: [
        "Assist in building REST APIs.",
        "Learn database integration and security.",
        "Contribute to backend development tasks.",
      ],
      skills: ["Basic JavaScript/Node.js", "Interest in databases", "Problem-solving skills"],
      employment: "Internship (3-6 months)",
      salary: "₹10,000 – ₹18,000 per month",
      type: "internship",
    },
  ];

  // ===========================================================
  // Handlers
  // ===========================================================
const handleChange = (e: React.ChangeEvent<any>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleDynamicChange = (
    type: "schools" | "colleges" | "experiences",
    index: number,
    field: keyof School | keyof College | keyof Experience,
    value: string
  ) => {
    if (type === "schools") {
      const updatedSchools = [...schools];
      updatedSchools[index] = { ...updatedSchools[index], [field]: value };
      setSchools(updatedSchools);
    } else if (type === "colleges") {
      const updatedColleges = [...colleges];
      updatedColleges[index] = { ...updatedColleges[index], [field]: value };
      setColleges(updatedColleges);
    } else if (type === "experiences") {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
      setExperiences(updatedExperiences);
    }
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
          backgroundImage: `url('/about/careers image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(2, 93, 145, 0.18)",
          }}
        ></div>
        <div style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(10, 125, 170, 0.42)",
          borderRadius: "12px",
          width:"90%",
          padding:"1em",
          backdropFilter: "blur(5px)",
          marginTop:"7rem"
        }}>
           <h1 className="display-5 fw-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Careers at Visiomatix</h1>
           <p className="lead text-sm sm:text-base md:text-lg">Join our innovative engineering team and be part of a dynamic environment where creativity meets cutting-edge technology. We're looking for passionate individuals ready to tackle challenging projects and grow their careers in a supportive, collaborative atmosphere.</p>
         </div>
      </section>

      {/* ============================================= */}
      {/* Job Cards with Collapsible Sections */}
      {/* ============================================= */}
      <Container>
        <Accordion defaultActiveKey="0" className="mb-5">
          {/* Jobs Section */}
          <Accordion.Item eventKey="0" className="border-0 shadow-sm rounded-4 mb-3">
            <Accordion.Header className="bg-primary text-white rounded-4">
              <h4 className="mb-0 fw-semibold">Available Jobs</h4>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="mb-4 shadow-sm border-0 rounded-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>{job.title}</h5>
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
                          style={{ backgroundColor: "#1e3a5f", borderColor: "#1e3a5f" }}
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
            </Accordion.Body>
          </Accordion.Item>

          {/* Internships Section */}
          <Accordion.Item eventKey="1" className="border-0 shadow-sm rounded-4">
            <Accordion.Header className="bg-success text-white rounded-4">
              <h4 className="mb-0 fw-semibold">Internship Opportunities</h4>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              {internshipOpenings.map((internship, index) => (
                <Card key={index} className="mb-4 shadow-sm border-0 rounded-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>{internship.title}</h5>
                        <p className="mb-1">
                          <strong>Experience:</strong> {internship.experience}
                        </p>
                        <p className="mb-1">
                          <strong>Employment:</strong> {internship.employment}
                        </p>
                        <p className="mb-3">
                          <strong>Stipend:</strong> {internship.salary}
                        </p>
                      </Col>
                      <Col md={4} className="text-md-end text-center">
                        <Button
                          variant="success"
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
                        <ul>{internship.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
                      </Col>
                      <Col md={6}>
                        <strong>Responsibilities:</strong>
                        <ul>{internship.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
        <Modal.Header closeButton style={{ backgroundColor: "#1e3a5f" }} className="text-white">
          <Modal.Title>Apply for Position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* ------------------------ Section 1 ------------------------ */}
            <h5 className="mb-3" style={{ color: "#1e3a5f" }}>Personal Information</h5>
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
            <h5 className="mt-4 d-flex align-items-center" style={{ color: "#1e3a5f" }}>
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
            <h5 className="mt-4 d-flex align-items-center" style={{ color: "#1e3a5f" }}>
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
            <h5 className="mt-4 d-flex align-items-center" style={{ color: "#1e3a5f" }}>
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
              <Button variant="primary" type="submit" className="px-5" style={{ backgroundColor: "#1e3a5f", borderColor: "#1e3a5f" }}>
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
