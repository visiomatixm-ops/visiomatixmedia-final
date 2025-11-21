const Internship = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
            <div className="w-100 border border-primary rounded shadow p-4" style={{maxWidth: '32rem'}}>
                <form>
                    {/* Header */}
                    <h1 className="display-3 fw-bold text-center text-primary">
                        Internship
                    </h1>
                    <p className="text-center text-muted mb-4">
                        Enter the internship details below 🚀
                    </p>

                    {/* Job Title */}
                    <div className="mb-3">
                        <label
                            htmlFor="position"
                            className="form-label fw-semibold"
                        >
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            placeholder="e.g. Full Stack Developer"
                            className="form-control"
                        />
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                        <label
                            htmlFor="Duration"
                            className="form-label fw-semibold"
                        >
                            Duration
                        </label>
                        <input
                            type="text"
                            id="Duration"
                            placeholder="e.g. Fresher / 2 Years"
                            className="form-control"
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label
                            htmlFor="location"
                            className="form-label fw-semibold"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="e.g. Pune / Remote"
                            className="form-control"
                        />
                    </div>

                    {/* Eligibility */}
                    <div className="mb-3">
                        <label
                        htmlFor="eligibility"
                        className="form-label fw-semibold">
                        Eligibility
                        </label>
                        <select className="form-select">
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
                    <div className="mb-3">
                        <label
                            htmlFor="resume"
                            className="form-label fw-semibold"
                        >
                            Upload Resume
                        </label>
                        <input
                            type="file"
                            id="resume"
                            className="form-control"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fs-5 fw-semibold"
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