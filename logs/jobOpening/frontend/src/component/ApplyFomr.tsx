import { useState, ChangeEvent, FormEvent } from "react";
import { Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface Experience {
  company: string;
  role: string;
  years: string;
}

interface Qualification {
  college: string;
  degree: string;
  year: string;
  percentage: string;
}

const VisuallyHiddenInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
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
    const [experiences, setExperiences] = useState<Experience[]>([{ company: "", role: "", years: "" }]);
    const [qualifications, setQualifications] = useState<Qualification[]>([
        { college: "", degree: "", year: "", percentage: "" },
    ]);

    // 📁 Handle File Upload
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
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
    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
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
    const handleQualificationChange = (index: number, field: keyof Qualification, value: string) => {
        const updated = qualifications.map((q, i) =>
            i === index ? { ...q, [field]: value } : q
        );
        setQualifications(updated);
    };

    return (
        <div id="form" className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <form className="w-full">
                <h1 className="text-3xl font-bold text-center mb-8">Apply Now</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <input className="inputs" type="text" id="fname" placeholder="Enter Your First Name" required />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input className="inputs" type="text" id="lname" placeholder="Enter Your Last Name" required />
                    </div>

                    <div>
                        <label htmlFor="contact">Contact No</label>
                        <input className="inputs" type="tel" id="contact" placeholder="Enter Your Contact No" required />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="inputs" type="email" id="email" placeholder="Enter Your Email" required />
                    </div>

                    <div>
                        <label htmlFor="dob">Date Of Birth</label>
                        <input className="inputs" type="date" id="dob" />
                    </div>

                    <div>
                        <label htmlFor="select">Select Role</label>
                        <select id="select" className="inputs">
                            <option value="-select-">-Select-</option>
                            <option value="front end">Front End Intern</option>
                            <option value="back end">Back End Intern</option>
                            <option value="full stack developer intern">Full Stack Developer Intern</option>
                        </select>
                    </div>
                </div>

                {/* 🎓 Qualification Section */}
                <div className="col-span-2 mt-8">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold">Qualification</label>
                        <IconButton color="primary" onClick={addQualification}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>

                    {qualifications.map((q, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                            <input
                                className="inputs"
                                type="text"
                                placeholder="University / College"
                                value={q.college}
                                onChange={(e) => handleQualificationChange(index, "college", e.target.value)}
                            />
                            <input
                                className="inputs"
                                type="text"
                                placeholder="Degree"
                                value={q.degree}
                                onChange={(e) => handleQualificationChange(index, "degree", e.target.value)}
                            />
                            <input
                                className="inputs"
                                type="text"
                                placeholder="Year of Passout"
                                value={q.year}
                                onChange={(e) => handleQualificationChange(index, "year", e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    className="inputs w-full"
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
                <div className="col-span-2 mt-8">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold">Experience</label>
                        <IconButton color="primary" onClick={addExperience}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>

                    {experiences.map((exp, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            <input
                                className="inputs"
                                type="text"
                                id="company"
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                            />
                            <input
                                className="inputs"
                                type="text"
                                id="role"
                                placeholder="Role / Position"
                                value={exp.role}
                                onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    className="inputs w-full"
                                    type="text"
                                    id="yoe"
                                    placeholder="Years of Experience"
                                    value={exp.years}
                                    onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                                />
                                {experiences.length > 0 && (
                                    <IconButton color="error" onClick={() => removeExperience(index)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🌍 Other Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                        <label htmlFor="current">Current CTC</label>
                        <input className="inputs" type="text" id="current" placeholder="Current CTC" />
                    </div>

                    <div>
                        <label htmlFor="expected">Expected CTC</label>
                        <input className="inputs" type="text" id="expected" placeholder="Expected CTC" />
                    </div>

                    <div>
                        <label htmlFor="location">Location</label>
                        <input className="inputs" type="text" id="location" placeholder="Location" required />
                    </div>

                    <div>
                        <label htmlFor="code">Country Code</label>
                        <input className="inputs" type="text" id="code" placeholder="Country Code" required />
                    </div>

                    <div>
                        <label htmlFor="countryName">Country Name</label>
                        <input className="inputs" type="text" id="countryName" placeholder="Country Name" required />
                    </div>

                    <div>
                        <label htmlFor="resume">Resume OR CV</label><br />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload files
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
                        </Button>
                        {selectedFiles.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                                {selectedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ✅ Terms + Submit */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <input className="cursor-pointer" type="checkbox" id="check" />
                        <label htmlFor="check">Accept all terms and conditions</label>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 md:mt-0 bg-[#1975d1] hover:bg-[#1562b5] text-white px-6 py-2 rounded-md text-lg transition-all cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyForm;
