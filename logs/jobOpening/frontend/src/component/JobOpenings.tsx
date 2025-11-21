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
    <section className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Job Openings
      </h1>

      {jobs.map((job, index) => (
        <div
          key={index}
          className="border-b border-gray-300 py-3 transition-all duration-300"
        >
          {/* Summary */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleJob(index)}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {job.title}
            </h2>
            {openIndex === index ? (
              // <ExpandLessOutlinedIcon className="text-blue-600" />
              <RemoveIcon className="text-blue-600 hover:text-gray-600"/>
            ) : (
              // <ExpandMoreOutlinedIcon className="text-gray-600" />
              <AddIcon className="text-blue-600 hover:text-gray-600"/>
            )}
          </div>

          {/* Job Details */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
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
