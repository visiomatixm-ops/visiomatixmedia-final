import React from "react";

/**
 * ContactUs Page Component
 * Hybrid Bootstrap layout + custom colors
 * All SVG icons preserved as-is
 */

const ContactUs: React.FC = () => {
  return (
    <main className="flex-grow-1">

      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #1D3458, #2A4A7C)",
        }}
      >
        <div className="container">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="mb-4">Begin Your Professional Journey</h1>
            <p className="fs-5 mb-3">
              Prospective students are invited to contact Visiomatix Media to secure their professional future.
            </p>
            <p className="fs-6 opacity-75">
              Enroll in the three-month program to pursue a guaranteed career in digital marketing.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACT CARDS
      ====================================== */}
      <section className="py-5">
        <div className="container">

          <div className="row g-4 mb-5">

            {/* PHONE */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-1 h-100">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "#1D3458",
                      color: "white",
                    }}
                  >
                    {/* Phone SVG */}
                    <svg width="34" height="34" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 1 .737-.063l2.522 1.26c.253.126.39.396.327.668l-.547 2.347a.678.678 0 0 1-.588.53c-.41.055-.97.287-1.543.76C3.31 7.796 2.878 9.5 4.708 11.292c1.83 1.793 3.54 1.42 4.543.525.574-.473.987-1.01 1.242-1.395a.678.678 0 0 1 .635-.288l2.28.282c.29.036.52.245.574.53l.495 2.48a.678.678 0 0 1-.342.71c-1.403.79-5.12 2.602-9.448-1.77C1.03 7.242 2.865 3.57 3.654 1.328z" />
                    </svg>
                  </div>
                  <h5 className="text-primary">Phone</h5>
                  <a href="tel:+918999101916" className="text-dark">+91 8999101916</a>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-1 h-100">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "#1D3458",
                      color: "white",
                    }}
                  >
                    {/* Email SVG */}
                    <svg width="34" height="34" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217l-8 4.8-8-4.8V4zm0 1.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383l-7.555 4.533a.5.5 0 0 1-.89 0L0 5.383z" />
                    </svg>
                  </div>
                  <h5 className="text-primary">Email</h5>
                  <a href="mailto:visiomatixmedia@gmail.com" className="text-dark">
                    visiomatixmedia@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-1 h-100">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "#1D3458",
                      color: "white",
                    }}
                  >
                    {/* Clock SVG */}
                    <svg width="34" height="34" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 1 .5.5v4h3a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
                    </svg>
                  </div>
                  <h5 className="text-primary">Business Hours</h5>
                  <p className="text-dark">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* =====================================
              FORM + RIGHT COLUMN
          ====================================== */}
          <div className="row g-4">

            {/* CONTACT FORM */}
            <div className="col-md-7">
              <div className="card border">
                <div className="card-header bg-white">
                  <h5 className="text-primary mb-1">Send Us a Message</h5>
                  <p className="small text-muted">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="card-body">
                  <form className="row gy-3">

                    <div className="col-12">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-control" placeholder="Enter your full name" required />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-control" placeholder="Enter your email" required />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Phone Number *</label>
                      <input type="tel" className="form-control" placeholder="Enter your 10-digit mobile number" required />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message *</label>
                      <textarea rows={5} className="form-control" placeholder="Tell us about your career goals..." required />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn w-100 text-white"
                        style={{ background: "#1D3458" }}
                      >
                        {/* Send Icon SVG */}
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="me-2"
                        >
                          <path d="M15.854.146a.5.5 0 0 0-.527-.11l-15 6a.5.5 0 0 0-.006.927l6.83 2.732 2.732 6.83a.5.5 0 0 0 .928-.006l6-15a.5.5 0 0 0-.11-.527zM6.34 8.236l-4.7-1.88L14.09 1.91 6.34 8.236zm2.055 2.055l1.88 4.7 4.446-12.45-6.326 7.75z" />
                        </svg>
                        Send Message
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN CARDS */}
            <div className="col-md-5">
              <div className="d-flex flex-column gap-4">

                {/* COUNSELING CARD */}
                <div
                  className="card text-white"
                  style={{
                    background: "linear-gradient(135deg, #1D3458, #2A4A7C)",
                  }}
                >
                  <div className="card-header bg-transparent">
                    <h5 className="d-flex align-items-center">
                      {/* Calendar SVG */}
                      <svg width="22" height="22" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1A2 2 0 0 1 16 3v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z" />
                      </svg>
                      Free Career Counseling
                    </h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Schedule a complimentary career counseling session to begin professional development in digital marketing.
                    </p>
                    <p>
                      The admissions team provides assistance with counseling, enrollment, and course guidance.
                    </p>
                    <button className="btn btn-light w-100 text-primary fw-bold">
                      {/* Phone Icon */}
                      <svg width="18" height="18" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 1 .737-.063l2.522 1.26c.253.126.39.396.327.668l-.547 2.347a.678.678 0 0 1-.588.53c-.41.055-.97.287-1.543.76C3.31 7.796 2.878 9.5 4.708 11.292c1.83 1.793 3.54 1.42 4.543.525.574-.473.987-1.01 1.242-1.395a.678.678 0 0 1 .635-.288l2.28.282c.29.036.52.245.574.53l.495 2.48a.678.678 0 0 1-.342.71c-1.403.79-5.12 2.602-9.448-1.77C1.03 7.242 2.865 3.57 3.654 1.328z" />
                      </svg>
                      Book a Complimentary Counseling Session
                    </button>
                  </div>
                </div>

                {/* WHY CONTACT US */}
                <div className="card border">
                  <div className="card-header bg-white">
                    <h5 className="text-primary">Why Contact Us?</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">

                      <li className="d-flex gap-2 mb-2">
                        <span className="badge bg-success rounded-circle">✓</span>
                        <span>Get detailed information about our 3-month training program</span>
                      </li>

                      <li className="d-flex gap-2 mb-2">
                        <span className="badge bg-success rounded-circle">✓</span>
                        <span>Learn about flexible payment plans and enrollment process</span>
                      </li>

                      <li className="d-flex gap-2 mb-2">
                        <span className="badge bg-success rounded-circle">✓</span>
                        <span>Discuss career goals with our expert counselors</span>
                      </li>

                      <li className="d-flex gap-2">
                        <span className="badge bg-success rounded-circle">✓</span>
                        <span>Understand our 100% placement support guarantee</span>
                      </li>

                    </ul>
                  </div>
                </div>

                {/* QUICK RESPONSE */}
                <div className="card border border-info bg-light">
                  <div className="card-body">
                    <p className="small text-dark">
                      <strong>Quick Response Guarantee:</strong>  
                      All inquiries receive a response within 24 hours.  
                      For urgent matters, please call us directly.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================
          CTA BOTTOM SECTION
      ====================================== */}
      <section className="py-5 bg-white">
        <div className="container">
          <div
            className="col-lg-8 mx-auto p-5 text-center rounded-3"
            style={{ background: "#f3f3f3" }}
          >
            <h2 className="text-primary mb-3">Ready to Transform Your Career?</h2>
            <p className="text-muted mb-4">
              Don't wait! Limited seats available for the next batch. Contact us today to secure your spot in India's #1 Professional Training Program.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

              <a
                href="tel:+918999101916"
                className="btn text-white px-4 py-2"
                style={{ background: "#1D3458" }}
              >
                {/* Phone Icon */}
                <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 1 .737-.063l2.522 1.26c.253.126.39.396.327.668l-.547 2.347a.678.678 0 0 1-.588.53c-.41.055-.97.287-1.543.76C3.31 7.796 2.878 9.5 4.708 11.292c1.83 1.793 3.54 1.42 4.543.525.574-.473.987-1.01 1.242-1.395a.678.678 0 0 1 .635-.288l2.28.282c.29.036.52.245.574.53l.495 2.48a.678.678 0 0 1-.342.71c-1.403.79-5.12 2.602-9.448-1.77C1.03 7.242 2.865 3.57 3.654 1.328z" />
                </svg>
                Call Now: +91 8999101916
              </a>

              <a
                href="mailto:visiomatixmedia@gmail.com"
                className="btn btn-outline-primary px-4 py-2"
              >
                {/* Email Icon */}
                <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217l-8 4.8-8-4.8V4zm0 1.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383l-7.555 4.533a.5.5 0 0 1-.89 0L0 5.383z" />
                </svg>
                Email Us
              </a>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ContactUs;
