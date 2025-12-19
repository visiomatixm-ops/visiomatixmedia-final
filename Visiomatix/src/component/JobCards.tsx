import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

interface Job {
  id: string;
  title: string;
  experience: string;
  employment: string;
  salary: string;
  type: string;
}

interface JobCardsProps {
  jobs: Job[];
  isInternship?: boolean;
}

const JobCards: React.FC<JobCardsProps> = ({ jobs, isInternship = false }) => {
  const navigate = useNavigate();

  const handleReadMore = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <Row className="g-4">
      {jobs.map((job, index) => (
        <Col md={6} lg={4} key={index}>
          <Card className="h-100 shadow-sm border-0 rounded-3 hover-lift">
            <Card.Body className="d-flex flex-column p-4">
              <div className="mb-3">
                <h5 className="fw-semibold mb-3" style={{ color: "#1e3a5f" }}>
                  {job.title}
                </h5>
                <div className="mb-2">
                  <small className="text-muted d-block">Experience Required</small>
                  <span className="fw-medium">{job.experience}</span>
                </div>
                <div className="mb-2">
                  <small className="text-muted d-block">Employment Type</small>
                  <span className="fw-medium">{job.employment}</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block">
                    {isInternship ? 'Stipend' : 'Salary'} Range
                  </small>
                  <span className="fw-medium">{job.salary}</span>
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  variant={isInternship ? "success" : "primary"}
                  className="w-100 fw-semibold"
                  onClick={() => handleReadMore(job.id)}
                  style={{
                    backgroundColor: isInternship ? "#28a745" : "#1e3a5f",
                    borderColor: isInternship ? "#28a745" : "#1e3a5f"
                  }}
                >
                  Read More →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default JobCards;