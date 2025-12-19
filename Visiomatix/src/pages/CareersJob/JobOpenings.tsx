import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

interface Job {
  title: string;
  qualifications: string;
  skills: string;
  experience: string;
  location: string;
}

interface JobOpeningsProps {
  onApply: (title: string) => void;
}

const jobs: Job[] = [
  {
    title: "Full Stack Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "React.js, CSS, JavaScript, Bootstrap, MongoDB, Node.js",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
  {
    title: "Java Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "Java, Spring Boot, Hibernate, MySQL, REST APIs",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
  {
    title: "Python Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "Python, Django, REST Framework, PostgreSQL, HTML/CSS",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
  {
    title: "PHP Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "PHP, Laravel, MySQL, JavaScript, CSS, HTML",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
  {
    title: "Front End Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "React.js, HTML, CSS, Tailwind, Bootstrap, JavaScript",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
  {
    title: "Back End Developer",
    qualifications: "BE/ME/BTech/MTech/MCA/BCA (Any Degree)",
    skills: "Node.js, Express, MongoDB, REST APIs, SQL",
    experience: "Fresher to 2 Years",
    location: "Pune, Hyderabad",
  },
];

const JobOpenings: React.FC<JobOpeningsProps> = ({ onApply }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleJob = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {jobs.map((job, index) => (
        <div
          key={index}
          className="border-bottom py-3"
        >
          {/* Summary */}
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleJob(index)}
          >
            <h2 className="h5 fw-semibold text-dark">
              {job.title}
            </h2>
            {openIndex === index ? (
              <RemoveIcon className="text-primary"/>
            ) : (
              <AddIcon className="text-primary"/>
            )}
          </div>

          {/* Job Details */}
          <div
            className={`overflow-hidden ${
              openIndex === index ? "mt-3" : ""
            }`}
            style={{
              maxHeight: openIndex === index ? '400px' : '0',
              opacity: openIndex === index ? 1 : 0,
              transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
            }}
          >
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Qualifications:</strong> {job.qualifications}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <Button variant="contained" onClick={() => onApply(job.title)}>
              Apply Now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobOpenings;
