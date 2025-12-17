import { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ApplyNow from "./ApplyNow";

const jobs = [
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

const JobOpenings = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleJob = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto mt-5 p-3 bg-white rounded shadow">
      <h1 className="display-4 fw-bold text-center mb-4 text-primary">
        Job Openings
      </h1>

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
              // <ExpandLessOutlinedIcon className="text-blue-600" />
              <RemoveIcon className="text-primary"/>
            ) : (
              // <ExpandMoreOutlinedIcon className="text-gray-600" />
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
            <ApplyNow/>
          </div>
        </div>
      ))}
    </section>
  );
};

export default JobOpenings;
