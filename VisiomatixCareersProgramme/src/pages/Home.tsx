import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from '../components/HeroSection';
import CardSection from '../components/CardSection';

const Home: React.FC = () => {
  // Hero Section Data
  const heroData = {
    title: "Visiomatix Media Pvt. Ltd. Presents:",
    subtitle: "The Professional Training Programme",
    description: "Your 3-Month Career Launchpad: 3 Months Professional Training + 3 Months Paid Internship",
    primaryButtonText: "Start Your 6-Month Journey",
    secondaryButtonText: "Download Full Curriculum",
  };


  // Features Card Section Data
  const featuresCards = [
    {
      icon: [
        { type: 'path' as const, d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" },
        { type: 'path' as const, d: "M16 3.128a4 4 0 0 1 0 7.744" },
        { type: 'path' as const, d: "M22 21v-2a4 4 0 0 0-3-3.87" },
        { type: 'circle' as const, cx: "9", cy: "7", r: "4" }
      ],
      title: "3+ Years of Excellence",
      description: "Powered by Visiomatix Media's legacy of success with 1200+ professionals trained.",
    },
    {
      icon: [
        { type: 'path' as const, d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" },
        { type: 'circle' as const, cx: "12", cy: "8", r: "6" }
      ],
      title: "100% Placement Support",
      description: "We assist you until you're hired — no limits, no excuses.",
    },
    {
      icon: [
        { type: 'path' as const, d: "M12 18V5" },
        { type: 'path' as const, d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" },
        { type: 'path' as const, d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" },
        { type: 'path' as const, d: "M17.997 5.125a4 4 0 0 1 2.526 5.77" },
        { type: 'path' as const, d: "M18 18a4 4 0 0 0 2-7.464" },
        { type: 'path' as const, d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" },
        { type: 'path' as const, d: "M6 18a4 4 0 0 1-2-7.464" },
        { type: 'path' as const, d: "M6.003 5.125a4 4 0 0 0-2.526 5.77" }
      ],
      title: "AI-Integrated Curriculum",
      description: "Stay ahead with hands-on learning of GenAI marketing tools.",
    },
    {
      icon: [
        { type: 'path' as const, d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" },
        { type: 'path' as const, d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }
      ],
      title: "Flexible & Affordable",
      description: "Flexible payment plans to make learning accessible.",
    },
    {
      icon: [
        { type: 'circle' as const, cx: "12", cy: "12", r: "10" },
        { type: 'path' as const, d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" },
        { type: 'path' as const, d: "M2 12h20" }
      ],
      title: "Study Anywhere",
      description: "The program is accessible online from anywhere and offers flexible scheduling.",
    },
  ];


  return (
    <>
    <div style={{width:"100%"}}>

      <main className="flex-grow-1">
        {/* Hero Section */}
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          description={heroData.description}
          primaryButtonText={heroData.primaryButtonText}
          secondaryButtonText={heroData.secondaryButtonText}
        />

        {/* Features Section */}
        <CardSection
          title="Online Fastest Career Accelerator"
          subtitle="We don't just teach — we transform careers."
          description="Within 6 months, participants transition from acquiring knowledge to securing employment, supported by comprehensive job placement services."
          cards={featuresCards}
          buttonText="👉 Download the 3-Month Program Guide"
          backgroundStyle={{ backgroundColor: 'white' }}
        />

        {/* Concerns Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="text-center mb-4" style={{ color: '#1D3458' }}>We Know What's Holding You Back — And We've Solved It</h2>
                <p className="text-center h5 mb-5">Let's Break the Myths Together</p>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <div className="card border overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-6 bg-danger bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Your Concern</p>
                            <p className="text-danger">I don't have a degree or experience.</p>
                          </div>
                        </div>
                        <div className="col-md-6 bg-success bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Our Solution</p>
                            <p className="text-success">Gain real experience during your 3-month paid internship — your skills matter, not your background.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="card border overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-6 bg-danger bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Your Concern</p>
                            <p className="text-danger">I've got a long career gap.</p>
                          </div>
                        </div>
                        <div className="col-md-6 bg-success bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Our Solution</p>
                            <p className="text-success">Our structured training and certification reset your professional story — we build your market value.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="card border overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-6 bg-danger bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Your Concern</p>
                            <p className="text-danger">Is freelancing safe?</p>
                          </div>
                        </div>
                        <div className="col-md-6 bg-success bg-opacity-10 p-4 d-flex align-items-center">
                          <div>
                            <p className="text-muted small mb-2">Our Solution</p>
                            <p className="text-success">Learn to build a profitable freelance business and earn independently with real client projects.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 rounded" style={{ backgroundColor: '#1D3458', color: 'white' }}>
                  <p className="h5">💬 Your qualifications don't define your digital future — your skills do.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Details Section */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-5">
                  <span className="badge bg-primary mb-3 px-3 py-2">📘 Program Deep Dive – The 3-Month Career Launchpad</span>
                  <h2 style={{ color: '#1D3458' }}>Learn-Work-Launch™: The 3-Month Career Plan to Get Hired</h2>
                </div>

                <div className="table-responsive mb-5">
                  <table className="table table-bordered">
                    <thead style={{ backgroundColor: '#1D3458', color: 'white' }}>
                      <tr>
                        <th className="p-3">Component</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">What You'll Gain</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-light">
                        <td className="p-3">Professional Training</td>
                        <td className="p-3">2.5 Months</td>
                        <td className="p-3">10+ modules, GenAI masterclasses & 1 industry certifications.</td>
                      </tr>
                      <tr>
                        <td className="p-3">Work Assessments</td>
                        <td className="p-3">Integrated</td>
                        <td className="p-3">Build confidence through module presentations & live projects.</td>
                      </tr>
                      <tr className="table-light">
                        <td className="p-3">Paid Internship</td>
                        <td className="p-3">3 Months</td>
                        <td className="p-3">Work on real client projects and create your professional portfolio.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="card border-0 bg-primary bg-opacity-10 h-100">
                      <div className="card-body">
                        <p className="d-flex align-items-center mb-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2" style={{ color: '#1D3458' }}>
                            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                            <circle cx="12" cy="8" r="6"></circle>
                          </svg>
                          <span><strong>Expert Faculty:</strong> Learn directly from certified, industry-experienced trainers.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 bg-success bg-opacity-10 h-100">
                      <div className="card-body">
                        <p className="d-flex align-items-center mb-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2" style={{ color: '#1D3458' }}>
                            <path d="M16 7h6v6"></path>
                            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                          </svg>
                          <span><strong>Best Value:</strong> This job-oriented, AI-integrated program is structured to remain financially accessible.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center mb-5">
                <h2 className="mb-3" style={{ color: '#1D3458' }}>💡 Skills You'll Master</h2>
                <p className="h5 text-muted">Become a Complete Digital Marketing Professional</p>
              </div>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm" style={{ transition: 'box-shadow 0.3s' }}>
                  <div className="card-body">
                    <h5 className="card-title mb-3" style={{ color: '#1D3458' }}>Generative AI & Automation</h5>
                    <p className="card-text text-muted small mb-3">
                      Master tools like ChatGPT, Microsoft Copilot, DeepSeek, and Midjourney to create smarter, faster marketing strategies.
                    </p>
                    <p className="card-text text-muted small">
                      Build, train, and deploy AI chatbots and agents to automate customer engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm" style={{ transition: 'box-shadow 0.3s' }}>
                  <div className="card-body">
                    <h5 className="card-title mb-3" style={{ color: '#1D3458' }}>Core Digital Skills</h5>
                    <p className="card-text text-muted small">
                      Gain expertise in SEO, Google Ads, Social Media Marketing, Email Campaigns, and Marketing Analytics to drive measurable results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm" style={{ transition: 'box-shadow 0.3s' }}>
                  <div className="card-body">
                    <h5 className="card-title mb-3" style={{ color: '#1D3458' }}>Creative Excellence</h5>
                    <p className="card-text text-muted small">
                      Develop strong copywriting, content strategy, video editing, and graphic design skills to craft high-impact digital content.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button className="btn text-white" style={{ backgroundColor: '#1D3458' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
                Apply Now for 100% Placement Support
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-5" style={{ background: 'linear-gradient(135deg, #1D3458 0%, #2a4a7c 100%)', color: 'white' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 className="mb-4">Ready to Master the Future of Marketing?</h2>
                <p className="h5 mb-3">Visiomatix Media offers online Digital Marketing and AI courses.</p>
                <p className="mb-4">
                  It provides essential skills, fosters professional confidence, and supports measurable career advancement.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button className="btn btn-light text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                      <path d="M20 2v4"></path>
                      <path d="M22 4h-4"></path>
                      <circle cx="4" cy="20" r="2"></circle>
                    </svg>
                    Apply Now – Start Your Career Journey
                  </button>
                  <button className="btn btn-outline-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    Talk to a Career Expert Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
    </>
  );
};

export default Home;