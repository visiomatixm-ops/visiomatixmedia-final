// ===========================================================
// Filename: Careers.tsx
// Author: Viral Prajapati
// Description:
//   Careers page showing job & internship listings and
//   navigating to JobDetailsPage for the selected role.
// ===========================================================

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
} from "react-bootstrap";
import JobDetailsPage, { type JobOpening } from "./JobDetailsPage.tsx"; // 👈 import details page + type

// ===========================================================
// Component: Careers
// ===========================================================
const Careers: React.FC = () => {
  // --------------------------------------
  // Details page visibility + selected job
  // --------------------------------------
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // --------------------------------------
  // Job listing data
  // --------------------------------------
  const jobOpenings: JobOpening[] = [
    {
      title: "Frontend Developer",
      experience: "1–3 years (Experience)",
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
      salary: "",
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
      salary: "",
      type: "job",
    },
    {
      title: "Fullstack Developer",
      experience: "2–4 years preferred",
      responsibilities: [
        "Develop responsive interfaces using React.js and build RESTful APIs.",
        "Integrate databases and ensure end-to-end functionality.",
        "Collaborate on full-stack features and optimize performance.",
      ],
      skills: ["React.js, Node.js", "Database Integration", "Full-stack Development"],
      employment: "Full-time",
      salary: "",
      type: "job",
    },
  ];

  const internshipOpenings: JobOpening[] = [
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
      salary: "",
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
      skills: [
        "Basic JavaScript/Node.js",
        "Interest in databases",
        "Problem-solving skills",
      ],
      employment: "Internship (3-6 months)",
      salary: "",
      type: "internship",
    },
  ];

  // ===========================================================
  // Show Job Details Page when a job is selected
  // ===========================================================
  if (showDetails && selectedJob) {
    return (
      <JobDetailsPage
        job={selectedJob}
        onBack={() => {
          setShowDetails(false);
          setSelectedJob(null);
        }}
      />
    );
  }

  // ===========================================================
  // Main Careers Page
  // ===========================================================
  return (
    <>
      {/* ============================================= */}
      {/* Hero Banner */}
      {/* ============================================= */}
      <section
              className="d-flex align-items-center justify-content-center text-center text-light"
              style={{
                backgroundImage: "url('/about/Blur images/careers.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "80vh",
                position: "relative",
                marginBottom: "3rem",
              }}
            >
              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(2, 93, 145, 0.45)", // darker for readability
                  zIndex: 1,
                }}
              />

              {/* Content */}
              <div
                className="container position-relative"
                style={{ zIndex: 2, maxWidth: "900px" }}
              >
                <h1 className="display-5 fw-bold mb-3 text-white">
                  Careers at Visiomatix
                </h1>

                <p
                  className="lead text-white"
                  style={{
                    lineHeight: "1.7",
                    textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                  }}
                >
                  Join our innovative engineering team and be part of a dynamic environment
                  where creativity meets cutting-edge technology. We’re looking for
                  passionate individuals ready to tackle challenging projects and grow
                  their careers in a supportive, collaborative atmosphere.
                </p>
              </div>
            </section>


      {/* ============================================= */}
      {/* Job Cards with Collapsible Sections */}
      {/* ============================================= */}
      
      {/*================== why join visiomatix*/}
        
      <section style={{ backgroundColor: "#fff", color: "#101213ff !important", padding: "5rem 0" }}>
        <Container>
          <h2 className="text-center fw-bold mb-5 text-start" style={{ fontSize: "2.5rem", color: "#195186" }}>
            Why Join Visiomatix?
          </h2>

          <Row className="g-4 text-start" style={{color: "#195186" }}>
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
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "0.5rem" }}>{item.num}</h1>
                  <h4 style={{ fontWeight: "600", marginBottom: "0.75rem" }}>{item.title}</h4>
                  <p style={{  marginBottom: "0" }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    
      {/* {=========Available job========} */}
      <Container>
        <Accordion defaultActiveKey="0" className="mb-5">
          {/* Jobs Section */}
          <Accordion.Item eventKey="0" className="border-0 shadow-xl rounded-4 mb-3">
            <Accordion.Header>
              <h4 className="mb-0 fw-semibold">Available Jobs</h4>
            </Accordion.Header>

            <Accordion.Body className="p-4">
              <Row>
                {jobOpenings.map((job, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <Card
                      className="border-0 rounded-3 h-100 d-flex flex-column shadow-sm"
                      style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.20)" }}
                    >
                      <Card.Body className="d-flex flex-column flex-grow-1 align-items-start text-start p-2">
                        <div className="flex-grow-1 w-100">
                          <h6 className="fw-bold mb-1">{job.title}</h6>
                          <p className="mb-1">
                            <strong>Experience:</strong> {job.experience}
                          </p>
                          <p className="mb-1">
                            <strong>Employment:</strong> {job.employment}
                          </p>
                          <p className="mb-1">
                            <strong>Salary:</strong> {job.salary}
                          </p>

                          <p className="mb-1">
                            <strong>Preferred Skills: </strong>
                            {job.skills.join(", ")}
                          </p>

                          <p className="mb-1">
                            <strong>Responsibilities: </strong>
                            {job.responsibilities.join(", ")}
                          </p>
                        </div>

                        <hr className="w-100 my-1" />
                        <Button
                          variant="primary"
                          className="fw-semibold px-3 py-1 mt-1"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowDetails(true);
                          }}
                          style={{ backgroundColor: "#1D3458", borderColor: "#1e3a5f" }}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Internships Section */}
          <Accordion.Item eventKey="1" className="border-0 shadow-xl rounded-4 mb-3">
            <Accordion.Header>
              <h4 className="mb-0 fw-semibold">Internship Opportunities</h4>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Row>
                {internshipOpenings.map((job, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <Card
                      className="border-0 rounded-3 h-100 d-flex flex-column shadow-sm"
                      style={{ boxShadow: "0 6px 15px rgba(0,0,0,0.08)" }}
                    >
                      <Card.Body className="career-card-body">
  <h6 className="fw-bold mb-2">{job.title}</h6>

  <div className="job-info">
    <div className="job-row">
      <span className="job-label">Experience</span>
      <span className="job-value">{job.experience}</span>
    </div>

    <div className="job-row">
      <span className="job-label">Employment</span>
      <span className="job-value">{job.employment}</span>
    </div>

    <div className="job-row">
      <span className="job-label">Salary</span>
      <span className="job-value">{job.salary}</span>
    </div>

    <div className="job-row">
      <span className="job-label">Preferred Skills</span>
      <span className="job-value">
        {job.skills.join(", ")}
      </span>
    </div>

    <div className="job-row">
      <span className="job-label">Responsibilities</span>
      <span className="job-value">
        {job.responsibilities.join(",")}
      </span>
    </div>
  </div>

  <hr className="my-2" />

  <Button
    variant="primary"
    className="fw-semibold px-3 py-1 mt-auto"
    style={{ backgroundColor: "#1D3458", borderColor: "#1e3a5f" }}
    onClick={() => {
      setSelectedJob(job);
      setShowDetails(true);
    }}
  >
    View Details
  </Button>
</Card.Body>

                    </Card>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default Careers;
