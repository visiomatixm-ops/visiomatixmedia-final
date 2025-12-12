import { useState } from 'react';
import axios from 'axios';
import Applysuccessfully from './Applysuccessfully';

const JobOpeningForm = () => {

    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [resume, setResume] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('experience', experience);
        formData.append('location', location);
        formData.append('skills', skills);
        if (resume) {
            formData.append('resume', resume);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/jobapplications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
                setSubmitted(true);

                setTitle("");
                setExperience("");
                setLocation("");
                setSkills("");
                setResume(null);

                (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit job application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center text-white p-3 position-relative">
           {submitted && (
            <div className='position-fixed d-flex align-items-center justify-content-center' style={{zIndex: 1050}}>
                    <Applysuccessfully onClose={()=>setSubmitted(false)}/>
            </div>
           )}
            <div className="w-100 border border-primary rounded shadow p-4" style={{maxWidth: '32rem'}}>
                <form onSubmit={handleSubmit} method="POST" action="">
                    {/* Header */}
                    <h1 className="display-3 fw-bold text-center text-primary">
                        Job Opening
                    </h1>
                    <p className="text-center text-dark mb-4">
                        Enter the job details below 🚀
                    </p>

                    {/* Job Title */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-semibold">
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="e.g. Full Stack Developer"
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                        <label htmlFor="experience" className="form-label fw-semibold">
                            Experience
                        </label>
                        <input
                            type="text"
                            id="experience"
                            name="experience"
                            placeholder="e.g. Fresher / 2 Years"
                            className="form-control"
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label fw-semibold">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="e.g. Pune / Remote"
                            className="form-control"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>

                    {/* Skills */}
                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label fw-semibold">
                            Skills
                        </label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="form-control"
                            onChange={(e) => setSkills(e.target.value)}
                            value={skills}
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-3">
                        <label htmlFor="resume" className="form-label fw-semibold">
                            Upload Resume
                        </label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            className="form-control"
                            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-100 py-2 fs-5 fw-semibold d-flex justify-content-center align-items-center gap-2 ${loading ? 'disabled' : ''}`}
                        >
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className='loader'></div>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};
export default JobOpeningForm;