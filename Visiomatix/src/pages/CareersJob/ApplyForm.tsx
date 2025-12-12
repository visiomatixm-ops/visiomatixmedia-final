import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const VisuallyHiddenInput = (props: React.ComponentProps<'input'>) => (
    <input
        type="file"
        style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
        }}
        {...props}
    />
);

const ApplyForm = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [experiences, setExperiences] = useState([{ company: "", role: "", years: "" }]);
    const [qualifications, setQualifications] = useState([
        { college: "", degree: "", year: "", percentage: "" },
    ]);

    // 📁 Handle File Upload
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setSelectedFiles(files);
    };

    // ➕ Add Experience
    const addExperience = () => {
        setExperiences([...experiences, { company: "", role: "", years: "" }]);
    };

    // ❌ Remove Experience
    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    // ✏️ Handle Experience Change
    const handleExperienceChange = (index: number, field: string, value: string) => {
        const updated = experiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        setExperiences(updated);
    };

    // ➕ Add Qualification
    const addQualification = () => {
        setQualifications([
            ...qualifications,
            { college: "", degree: "", year: "", percentage: "" },
        ]);
    };

    // ❌ Remove Qualification
    const removeQualification = (index: number) => {
        setQualifications(qualifications.filter((_, i) => i !== index));
    };

    // ✏️ Handle Qualification Change
    const handleQualificationChange = (index: number, field: string, value: string) => {
        const updated = qualifications.map((q, i) =>
            i === index ? { ...q, [field]: value } : q
        );
        setQualifications(updated);
    };

    return (
        <div id="form" className="container mx-auto p-3 bg-white shadow rounded">
            <form className="w-full">
                <h1 className="display-4 fw-bold text-center mb-4">Apply Now</h1>

                <div className="row g-3">
                    {/* Basic Info */}
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="fname">First Name</label>
                        <input className="form-control" type="text" id="fname" placeholder="Enter Your First Name" required />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="lname">Last Name</label>
                        <input className="form-control" type="text" id="lname" placeholder="Enter Your Last Name" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="contact">Contact No</label>
                        <input className="form-control" type="tel" id="contact" placeholder="Enter Your Contact No" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" placeholder="Enter Your Email" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="dob">Date Of Birth</label>
                        <input className="form-control" type="date" id="dob" />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="select">Select Role</label>
                        <select id="select" className="form-select">
                            <option value="-select-">-Select-</option>
                            <option value="front end">Front End Intern</option>
                            <option value="back end">Back End Intern</option>
                            <option value="full stack developer intern">Full Stack Developer Intern</option>
                        </select>
                    </div>
                </div>

                {/* 🎓 Qualification Section */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="h5 fw-semibold">Qualification</label>
                        <IconButton color="primary" onClick={addQualification}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>

                    {qualifications.map((q, index) => (
                        <div key={index} className="row g-3 mt-3">
                            <div className="col-12 col-md-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="University / College"
                                    value={q.college}
                                    onChange={(e) => handleQualificationChange(index, "college", e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Degree"
                                    value={q.degree}
                                    onChange={(e) => handleQualificationChange(index, "degree", e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Year of Passout"
                                    value={q.year}
                                    onChange={(e) => handleQualificationChange(index, "year", e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-3 d-flex align-items-center gap-2">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Percentage %"
                                    value={q.percentage}
                                    onChange={(e) => handleQualificationChange(index, "percentage", e.target.value)}
                                />
                                {qualifications.length > 1 && (
                                    <IconButton color="error" onClick={() => removeQualification(index)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 💼 Experience Section */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="h5 fw-semibold">Experience</label>
                        <IconButton color="primary" onClick={addExperience}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>

                    {experiences.map((exp, index) => (
                        <div key={index} className="row g-3 mt-3">
                            <div className="col-12 col-md-4">
                                <input
                                    className="form-control"
                                    type="text"
                                    id={`company-${index}`}
                                    placeholder="Company Name"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    className="form-control"
                                    type="text"
                                    id={`role-${index}`}
                                    placeholder="Role / Position"
                                    value={exp.role}
                                    onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-4 d-flex align-items-center gap-2">
                                <input
                                    className="form-control"
                                    type="text"
                                    id={`yoe-${index}`}
                                    placeholder="Years of Experience"
                                    value={exp.years}
                                    onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                                />
                                {experiences.length > 1 && (
                                    <IconButton color="error" onClick={() => removeExperience(index)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🌍 Other Fields */}
                <div className="row g-3 mt-4">
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="current">Current CTC</label>
                        <input className="form-control" type="text" id="current" placeholder="Current CTC" />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="expected">Expected CTC</label>
                        <input className="form-control" type="text" id="expected" placeholder="Expected CTC" />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="location">Location</label>
                        <input className="form-control" type="text" id="location" placeholder="Location" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="code">Country Code</label>
                        <input className="form-control" type="text" id="code" placeholder="Country Code" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="countryName">Country Name</label>
                        <input className="form-control" type="text" id="countryName" placeholder="Country Name" required />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="resume">Resume OR CV</label><br />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload files
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
                        </Button>
                        {selectedFiles.length > 0 && (
                            <ul className="mt-2 small text-muted">
                                {selectedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ✅ Terms + Submit */}
                <div className="mt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="d-flex align-items-center mb-3 mb-md-0">
                        <input className="form-check-input me-2" type="checkbox" id="check" />
                        <label className="form-check-label" htmlFor="check">Accept all terms and conditions</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary fs-5"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyForm;
