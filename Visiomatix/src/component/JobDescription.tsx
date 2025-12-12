import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

// Job data (you might want to move this to a separate data file)
const jobOpenings = [
  {
    id: "frontend-developer",
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
    id: "backend-developer",
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
    id: "fullstack-developer",
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
    id: "frontend-intern",
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
    id: "backend-intern",
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

const JobDescription: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contactnumber: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
  });

  // Dynamic data arrays
  const [schools, setSchools] = useState([{ name: "", year: "", percentage: "" }]);
  const [colleges, setColleges] = useState([{ name: "", degree: "", year: "", cgpa: "" }]);
  const [experiences, setExperiences] = useState([{ company: "", role: "", years: "" , currentCtc: "", expectedCtc: "", location: "", countryCode: "", countryName: "", resume: null }]);
  const [qualifications, setQualifications] = useState([{ university: "", degree: "", year: "", percentage: "" }]);

  // Find the job from both arrays
  const allJobs = [...jobOpenings, ...internshipOpenings];
  const job = allJobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <Container className="py-5 text-center">
        <h2>Job not found</h2>
        <Button onClick={() => navigate('/careers')}>Back to Careers</Button>
      </Container>
    );
  }

  const handleApplyNow = () => {
    setShowModal(true);
  };

  // Form handlers
  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDynamicChange = (
    type: "schools" | "colleges" | "experiences" | "qualifications",
    index: number,
    field: keyof any,
    value: string | File | null
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
    } else if (type === "qualifications") {
      const updatedQualifications = [...qualifications];
      updatedQualifications[index] = { ...updatedQualifications[index], [field]: value };
      setQualifications(updatedQualifications);
    }
  };

  const handleAddField = (type: "schools" | "colleges" | "experiences" | "qualifications") => {
    if (type === "schools") setSchools([...schools, { name: "", year: "", percentage: "" }]);
    if (type === "colleges")
      setColleges([...colleges, { name: "", degree: "", year: "", cgpa: "" }]);
    if (type === "experiences")
      setExperiences([...experiences, { company: "", role: "", years: "" , currentCtc: "", expectedCtc: "", location: "", countryCode: "", countryName: "", resume: null }]);
    if (type === "qualifications")
      setQualifications([...qualifications, { university: "", degree: "", year: "", percentage: "" }]);
  };

  const handleRemoveField = (
    type: "schools" | "colleges" | "experiences" | "qualifications",
    index: number
  ) => {
    if (type === "schools") {
      const updatedSchools = [...schools];
      updatedSchools.splice(index, 1);
      setSchools(updatedSchools);
    } else if (type === "colleges") {
      const updatedColleges = [...colleges];
      updatedColleges.splice(index, 1);
      setColleges(updatedColleges);
    } else if (type === "experiences") {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    } else if (type === "qualifications") {
      const updatedQualifications = [...qualifications];
      updatedQualifications.splice(index, 1);
      setQualifications(updatedQualifications);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted successfully by ${formData.firstname} ${formData.lastname}!`);
    setShowModal(false);
    setFormData({ firstname: "", lastname: "", dob: "", gender: "", contactnumber: "", email: "", role: "" });
    setSchools([{ name: "", year: "", percentage: "" }]);
    setColleges([{ name: "", degree: "", year: "", cgpa: "" }]);
    setExperiences([{ company: "", role: "", years: "" , currentCtc: "", expectedCtc: "", location: "", countryCode: "", countryName: "", resume: null }]);
    setQualifications([{ university: "", degree: "", year: "", percentage: "" }]);
  };

  return (
    <>
      {/* Hero Banner */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('/banner-images/careers/careers-V1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          position: "relative",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(2, 93, 145, 0.18)",
          }}
        />
        <div style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgb(21 53 88 / 61%)",
          borderRadius: "12px",
          width: "90%",
          padding: "1em",
          backdropFilter: "blur(5px)",
        }}>
          <h1 className="display-5 fw-bold">{job.title}</h1>
          <p className="lead">Join our team at Visiomatix Media</p>
        </div>
      </section>

      <Container className="py-4">
        <Row>
          <Col lg={8} className="mx-auto flex-align-start">
            {/* Job Overview Card */}
            <Card className="mb-4 shadow-sm border-0 flex-align-start">
              <Card.Body className="p-4 flex-align-start">
                <Row className="mb-3">
                  <Col md={6}>
                    <h6 className="text-muted mb-1">Experience Required</h6>
                    <p className="fw-semibold mb-0">{job.experience}</p>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-muted mb-1">Employment Type</h6>
                    <p className="fw-semibold mb-0">{job.employment}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h6 className="text-muted mb-1">Salary Range</h6>
                    <p className="fw-semibold mb-0">{job.salary}</p>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-muted mb-1">Job Type</h6>
                    <p className="fw-semibold mb-0">{job.type === 'job' ? 'Full-time Position' : 'Internship'}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Responsibilities Section */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Responsibilities</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <ul className="list-unstyled">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="mb-3">
                      <div className="d-flex">
                        <span className="text-primary me-3">•</span>
                        <span>{responsibility}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            {/* Skills Required Section */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Skills Required</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark px-3 py-2"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Apply Button */}
            <div className="text-center mb-5">
              <Button
                size="lg"
                className="px-5 py-3 fw-semibold"
                style={{
                  backgroundColor: job.type === 'job' ? "#1e3a5f" : "#28a745",
                  borderColor: job.type === 'job' ? "#1e3a5f" : "#28a745"
                }}
                onClick={handleApplyNow}
              >
                Apply Now for {job.title}
              </Button>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/careers')}
              >
                ← Back to Careers
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Application Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header className="border-0 text-center d-block pt-3">
          <div>
            <h5 className="fw-bold mb-0">Apply for {job.title}</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* ------------------------ Section 1 ------------------------ */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="firstname">
                  <Form.Label className="fw-semibold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter Your First Name"
                    className="rounded-3 shadow-sm border-secondary-subtle"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="lastname">
                  <Form.Label className="fw-semibold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter Your Last Name"
                    className="rounded-3 shadow-sm border-secondary-subtle"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="contactnumber">
                  <Form.Label className="fw-semibold">Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactnumber"
                    value={formData.contactnumber}
                    onChange={handleChange}
                    placeholder="Enter Your Contact Number"
                    className="rounded-3 shadow-sm border-secondary-subtle"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="rounded-3 shadow-sm border-secondary-subtle"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="dob">
                  <Form.Label className="fw-semibold">Date of Birth</Form.Label>
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
                <Form.Group controlId="role">
                  <Form.Label className="fw-semibold">Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="rounded-3 shadow-sm border-secondary-subtle"
                    required
                  >
                    <option value="">Select Role</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Employee</option>
                    <option>HR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* ------------------------ Qualification Section ------------------------ */}
            <h5 className="mt-4 d-flex align-items-center" style={{ color: "#1e3a5f" }}>
              Qualification
              <PlusCircle
                className="ms-2 text-success cursor-pointer"
                size={20}
                onClick={() => handleAddField("qualifications")}
              />
            </h5>

            {qualifications.map((item, idx) => (
              <Row key={idx} className="mb-2 align-items-center">
                <Col md={3}>
                  <Form.Control
                    placeholder="University / College"
                    value={item.university}
                    onChange={(e) =>
                      handleDynamicChange("qualifications", idx, "university", e.target.value)
                    }
                    required
                  />
                </Col>

                <Col md={3}>
                  <Form.Control
                    placeholder="Degree"
                    value={item.degree}
                    onChange={(e) =>
                      handleDynamicChange("qualifications", idx, "degree", e.target.value)
                    }
                    required
                  />
                </Col>

                <Col md={2}>
                  <Form.Control
                    placeholder="Year of Passout"
                    value={item.year}
                    onChange={(e) =>
                      handleDynamicChange("qualifications", idx, "year", e.target.value)
                    }
                    required
                  />
                </Col>

                <Col md={2}>
                  <Form.Control
                    placeholder="Percentage %"
                    value={item.percentage}
                    onChange={(e) =>
                      handleDynamicChange("qualifications", idx, "percentage", e.target.value)
                    }
                    required
                  />
                </Col>

                <Col md={2} className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveField("qualifications", idx)}
                  >
                    Remove
                  </button>
                </Col>
              </Row>
            ))}

            {/* ------------------------ Experience Section ------------------------ */}
            <h5 className="mt-4 d-flex align-items-center" style={{ color: "#1e3a5f" }}>
              Experience
              <PlusCircle
                className="ms-2 text-success cursor-pointer"
                size={20}
                onClick={() => handleAddField("experiences")}
              />
            </h5>

            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-3 border p-3 rounded position-relative">
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemoveField("experiences", idx)}
                >
                  <i className="bi bi-x-lg"></i> Remove
                </Button>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`currentCtc-${idx}`}>
                      <Form.Label className="fw-semibold">Current CTC</Form.Label>
                      <Form.Control
                        placeholder="Enter Current CTC"
                        value={exp.currentCtc}
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "currentCtc", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`expectedCtc-${idx}`}>
                      <Form.Label className="fw-semibold">Expected CTC</Form.Label>
                      <Form.Control
                        placeholder="Enter Expected CTC"
                        value={exp.expectedCtc}
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "expectedCtc", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`location-${idx}`}>
                      <Form.Label className="fw-semibold">Location</Form.Label>
                      <Form.Control
                        placeholder="Enter Location"
                        value={exp.location}
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "location", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`countryCode-${idx}`}>
                      <Form.Label className="fw-semibold">Country Code</Form.Label>
                      <Form.Control
                        placeholder="Enter Country Code"
                        value={exp.countryCode}
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "countryCode", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group controlId={`countryName-${idx}`}>
                      <Form.Label className="fw-semibold">Country Name</Form.Label>
                      <Form.Control
                        placeholder="Enter Country Name"
                        value={exp.countryName}
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "countryName", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <Form.Group controlId={`resume-${idx}`} className="w-100">
                      <Form.Label className="fw-semibold">Resume or CV</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          handleDynamicChange("experiences", idx, "resume", (e.target as HTMLInputElement).files?.[0] || null)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}

            <Row className="mt-4 align-items-center">
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  id="terms"
                  label="Accept all terms and conditions"
                  required
                />
              </Col>
              <Col md={6} className="text-end">
                <Button
                  variant="primary"
                  type="submit"
                  className="px-5"
                  style={{ backgroundColor: "#1e3a5f", borderColor: "#1e3a5f" }}
                >
                  Submit Application
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDescription;