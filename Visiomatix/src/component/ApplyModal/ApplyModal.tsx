// src/components/ApplyModal/ApplyModal.tsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";
import "./ApplyModal.css";

type School = { name: string; year: string; percentage: string };
type College = { name: string; degree: string; year: string; cgpa: string };
type Experience = { company: string; role: string; years: string };

interface ApplyModalProps {
  show: boolean;
  onClose: () => void;
  jobId?: string;
}

const emptySchool = { name: "", year: "", percentage: "" };
const emptyCollege = { name: "", degree: "", year: "", cgpa: "" };
const emptyExperience = { company: "", role: "", years: "" };

export const ApplyModal: React.FC<ApplyModalProps> = ({ show, onClose, jobId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [schools, setSchools] = useState<School[]>([ { ...emptySchool } ]);
  const [colleges, setColleges] = useState<College[]>([ { ...emptyCollege } ]);
  const [experiences, setExperiences] = useState<Experience[]>([ { ...emptyExperience } ]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const addSchool = () => setSchools(s => [...s, { ...emptySchool }]);
  const removeSchool = (i: number) => setSchools(s => s.filter((_, idx) => idx !== i));
  const updateSchool = (i: number, data: Partial<School>) => setSchools(s => s.map((row, idx) => idx === i ? { ...row, ...data } : row));

  const addCollege = () => setColleges(c => [...c, { ...emptyCollege }]);
  const removeCollege = (i: number) => setColleges(c => c.filter((_, idx) => idx !== i));
  const updateCollege = (i: number, data: Partial<College>) => setColleges(c => c.map((row, idx) => idx === i ? { ...row, ...data } : row));

  const addExperience = () => setExperiences(e => [...e, { ...emptyExperience }]);
  const removeExperience = (i: number) => setExperiences(e => e.filter((_, idx) => idx !== i));
  const updateExperience = (i: number, data: Partial<Experience>) => setExperiences(e => e.map((row, idx) => idx === i ? { ...row, ...data } : row));

  const resetForm = () => {
    setFirstName(""); setLastName(""); setDob(""); setGender(""); setSchools([{ ...emptySchool }]);
    setColleges([{ ...emptyCollege }]); setExperiences([{ ...emptyExperience }]); setEmail(""); setPhone(""); setProfileFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfileFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      // If you want to send file, use FormData; otherwise JSON body is fine.
      const hasFile = !!profileFile;
      if (hasFile) {
        const form = new FormData();
        form.append("firstName", firstName);
        form.append("lastName", lastName);
        form.append("dob", dob);
        form.append("gender", gender);
        form.append("email", email);
        form.append("phone", phone);
        if (jobId) form.append("jobId", jobId);
        form.append("schools", JSON.stringify(schools));
        form.append("colleges", JSON.stringify(colleges));
        form.append("experiences", JSON.stringify(experiences));
        form.append("profile", profileFile as Blob);

        await api.post("/apply/formdata", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Send as JSON
        const payload = {
          jobId,
          firstName,
          lastName,
          dob,
          gender,
          email,
          phone,
          schools,
          colleges,
          experiences,
        };
        await api.post("/apply", payload);
      }

      setStatusMsg({ type: "success", text: "Application submitted successfully. We will contact you soon." });
      resetForm();
      // optionally close modal after a short delay
      setTimeout(() => {
        setStatusMsg(null);
        onClose();
      }, 2200);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "danger", text: err?.response?.data?.message || "Failed to submit. Please try again later." });
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={() => { setStatusMsg(null); onClose(); }} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Position</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {statusMsg && <Alert variant={statusMsg.type === "success" ? "success" : "danger"}>{statusMsg.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <h5 className="mb-3">Personal Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control required value={firstName} onChange={e => setFirstName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required value={lastName} onChange={e => setLastName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control placeholder="dd-mm-yyyy" value={dob} onChange={e => setDob(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={phone} onChange={e => setPhone(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h6>School Details <Button variant="link" onClick={addSchool}>+ Add</Button></h6>
          {schools.map((s, i) => (
            <Row key={i} className="align-items-center">
              <Col md={6}><Form.Control placeholder="School Name" value={s.name} onChange={e => updateSchool(i, { name: e.target.value })} className="mb-2" /></Col>
              <Col md={3}><Form.Control placeholder="Year" value={s.year} onChange={e => updateSchool(i, { year: e.target.value })} className="mb-2" /></Col>
              <Col md={3} className="d-flex">
                <Form.Control placeholder="Percentage" value={s.percentage} onChange={e => updateSchool(i, { percentage: e.target.value })} className="mb-2" />
                <Button variant="outline-danger" size="sm" onClick={() => removeSchool(i)} className="ms-2">X</Button>
              </Col>
            </Row>
          ))}

          <hr />
          <h6>College Details <Button variant="link" onClick={addCollege}>+ Add</Button></h6>
          {colleges.map((c, i) => (
            <Row key={i} className="align-items-center">
              <Col md={4}><Form.Control placeholder="College Name" value={c.name} onChange={e => updateCollege(i, { name: e.target.value })} className="mb-2" /></Col>
              <Col md={3}><Form.Control placeholder="Degree" value={c.degree} onChange={e => updateCollege(i, { degree: e.target.value })} className="mb-2" /></Col>
              <Col md={2}><Form.Control placeholder="Year" value={c.year} onChange={e => updateCollege(i, { year: e.target.value })} className="mb-2" /></Col>
              <Col md={2} className="d-flex">
                <Form.Control placeholder="CGPA" value={c.cgpa} onChange={e => updateCollege(i, { cgpa: e.target.value })} className="mb-2" />
                <Button variant="outline-danger" size="sm" onClick={() => removeCollege(i)} className="ms-2">X</Button>
              </Col>
            </Row>
          ))}

          <hr />
          <h6>Work Experience <Button variant="link" onClick={addExperience}>+ Add</Button></h6>
          {experiences.map((ex, i) => (
            <Row key={i} className="align-items-center">
              <Col md={5}><Form.Control placeholder="Company Name" value={ex.company} onChange={e => updateExperience(i, { company: e.target.value })} className="mb-2" /></Col>
              <Col md={5}><Form.Control placeholder="Role / Designation" value={ex.role} onChange={e => updateExperience(i, { role: e.target.value })} className="mb-2" /></Col>
              <Col md={2} className="d-flex">
                <Form.Control placeholder="Years" value={ex.years} onChange={e => updateExperience(i, { years: e.target.value })} className="mb-2" />
                <Button variant="outline-danger" size="sm" onClick={() => removeExperience(i)} className="ms-2">X</Button>
              </Col>
            </Row>
          ))}

          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Profile Image (optional)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <><Spinner as="span" animation="border" size="sm" /> Submitting...</> : "Submit Application"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyModal;
