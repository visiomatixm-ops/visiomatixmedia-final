// src/pages/Careers.tsx
// ===========================================================
// Filename: Careers.tsx
// Author: Viral Prajapati (modified)
// Updated to: include email, file upload, centered popup, send full data
// Fixed TypeScript types so no File is passed to Form.Control value props.
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
import JobOpenings from "./CareersJob/JobOpenings";
import Internship from "./CareersJob/Internship";

/* ---- Types ---- */
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

interface FormFields {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  email: string;
  // optional fields used in internship modal
  position?: string;
  duration?: string;
  location?: string;
  eligibility?: string;
}

interface InternshipFormFields {
  position: string;
  duration: string;
  location: string;
  eligibility: string;
  email: string;
}

/* ---- Component ---- */
const Careers: React.FC = () => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const [showInternshipModal, setShowInternshipModal] = useState(false);

  // selected position for applying
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedInternship, setSelectedInternship] = useState<any>(null);

  // main form state (strings only; resume moved to separate state)
  const [formData, setFormData] = useState<FormFields>({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    email: "",
  });

  // resume kept separately to avoid passing File to text inputs
  const [resume, setResume] = useState<File | null>(null);

  // internship form state
  const [internshipFormData, setInternshipFormData] = useState<InternshipFormFields>({
    position: "",
    duration: "",
    location: "",
    eligibility: "",
    email: "",
  });

  // internship resume
  const [internshipResume, setInternshipResume] = useState<File | null>(null);

  // dynamic arrays
  const [schools, setSchools] = useState<School[]>([
    { name: "", year: "", percentage: "" },
  ]);
  const [colleges, setColleges] = useState<College[]>([
    { name: "", degree: "", year: "", cgpa: "" },
  ]);
  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", role: "", years: "" },
  ]);

  // hide/disable apply after submission
  const [formSubmitted, setFormSubmitted] = useState(false);

  // popup center
  const [showPopup, setShowPopup] = useState(false);

  // job data (unchanged)
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
      skills: ["Basic HTML5, CSS3, JavaScript", "Interest in React.js", "Eagerness to learn"],
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
    {
      title: "Full Stack Developer Intern",
      experience: "0–1 years (Freshers welcome)",
      responsibilities: [
        "Assist in developing and maintaining both frontend and backend applications.",
        "Work with APIs, databases, and third-party integrations.",
        "Collaborate with design and development teams for smooth project execution.",
      ],
      skills: ["HTML, CSS, JavaScript (ES6+)", "React.js / Angular / Node.js", "Basic understanding of databases (MySQL/MongoDB)", "Git and version control"],
      employment: "Internship (3-6 months)",
      salary: "₹12,000 – ₹20,000 per month",
      type: "internship",
    },
    {
      title: "Email Marketing Specialist Intern",
      experience: "0–1 years (Freshers welcome)",
      responsibilities: [
        "Assist in creating and executing email marketing campaigns.",
        "Monitor email performance metrics (CTR, open rates, conversions).",
        "Design engaging email templates using HTML/CSS.",
        "Maintain and segment subscriber lists for targeted campaigns.",
      ],
      skills: ["Basic understanding of email marketing tools (Mailchimp, Sendinblue, etc.)", "Knowledge of HTML/CSS for email design", "Good communication and analytical skills", "Creativity and attention to detail"],
      employment: "Internship (3-6 months)",
      salary: "₹8,000 – ₹15,000 per month",
      type: "internship",
    },
    {
      title: "UI/UX Developer Intern",
      experience: "0–1 years (Freshers welcome)",
      responsibilities: [
        "Assist in designing user interfaces for web and mobile applications.",
        "Create wireframes, prototypes, and design mockups.",
        "Collaborate with developers to ensure design feasibility.",
        "Conduct user testing and suggest design improvements.",
      ],
      skills: ["Figma / Adobe XD / Sketch", "Basic understanding of HTML, CSS, and responsive design", "User-centered design approach", "Attention to detail and creativity"],
      employment: "Internship (3-6 months)",
      salary: "₹10,000 – ₹18,000 per month",
      type: "internship",
    },
  ];

  // ----------------- Handlers -----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormFields;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value } as FormFields));
  };

  // file input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
  };

  const handleDynamicChange = (
    type: "schools" | "colleges" | "experiences",
    index: number,
    field: keyof School | keyof College | keyof Experience,
    value: string
  ) => {
    if (type === "schools") {
      const updated = [...schools];
      updated[index] = { ...updated[index], [field]: value } as School;
      setSchools(updated);
    } else if (type === "colleges") {
      const updated = [...colleges];
      updated[index] = { ...updated[index], [field]: value } as College;
      setColleges(updated);
    } else {
      const updated = [...experiences];
      updated[index] = { ...updated[index], [field]: value } as Experience;
      setExperiences(updated);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleAddField = (
  type: "schools" | "colleges" | "experiences"
) => {
  if (type === "schools")
    setSchools([...schools, { name: "", year: "", percentage: "" }]);
  if (type === "colleges")
    setColleges([...colleges, { name: "", degree: "", year: "", cgpa: "" }]);
  if (type === "experiences")
    setExperiences([...experiences, { company: "", role: "", years: "" }]);
};


  // open modal for specific position
  const openApplyModal = (positionTitle: string, isInternship: boolean = false, internshipData?: any) => {
    if (isInternship) {
      setSelectedInternship(internshipData);
      setInternshipFormData({
        position: internshipData?.title || "",
        duration: internshipData?.employment || "",
        location: "Pune / Remote", // Default location
        eligibility: "",
        email: "",
      });
      setShowInternshipModal(true);
    } else {
      setSelectedPosition(positionTitle);
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      dob: "",
      gender: "",
      email: "",
    });
    setResume(null);
    setSchools([{ name: "", year: "", percentage: "" }]);
    setColleges([{ name: "", degree: "", year: "", cgpa: "" }]);
    setExperiences([{ company: "", role: "", years: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!formData.firstname || !formData.lastname || !formData.email) {
      alert("Please fill first name, last name and email.");
      return;
    }

    const fd = new FormData();
    fd.append("firstname", formData.firstname);
    fd.append("lastname", formData.lastname);
    fd.append("dob", formData.dob);
    fd.append("gender", formData.gender);
    fd.append("position", selectedPosition || "Internship");
    fd.append("email", formData.email);
    fd.append("schools", JSON.stringify(schools));
    fd.append("colleges", JSON.stringify(colleges));
    fd.append("experiences", JSON.stringify(experiences));
    if (resume) fd.append("resume", resume);

    try {
      const resp = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: fd,
      });

      const resJson = await resp.json();
      if (resp.ok && resJson.success) {
        // mark submitted, close modal, show popup
        setFormSubmitted(true);
        setShowModal(false);
        setShowPopup(true);
        // reset form fields for next time (optional)
        resetForm();
      } else {
        console.error("Submission failed:", resJson);
        alert(resJson.message || "Failed to submit application.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit application!");
    }
  };

  const handleInternshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting internship application...");

    // basic validation
    if (!internshipFormData.position || !internshipFormData.email) {
      alert("Please fill position and email.");
      return;
    }

    const fd = new FormData();
    fd.append("position", internshipFormData.position);
    fd.append("duration", internshipFormData.duration);
    fd.append("location", internshipFormData.location);
    fd.append("eligibility", internshipFormData.eligibility);
    fd.append("email", internshipFormData.email);
    if (internshipResume) fd.append("resume", internshipResume);

    try {
      const resp = await fetch("http://localhost:5000/api/apply-internship", {
        method: "POST",
        body: fd,
      });

      const resJson = await resp.json();
      if (resp.ok && resJson.success) {
        console.log("Successfully applied for internship!");
        // mark submitted, close modal, show popup
        setFormSubmitted(true);
        setShowInternshipModal(false);
        setShowPopup(true);
        // reset form fields
        setInternshipFormData({
          position: "",
          duration: "",
          location: "",
          eligibility: "",
          email: "",
        });
        setInternshipResume(null);
      } else {
        console.error("Submission failed:", resJson);
        alert(resJson.message || "Failed to submit internship application.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit internship application!");
    }
  };

  // ===================== RENDER =====================
  return (
    <>
      {/* Hero and Why sections left unchanged (kept from original) */}
      <section
        className="hero-section text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('/about/herocareer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "85vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(30, 58, 95, 0.5)",
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "900px",
            padding: "2rem",
            backgroundColor: "rgba(21, 53, 88, 0.6)",
            borderRadius: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <h1 className="display-4 fw-bold mb-3" style={{ color: "#ffffff", letterSpacing: "1px" }}>
            Join Our Team at Visiomatix
          </h1>
          <p className="lead mb-4" style={{ color: "#e0e0e0", fontSize: "1.2rem", lineHeight: "1.6" }}>
            Become part of a passionate team where technology, innovation, and creativity drive real-world solutions. At Visiomatix, every project is an opportunity to grow and make an impact.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#1e3a5f", color: "#ffffff", padding: "5rem 0" }}>
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2.5rem", color: "#ffffff" }}>
            Why Join Visiomatix?
          </h2>

          <Row className="g-4">
            {[
              {
                num: "1.",
                title: "Collaborative Environment",
                desc: "Work in a culture that values teamwork, communication, and shared success — where every voice matters.",
              },
              {
                num: "2.",
                title: "Continuous Learning",
                desc: "Gain hands-on experience with the latest technologies and continuous upskilling programs that keep you ahead.",
              },
              {
                num: "3.",
                title: "Career Growth",
                desc: "Build your career path with mentorship, growth-focused projects, and leadership opportunities.",
              },
              {
                num: "4.",
                title: "Client Diversity",
                desc: "Collaborate with a wide range of clients across industries, gaining exposure to diverse projects and perspectives.",
              },
            ].map((item, i) => (
              <Col md={6} key={i}>
                <div
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "3rem 2rem",
                    borderRadius: "12px",
                    height: "100%",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <h1 style={{ fontSize: "3rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{item.num}</h1>
                  <h4 style={{ color: "#ffffff", fontWeight: "600", marginBottom: "0.75rem" }}>{item.title}</h4>
                  <p style={{ color: "#c5c6c7", marginBottom: "0" }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Jobs / Internships */}
      <Container>
        <Accordion defaultActiveKey="0" className="mb-5">
          <Accordion.Item eventKey="0" className="border-0 shadow-sm rounded-4 mb-3">
            <Accordion.Header className="bg-primary text-white rounded-4">
              <h4 className="mb-0 fw-semibold">Available Jobs</h4>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <JobOpenings onApply={openApplyModal} />
            </Accordion.Body>
          </Accordion.Item>

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
                        <p className="mb-1"><strong>Experience:</strong> {internship.experience}</p>
                        <p className="mb-1"><strong>Employment:</strong> {internship.employment}</p>
                        <p className="mb-3"><strong>Stipend:</strong> {internship.salary}</p>
                      </Col>
                      <Col md={4} className="text-md-end text-center">
                        <Button
                          variant="success"
                          className="fw-semibold px-4"
                          onClick={() => openApplyModal(internship.title, true, internship)}
                          disabled={formSubmitted}
                        >
                          {formSubmitted ? "Application Submitted" : "Apply Now"}
                        </Button>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={6}>
                        <strong>Preferred Skills:</strong>
                        <ul className="list-unstyled">{internship.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
                      </Col>
                      <Col md={6}>
                        <strong>Responsibilities:</strong>
                        <ul className="list-unstyled">{internship.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      {/* Apply Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
  <Modal.Header
    closeButton
    style={{
      background: "#1e3a5f",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}
    className="text-white"
  >
    <Modal.Title style={{ fontWeight: "700", fontSize: "1.4rem" }}>
      Apply for: {selectedPosition || "Position"}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body
    style={{
      background: "#1e3a5f",
      color: "white",
      borderRadius: "0 0 20px 20px",
      padding: "30px",
    }}
  >
    <Form onSubmit={handleSubmit}>
      {/* PERSONAL INFO */}
      <div
        className="mb-4 p-4 rounded-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h5 className="mb-3 fw-bold" style={{ color: "#60a5fa" }}>
          Personal Information
        </h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstname">
              <Form.Label className="text-white">First Name</Form.Label>
              <Form.Control
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="lastname">
              <Form.Label className="text-white">Last Name</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label className="text-white">Date of Birth</Form.Label>
              <Form.Control
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="gender">
              <Form.Label className="text-white">Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Trans</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="email">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@example.com"
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* SCHOOL DETAILS */}
      <div
        className="mb-4 p-4 rounded-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h5 className="mb-3 fw-bold" style={{ color: "#60a5fa" }}>
          School Details
        </h5>

        {schools.map((school, idx) => (
          <Row key={idx} className="mb-2">
            <Col md={6}>
              <Form.Control
                placeholder="School Name"
                value={school.name}
                onChange={(e) => handleDynamicChange("schools", idx, "name", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>

            <Col md={3}>
              <Form.Control
                placeholder="Year"
                value={school.year}
                onChange={(e) => handleDynamicChange("schools", idx, "year", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>

            <Col md={3}>
              <Form.Control
                placeholder="Percentage"
                value={school.percentage}
                onChange={(e) => handleDynamicChange("schools", idx, "percentage", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>
          </Row>
        ))}
      </div>

      {/* COLLEGE DETAILS */}
      <div
        className="mb-4 p-4 rounded-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h5 className="mb-3 fw-bold" style={{ color: "#60a5fa" }}>
          College Details
        </h5>

        {colleges.map((college, idx) => (
          <Row key={idx} className="mb-2">
            <Col md={4}>
              <Form.Control
                placeholder="College Name"
                value={college.name}
                onChange={(e) => handleDynamicChange("colleges", idx, "name", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>

            <Col md={4}>
              <Form.Control
                placeholder="Degree"
                value={college.degree}
                onChange={(e) => handleDynamicChange("colleges", idx, "degree", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                placeholder="Year"
                value={college.year}
                onChange={(e) => handleDynamicChange("colleges", idx, "year", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                placeholder="CGPA"
                value={college.cgpa}
                onChange={(e) => handleDynamicChange("colleges", idx, "cgpa", e.target.value)}
                required
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "1px solid #ffffff",
                }}
              />
            </Col>
          </Row>
        ))}
      </div>

      {/* EXPERIENCE
      <div
        className="mb-4 p-4 rounded-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h5 className="mb-3 fw-bold" style={{ color: "#60a5fa" }}>
          Work Experience
        </h5>

        {experiences.map((exp, idx) => (
          <Row key={idx} className="mb-2">
            <Col md={5}>
              <Form.Control
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleDynamicChange("experiences", idx, "company", e.target.value)}
                required
                style={{
                  backgroundColor: "#0f172a",
                  color: "white",
                  border: "1px solid #334155",
                }}
              />
            </Col>

            <Col md={5}>
              <Form.Control
                placeholder="Role / Designation"
                value={exp.role}
                onChange={(e) => handleDynamicChange("experiences", idx, "role", e.target.value)}
                required
                style={{
                  backgroundColor: "#0f172a",
                  color: "white",
                  border: "1px solid #334155",
                }}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                placeholder="Years"
                value={exp.years}
                onChange={(e) => handleDynamicChange("experiences", idx, "years", e.target.value)}
                required
                style={{
                  backgroundColor: "#0f172a",
                  color: "white",
                  border: "1px solid #334155",
                }}
              />
            </Col>
          </Row>
        ))}
      </div> */}

      {/* RESUME */}
      <div
        className="mb-4 p-4 rounded-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h5 className="mb-3 fw-bold" style={{ color: "#60a5fa" }}>
          Upload Resume
        </h5>
        <Form.Group controlId="resume">
          <Form.Label className="text-white">Choose your resume</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{
              backgroundColor: "#1e3a5f",
              color: "white",
              border: "1px solid #ffffff",
              padding: "8px",
            }}
          />
        </Form.Group>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="text-center mt-4">
        <Button
          variant="primary"
          type="submit"
          className="px-5 py-2"
          style={{
            background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(37,99,235,0.6)",
          }}
        >
          Submit Application
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

      {/* Internship Modal */}
      <Modal show={showInternshipModal} onHide={() => setShowInternshipModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          style={{
            background: "#28a745",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
          className="text-white"
        >
          <Modal.Title style={{ fontWeight: "700", fontSize: "1.4rem" }}>
            Apply for Internship: {selectedInternship?.title || "Position"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            background: "#1e3a5f",
            color: "white",
            borderRadius: "0 0 20px 20px",
            padding: "30px",
          }}
        >
          <div className="min-vh-50 d-flex align-items-center justify-content-center p-3">
            <div className="w-100 border border-primary rounded shadow p-4" style={{maxWidth: '32rem'}}>
              <form onSubmit={handleInternshipSubmit}>
                {/* Header */}
                <h1 className="display-3 fw-bold text-center text-primary">
                  Internship Application
                </h1>
                <p className="text-center text-muted mb-4">
                  Enter the internship details below 🚀
                </p>

                {/* Job Title */}
                <div className="mb-3">
                  <label
                    htmlFor="position"
                    className="form-label fw-semibold"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={internshipFormData.position}
                    onChange={(e) => setInternshipFormData(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="e.g. Full Stack Developer"
                    className="form-control"
                    required
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  />
                </div>

                {/* Experience */}
                <div className="mb-3">
                  <label
                    htmlFor="duration"
                    className="form-label fw-semibold"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={internshipFormData.duration}
                    onChange={(e) => setInternshipFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g. 3-6 months"
                    className="form-control"
                    required
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label
                    htmlFor="location"
                    className="form-label fw-semibold"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={internshipFormData.location}
                    onChange={(e) => setInternshipFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Pune / Remote"
                    className="form-control"
                    required
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  />
                </div>

                {/* Eligibility */}
                <div className="mb-3">
                  <label
                    htmlFor="eligibility"
                    className="form-label fw-semibold">
                    Eligibility
                  </label>
                  <select
                    className="form-select"
                    value={internshipFormData.eligibility}
                    onChange={(e) => setInternshipFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                    required
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  >
                    <option value="">-Select-</option>
                    <option value="BE">BE</option>
                    <option value="ME">ME</option>
                    <option value="Btech">Btech</option>
                    <option value="Mtech">Mtech</option>
                    <option value="MCA">MCA</option>
                    <option value="BCA">BCA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={internshipFormData.email}
                    onChange={(e) => setInternshipFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="yourname@example.com"
                    className="form-control"
                    required
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  />
                </div>

                {/* Resume Upload */}
                <div className="mb-3">
                  <label
                    htmlFor="resume"
                    className="form-label fw-semibold"
                  >
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    id="resume"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setInternshipResume(file);
                    }}
                    style={{
                      backgroundColor: "#1e3a5f",
                      color: "white",
                      border: "1px solid #ffffff",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 fs-5 fw-semibold"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Centered success popup (Option B style: soft shadow card) */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 14,
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(20,20,40,0.15)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ width: 80, height: 80, margin: "0 auto 12px", borderRadius: 40, background: "#e9f8ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#19A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 style={{ marginBottom: 8, color: "#17394a" }}>Thank You for Applying!</h3>
            <p style={{ marginBottom: 18, color: "#4b5b66" }}>
              We’ve received your application. We’ll get back to you soon!
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Button
                onClick={() => setShowPopup(false)}
                style={{ backgroundColor: "#1e3a5f", borderColor: "#1e3a5f" }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Careers;
