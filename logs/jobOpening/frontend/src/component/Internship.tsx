const Internship = () => {
    return (                              
        <div className="min-h-screen flex items-center justify-center p-6"> 
            <div className="w-full max-w-lg backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-lg shadow-blue-500/10 p-8">  
                <form className="space-y-6">
                    {/* Header */}
                    <h1 className="text-4xl font-extrabold text-center text-blue-500">
                        Internship
                    </h1>
                    <p className="text-center text-black-400 mb-6">
                        Enter the internship details below 🚀
                    </p>

                    {/* Job Title */}
                    <div>
                        <label
                            htmlFor="position"
                            className="block text-black-300 font-semibold mb-1"
                        >
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            placeholder="e.g. Full Stack Developer"
                            className="w-full rounded-lg border border-gray-700 bg-white p-3 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label
                            htmlFor="Duration"
                            className="block text-black-300 font-semibold mb-1"
                        >
                            Duration
                        </label>
                        <input
                            type="text"
                            id="Duration"
                            placeholder="e.g. Fresher / 2 Years"
                            className="w-full rounded-lg border border-gray-700 bg-white p-3 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label
                            htmlFor="location"
                            className="block text-black-300 font-semibold mb-1"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="e.g. Pune / Remote"
                            className="w-full rounded-lg border border-gray-700 bg-white p-3 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Eligibility */}
                    <div>
                        <label 
                        htmlFor="eligibility"
                        className="block text-black-300 font-semibold mb-1">
                        Eligibility
                        </label>
                        <select className="w-full rounded-lg border border-gray-700 bg-white p-3 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all">
                            <option value="-Select-">-Select-</option>
                            <option value="BE">BE</option>
                            <option value="ME">ME</option>
                            <option value="Btech">Btech</option>
                            <option value="Mtech">Mtech</option>
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label
                            htmlFor="resume"
                            className="block text-black-300 font-semibold mb-1"
                        >
                            Upload Resume
                        </label>
                        <input
                            type="file"
                            id="resume"
                            className="block w-full text-sm text-gray-500 border border-gray-700 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg hover:shadow-[0_0_25px_#3b82f6] transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Internship