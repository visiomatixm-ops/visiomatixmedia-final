// ===========================================================
// Filename: JobDetailsPage.tsx
// Description:
//   Detailed view for a selected job/internship with
//   modal-based application forms.
// ===========================================================

import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
  type FC,
} from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { PlusCircle } from "lucide-react";

// ---------------- Types ----------------
export interface JobOpening {
  title: string;
  experience: string;
  responsibilities: string[];
  skills: string[];
  employment: string;
  salary: string;
  type: "job" | "internship";
}

type Qualification = {
  university: string;
  degree: string;
  year: string;
  percentage: string;
};

type Experience = {
  currentCtc: string;
  expectedCtc: string;
  location: string;
  countryCode: string;
  countryName: string;
  resume: File | null;
};

interface JobDetailsPageProps {
  job: JobOpening;
  onBack?: () => void;
}

// ======================================================
// Component
// ======================================================
const JobDetailsPage: FC<JobDetailsPageProps> = ({ job, onBack }) => {
  const isInternship = job.type === "internship";

  const [showModal, setShowModal] = useState<boolean>(false);

  // ---------- JOB form state (for full-time jobs) ----------
  const [jobFormData, setJobFormData] = useState({
    firstname: "",
    lastname: "",
    contactnumber: "",
    email: "",
    dob: "",
    role: "",
  });

  const [qualifications, setQualifications] = useState<Qualification[]>([
    { university: "", degree: "", year: "", percentage: "" },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      currentCtc: "",
      expectedCtc: "",
      location: "",
      countryCode: "",
      countryName: "",
      resume: null,
    },
  ]);

  // ---------- INTERNSHIP form state ----------
  const [internFormData, setInternFormData] = useState({
    fullname: "",
    email: "",
    countryCode: "+91",
    phone: "",
    education: "",
    skills: "",
    github: "",
    why: "",
  });
  const [internResume, setInternResume] = useState<File | null>(null);

  // ======================================================
  // Common handlers
  // ======================================================
  const handleApplyClick = () => {
    setShowModal(true);
  };

  // ---------- Handlers for JOB form ----------
  const handleJobChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = (type: "qualifications" | "experiences") => {
    if (type === "qualifications") {
      setQualifications((prev) => [
        ...prev,
        { university: "", degree: "", year: "", percentage: "" },
      ]);
    } else {
      setExperiences((prev) => [
        ...prev,
        {
          currentCtc: "",
          expectedCtc: "",
          location: "",
          countryCode: "",
          countryName: "",
          resume: null,
        },
      ]);
    }
  };

  const handleRemoveField = (
    type: "qualifications" | "experiences",
    index: number
  ) => {
    if (type === "qualifications") {
      setQualifications((prev) => prev.filter((_, i) => i !== index));
    } else {
      setExperiences((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDynamicChange = (
    type: "qualifications" | "experiences",
    index: number,
    field: keyof Qualification | keyof Experience,
    value: string | File | null
  ) => {
    if (type === "qualifications") {
      setQualifications((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          [field as keyof Qualification]: value as string,
        };
        return copy;
      });
    } else {
      setExperiences((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          [field as keyof Experience]: value as string | File | null,
        };
        return copy;
      });
    }
  };

  const handleJobSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔧 Plug your API call here (e.g., submitCareerForm)
    console.log("JOB Application data:", jobFormData);
    console.log("Qualifications:", qualifications);
    console.log("Experiences:", experiences);

    setShowModal(false);
  };

  // ---------- Handlers for INTERNSHIP form ----------
  const handleInternChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setInternFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setInternResume(file);
  };

  const handleInternSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔧 Plug your API call here (e.g., submitCareerForm)
    console.log("INTERNSHIP Application data:", internFormData);
    console.log("Resume file:", internResume);

    setShowModal(false);
  };

  const selectedPosition = job.title;

  // ======================================================
  // Render
  // ======================================================
  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="pt-5" />

      <Container className="mb-5 mt-5">
        <div
          className="card border-0 shadow-lg rounded-4"
          style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.20)" }}
        >
          <div className="card-body p-4 p-md-5 text-start">
            <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-3">
              <div>
                {/* Title */}
                <h2 className="fw-bold mb-1" style={{ color: "#1e3a5f" }}>
                  {job.title}
                </h2>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span
                    className="badge rounded-pill text-light"
                    style={{ backgroundColor: "#1D3458" }}
                  >
                    {isInternship
                      ? "Exciting internship opportunity"
                      : "Legendary full stack opportunity"}
                  </span>
                </div>
              </div>

              <div className="text-md-end">
                {onBack && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={onBack}
                    style={{
                      borderRadius: "999px",
                      backgroundColor: "#1D3458",
                      borderColor: "#1D3458",
                      color: "#ffffff",
                    }}
                  >
                    &larr; Back to all jobs
                  </Button>
                )}
              </div>
            </div>

            {/* Meta info row */}
            <Row className="g-3 mb-4">
              <Col md={4}>
                <div className="p-3 rounded-3 bg-light h-100">
                  <p className="mb-1 text-muted small">Experience</p>
                  <p className="mb-0 fw-semibold" style={{ color: "#1e3a5f" }}>
                    {job.experience}
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-3 rounded-3 bg-light h-100">
                  <p className="mb-1 text-muted small">Employment</p>
                  <p className="mb-0 fw-semibold" style={{ color: "#1e3a5f" }}>
                    {job.employment}
                  </p>
                  <p className="mb-0 text-secondary small">
                    Salary: {job.salary}
                  </p>
                </div>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* Summary */}
            <section className="mb-4">
              <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>
                Summary
              </h5>
              <p className="mb-0 text-secondary">
                We&apos;re looking for a <strong>{job.title}</strong> to join our
                engineering team. You&apos;ll work on modern, scalable web
                applications, collaborate with cross-functional teams, and help
                us deliver high-quality solutions that make a real impact.
              </p>
            </section>

            {/* What you'll be doing – from responsibilities */}
            <section className="mb-4">
              <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>
                What You&apos;ll Be Doing
              </h5>
              <ul className="mb-0 text-secondary">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Requirements – from skills */}
            <section className="mb-4">
              <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>
                What We&apos;re Looking For
              </h5>
              <ul className="mb-0 text-secondary">
                {job.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Pioneers */}
            <section className="mb-4">
              <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>
                We are pioneers in:
              </h5>
              <ul className="mb-0 text-secondary">
                <li>
                  Agentic AI systems that emulate human-like reasoning and
                  decision-making.
                </li>
                <li>
                  Custom Deep Learning models for vision, NLP, and predictive
                  analytics.
                </li>
                <li>
                  Robust, cloud-native AI platforms powering global enterprise
                  innovation.
                </li>
                <li>
                  A global footprint, elite engineering teams, and relentless
                  innovation to keep organizations ahead in the AI age.
                </li>
              </ul>
            </section>

            {/* Join Us */}
            <section>
              <h5 className="fw-semibold mb-2" style={{ color: "#1e3a5f" }}>
                Join Us. Be Legendary.
              </h5>
              <p className="text-secondary mb-2">
                Ready to dive into a world where innovation meets execution? At
                Visiomatix, we&apos;re not just building apps—we&apos;re building
                futures. If you&apos;re passionate about clean code, love solving
                real-world problems, and want to work where your skills matter—
                apply now.
              </p>
              <p className="text-secondary mb-4">
                Our Recruitment Team will review your profile and connect with
                you if you&apos;re shortlisted.
              </p>
            </section>

            <div className="text-center mt-4">
              <Button
                className="fw-semibold px-5 py-2"
                style={{
                  backgroundColor: "#1e3a5f",
                  borderColor: "#1e3a5f",
                  borderRadius: "999px",
                }}
                onClick={handleApplyClick}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ================================================== */}
      {/* MODALS */}
      {/* ================================================== */}

      {/* ---------- INTERNSHIP MODAL ---------- */}
      {isInternship && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Apply for: {selectedPosition}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleInternSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="fullname"
                  value={internFormData.fullname}
                  onChange={handleInternChange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={internFormData.email}
                  onChange={handleInternChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Country Code</Form.Label>
                    <Form.Select
                      name="countryCode"
                      value={internFormData.countryCode}
                      onChange={handleInternChange}
                    >
                      <option value="+91">🇮🇳 +91 India</option>
                      <option value="+1">🇺🇸 +1 USA</option>
                      <option value="+44">🇬🇧 +44 UK</option>
                      <option value="+61">🇦🇺 +61 Australia</option>
                      <option value="+971">🇦🇪 +971 UAE</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      value={internFormData.phone}
                      onChange={handleInternChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Education / Degree</Form.Label>
                <Form.Control
                  name="education"
                  value={internFormData.education}
                  onChange={handleInternChange}
                  placeholder="e.g., B.Tech / MCA"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Technical Skills</Form.Label>
                <Form.Control
                  name="skills"
                  value={internFormData.skills}
                  onChange={handleInternChange}
                  placeholder="Java, React, Python..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GitHub Profile (optional)</Form.Label>
                <Form.Control
                  name="github"
                  value={internFormData.github}
                  onChange={handleInternChange}
                  placeholder="https://github.com/username"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Resume (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={handleFile}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Why do you want this Internship?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="why"
                  value={internFormData.why}
                  onChange={handleInternChange}
                  placeholder="Write your answer..."
                  required
                />
              </Form.Group>

              <div className="text-center mt-4">
                {/* ✅ FIXED: this actually SUBMITS the form now */}
                <Button
                  className="fw-semibold px-5 py-2"
                  type="submit"
                  style={{
                    backgroundColor: "#1e3a5f",
                    borderColor: "#1e3a5f",
                    borderRadius: "222px",
                  }}
                >
                  Submit Application
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* ---------- JOB MODAL (full-time) ---------- */}
      {!isInternship && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header className="border-0 text-center d-block pt-3">
            <div>
              <h5 className="fw-bold mb-0">Apply Now</h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleJobSubmit}>
              {/* Section 1 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="firstname">
                    <Form.Label className="fw-semibold">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={jobFormData.firstname}
                      onChange={handleJobChange}
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
                      value={jobFormData.lastname}
                      onChange={handleJobChange}
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
                    <Form.Label className="fw-semibold">
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactnumber"
                      value={jobFormData.contactnumber}
                      onChange={handleJobChange}
                      placeholder="Enter Your Contact Number"
                      className="rounded-3 shadow-sm border-secondary-subtle"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label className="fw-semibold">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={jobFormData.email}
                      onChange={handleJobChange}
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
                    <Form.Label className="fw-semibold">
                      Date of Birth
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={jobFormData.dob}
                      onChange={handleJobChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="role">
                    <Form.Label className="fw-semibold">Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={jobFormData.role}
                      onChange={handleJobChange}
                      className="rounded-3 shadow-sm border-secondary-subtle"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value={job.title}>{job.title}</option>
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Employee</option>
                      <option>HR</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Qualification section */}
              <h5
                className="mt-4 d-flex align-items-center"
                style={{ color: "#1e3a5f" }}
              >
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
                        handleDynamicChange(
                          "qualifications",
                          idx,
                          "university",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      placeholder="Degree"
                      value={item.degree}
                      onChange={(e) =>
                        handleDynamicChange(
                          "qualifications",
                          idx,
                          "degree",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      placeholder="Year of Passout"
                      value={item.year}
                      onChange={(e) =>
                        handleDynamicChange(
                          "qualifications",
                          idx,
                          "year",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      placeholder="Percentage %"
                      value={item.percentage}
                      onChange={(e) =>
                        handleDynamicChange(
                          "qualifications",
                          idx,
                          "percentage",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Col>

                  <Col md={2} className="text-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveField("qualifications", idx)}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              ))}

              {/* Experience section */}
              <h5
                className="mt-4 d-flex align-items-center"
                style={{ color: "#1e3a5f" }}
              >
                Experience
                <PlusCircle
                  className="ms-2 text-success cursor-pointer"
                  size={20}
                  onClick={() => handleAddField("experiences")}
                />
              </h5>

              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="mb-3 border p-3 rounded position-relative"
                >
                  <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => handleRemoveField("experiences", idx)}
                  >
                    Remove
                  </Button>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId={`currentCtc-${idx}`}>
                        <Form.Label className="fw-semibold">
                          Current CTC
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Current CTC"
                          value={exp.currentCtc}
                          onChange={(e) =>
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "currentCtc",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`expectedCtc-${idx}`}>
                        <Form.Label className="fw-semibold">
                          Expected CTC
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Expected CTC"
                          value={exp.expectedCtc}
                          onChange={(e) =>
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "expectedCtc",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId={`location-${idx}`}>
                        <Form.Label className="fw-semibold">
                          Location
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Location"
                          value={exp.location}
                          onChange={(e) =>
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`countryCode-${idx}`}>
                        <Form.Label className="fw-semibold">
                          Country Code
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Country Code"
                          value={exp.countryCode}
                          onChange={(e) =>
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "countryCode",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`countryName-${idx}`}>
                        <Form.Label className="fw-semibold">
                          Country Name
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter Country Name"
                          value={exp.countryName}
                          onChange={(e) =>
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "countryName",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                      <Form.Group controlId={`resume-${idx}`} className="w-100">
                        <Form.Label className="fw-semibold">
                          Resume or CV
                        </Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file =
                              e.target.files && e.target.files[0]
                                ? e.target.files[0]
                                : null;
                            handleDynamicChange(
                              "experiences",
                              idx,
                              "resume",
                              file
                            );
                          }}
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
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default JobDetailsPage;
