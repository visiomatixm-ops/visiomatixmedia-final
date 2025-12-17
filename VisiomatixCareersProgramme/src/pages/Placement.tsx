import React from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CardSection from '../components/CardSection';

const Placement: React.FC = () => {
  // Hero Section Data
  const heroData = {
    title: "100% Placement Support, Guaranteed.",
    subtitle: "",
    description: "Visiomatix Media acts as a committed career partner, providing support until employment is achieved.",
    primaryButtonText: "Apply for 100% Placement",
    secondaryButtonText: "Learn More About Our Program",
  };

  // Statistics Cards Data
  const statsCards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target h-10 w-10" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      title: "92%",
      description: "Job Offers Within 60 Days",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-10 w-10" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      ),
      title: "1200+",
      description: "Professionals Trained",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-10 w-10" aria-hidden="true">
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
          <circle cx="12" cy="8" r="6"></circle>
        </svg>
      ),
      title: "100%",
      description: "Placement Support",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-10 w-10" aria-hidden="true">
          <path d="M12 6v6l4 2"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
      title: "3+",
      description: "Years of Excellence",
    },
  ];

  // Commitment Cards Data
  const commitmentCards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-8 w-8" aria-hidden="true">
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
      title: "Work Assessment",
      description: "Each participant completes live project evaluations and presentation reviews.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-8 w-8" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Dedicated Placement Team",
      description: "Coordinates job interviews until a successful placement is secured.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building h-8 w-8" aria-hidden="true">
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
          <path d="M8 6h.01"></path>
          <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
          <rect x="4" y="2" width="16" height="20" rx="2"></rect>
        </svg>
      ),
      title: "Real Company Internships",
      description: "A three-month paid internship enhances both professional experience and confidence.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-8 w-8" aria-hidden="true">
          <path d="M16 7h6v6"></path>
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
        </svg>
      ),
      title: "Career Growth Path",
      description: "Support is provided until participants are employed and advancing in their digital marketing careers.",
    },
  ];

  // Journey Steps Data
  const journeySteps = [
    {
      title: "Professional Training (2.5 Months)",
      description: "Master 10+ modules with GenAI masterclasses and earn industry certifications.",
    },
    {
      title: "Paid Internship (3 Months)",
      description: "Work on real client projects and build your professional portfolio.",
    },
    {
      title: "Placement Support",
      description: "Our dedicated team coordinates interviews and supports you until you're hired.",
    },
    {
      title: "Career Growth",
      description: "Continuous support as you advance in your digital marketing career.",
    },
  ];

  return (
    <>
      <div style={{ width: "100%" }}>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-5" style={{ background: 'linear-gradient(135deg, #1D3458 0%, #2a4a7c 100%)', color: 'white' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-5 w-5" aria-hidden="true">
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                      <circle cx="12" cy="8" r="6"></circle>
                    </svg>
                    <span>100% Placement Guarantee</span>
                  </div>
                  <HeroSection
                    title={heroData.title}
                    subtitle={heroData.subtitle}
                    description={heroData.description}
                    primaryButtonText={heroData.primaryButtonText}
                    secondaryButtonText={heroData.secondaryButtonText}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="mx-auto" style={{ maxWidth: '72rem' }}>
                <div className="text-center mb-5">
                  <p className="fs-5 text-muted">
                    To support this claim, <span style={{ color: '#1D3458' }}>92% of our last cohort accepted job offers within 60 days</span> of program completion, underscoring our commitment to your career success.
                  </p>
                </div>
                <CardSection
                  cards={statsCards}
                  backgroundStyle={{ backgroundColor: 'transparent' }}
                />
              </div>
            </div>
          </section>

          {/* Commitment Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="mx-auto" style={{ maxWidth: '72rem' }}>
                <h2 className="text-center mb-5" style={{ color: '#1D3458' }}>Our Placement Commitment Includes:</h2>
                <div className="row g-4">
                  {commitmentCards.map((card, index) => (
                    <div key={index} className="col-md-6">
                      <div
                        className="card h-100 border-2"
                        style={{ borderColor: '#1D3458', transition: 'box-shadow 0.3s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex align-items-start gap-3">
                            <div className="text-white p-3 rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: '#1D3458', width: '3rem', height: '3rem' }}>
                              {card.icon}
                            </div>
                            <div>
                              <h5 className="card-title mb-2" style={{ color: '#1D3458' }}>{card.title}</h5>
                              <p className="card-text text-muted">{card.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="mx-auto" style={{ maxWidth: '56rem' }}>
                <h2 className="text-center mb-5" style={{ color: '#1D3458' }}>The Placement Journey</h2>
                <div className="d-flex flex-column gap-4">
                  {journeySteps.map((step, index) => (
                    <div key={index} className="d-flex gap-3 align-items-start">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#1D3458' }}>
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="mb-2" style={{ color: '#1D3458' }}>{step.title}</h5>
                        <p className="text-muted">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="mx-auto text-center" style={{ maxWidth: '48rem' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-16 w-16 text-[#1D3458] mx-auto mb-6"
                >
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2Z"></path>
                  <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
                <blockquote className="text-2xl text-[#1D3458] mb-4">
                  "Because at Visiomatix, we don't train job seekers—we build professionals."
                </blockquote>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="mx-auto text-center rounded-3 p-5" style={{ maxWidth: '48rem', background: 'linear-gradient(135deg, #1D3458 0%, #2a4a7c 100%)', color: 'white' }}>
                <h2 className="mb-4">Ready to Launch Your Career?</h2>
                <p className="fs-5 mb-4">Join our program and get guaranteed placement support until you're hired.</p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button className="btn btn-light text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-2"
                    >
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                      <circle cx="12" cy="8" r="6"></circle>
                    </svg>
                    Apply for 100% Placement
                  </button>
                  <button className="btn btn-outline-light">
                    Learn More About Our Program
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Placement;