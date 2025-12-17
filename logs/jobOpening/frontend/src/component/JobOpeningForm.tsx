import React, { useState } from 'react';
import axios from 'axios';
import Applysuccessfully from './Applysuccessfully';

const JobOpeningForm = () => {

    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('experience', experience);
        formData.append('location', location);
        formData.append('skills', skills);
        formData.append('resume', resume);

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

                e.target.reset;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit job application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  text-white p-6 reletive">   {/* bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] */}
           {submitted && (
            <div className='fixed flex items-center justify-center z-50'>
                    <Applysuccessfully onClose={()=>setSubmitted(false)}/>
            </div>
           )}
            <div className="w-full max-w-lg  border border-blue-500/30 rounded-2xl shadow-lg shadow-blue-500/10 p-8"> {/* bg-[#1e293b]/80 backdrop-blur-md */}
                <form onSubmit={handleSubmit} className="space-y-6" method="POST" action=""> {/* Add method and action here */}
                    {/* Header */}
                    <h1 className="text-4xl font-extrabold text-center text-blue-400 ">  {/* drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] */}
                        Job Opening
                    </h1>
                    <p className="text-center text-black mb-6">
                        Enter the job details below 🚀
                    </p>

                    {/* Job Title */}
                    <div>
                        <label htmlFor="title" className="block text-black font-semibold mb-1">  {/* gray-300 */}
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"  // Add this line
                            placeholder="e.g. Full Stack Developer"
                            className="w-full rounded-lg border border-gray-700  p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />  {/* bg-[#0f172a] */}
                    </div>

                    {/* Experience */}
                    <div>
                        <label htmlFor="experience" className="block text-black font-semibold mb-1">  {/* gray-300 */}
                            Experience
                        </label>
                        <input
                            type="text"
                            id="experience"
                            name="experience"  // Add this line
                            placeholder="e.g. Fresher / 2 Years"
                            className="w-full rounded-lg border border-gray-700 p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                        />  {/* bg-[#0f172a] */}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-black font-semibold mb-1">  {/* gray-300 */}
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"  // Add this line
                            placeholder="e.g. Pune / Remote"
                            className="w-full rounded-lg border border-gray-700  p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />  {/* bg-[#0f172a] */}
                    </div>

                    {/* Skills */}
                    <div>
                        <label htmlFor="skills" className="block text-black font-semibold mb-1">   {/* gray-300 */}
                            Skills
                        </label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"  // Add this line
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="w-full rounded-lg border border-gray-700 p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            onChange={(e) => setSkills(e.target.value)}
                            value={skills}
                        />  {/* bg-[#0f172a] */}
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label htmlFor="resume" className="block text-black font-semibold mb-1">  {/* gray-300 */}
                            Upload Resume
                        </label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"  // Add this line
                            className="block w-full text-sm text-gray-500 border border-gray-700 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700 transition-all"
                            onChange={(e) => setResume(e.target.files[0])}                                                                             
                        />  {/* bg-[#0f172a] */}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-lg font-semibold rounded-lg transition-all cursor-pointer flex justify-center items-center gap-2
                ${loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_25px_#3b82f6]'
                                }`}
                        >
                            {loading ? (
                                <section className="flex justify-center items-center">
                                    <div className='loader'></div>
                                </section>
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