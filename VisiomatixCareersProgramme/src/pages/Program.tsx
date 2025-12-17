import React from 'react';
import type { FC } from 'react';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';


const Program: FC = () => {
  const heroData = {
    title: "Master High-Demand Skills. Build Future-Ready Careers:",
    subtitle: "Visiomatix Media empowers learners in top professional fields.",
    description: "While our flagship 3-Month Digital Marketing Course leads the way, we also offer industry-aligned, job-ready programs in technology, AI, and management.",
    primaryButtonText: "Start Your 6-Month Journey",
    secondaryButtonText: "Download Full Curriculum",
  };

  // Icon components
  const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );

  const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );

  const TestTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );

  const SmartphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );

  const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 18V5" />
      <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
      <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
      <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
      <path d="M18 18a4 4 0 0 0 2-7.464" />
      <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
      <path d="M6 18a4 4 0 0 1-2-7.464" />
      <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
    </svg>
  );

  const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M5 21v-6" />
      <path d="M12 21V9" />
      <path d="M19 21V3" />
    </svg>
  );

  const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 2v10" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="m15.66 12.34-1.41-1.41" />
      <path d="m11.66 16.34-1.41-1.41" />
      <path d="M22 2h-2" />
      <path d="M2 2h2" />
      <path d="m6.34 6.34 1.41 1.41" />
      <path d="m10.34 2.34 1.41 1.41" />
    </svg>
  );

  const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );

  const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );

  const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );

  const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );

  const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );

  const categories = [
    {
      title: "Software & Development",
      icon: <CodeIcon />,
      courses: [
        {
          title: "Full Stack Development",
          description: "Build & deploy responsive web apps.",
          icon: <CodeIcon />,
        },
        {
          title: "UI/UX Design",
          description: "Design modern, user-centric experiences.",
          icon: <PaletteIcon />,
        },
        {
          title: "Software Testing & QA",
          description: "Ensure digital product quality.",
          icon: <TestTubeIcon />,
        },
        {
          title: "App Development",
          description: "Develop Android/iOS mobile applications.",
          icon: <SmartphoneIcon />,
        },
      ],
    },
    {
      title: "Data & AI",
      icon: <BrainIcon />,
      courses: [
        {
          title: "Artificial Intelligence & Machine Learning",
          description: "Create AI-driven business models.",
          icon: <BrainIcon />,
        },
        {
          title: "Data Analytics",
          description: "Convert data into actionable insights.",
          icon: <ChartIcon />,
        },
        {
          title: "AI Automation Specialist Program",
          description: "Automate workflows using AI, APIs & GenAI tools.",
          icon: <ZapIcon />,
        },
        {
          title: "Chatbot & AI Agent Program",
          description: "Build intelligent chatbots & customer automation systems.",
          icon: <BotIcon />,
        },
      ],
    },
    {
      title: "Infrastructure & Security",
      icon: <CloudIcon />,
      courses: [
        {
          title: "Cloud Computing & Hosting",
          description: "Master AWS, Azure, and server management.",
          icon: <CloudIcon />,
        },
        {
          title: "Cyber Security",
          description: "Safeguard digital assets from cyber threats.",
          icon: <ShieldIcon />,
        },
      ],
    },
    {
      title: "Creative & Media",
      icon: <VideoIcon />,
      courses: [
        {
          title: "VFX & Motion Graphics",
          description: "Create high-impact visual content.",
          icon: <VideoIcon />,
        },
        {
          title: "Graphic Design",
          description: "Design for branding, digital, and print.",
          icon: <ImageIcon />,
        },
      ],
    },
    {
      title: "Management & Professional",
      icon: <BriefcaseIcon />,
      courses: [
        {
          title: "HR Management",
          description: "Learn modern recruitment & retention.",
          icon: <UsersIcon />,
        },
        {
          title: "Project Management & Leadership",
          description: "Master Agile, Scrum, and leadership practices.",
          icon: <BriefcaseIcon />,
        },
      ],
    },
  ];

  return (
    <>
      <style>
        {`
          .row {
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            display: flex;
            margin-top: calc(-1 * var(--bs-gutter-y));
            margin-right: calc(-.5 * var(--bs-gutter-x));
            margin-left: calc(-.5 * var(--bs-gutter-x));
          }
          .card:hover {
            border: 3px solid rgb(29, 52, 88) !important;
          }
        `}
      </style>
      <div style={{ width: "100%" }}>
        <main className="flex-grow-1">
          {/* Hero Section */}
          <HeroSection
            title={heroData.title}
            subtitle={heroData.subtitle}
            description={heroData.description}
            primaryButtonText={heroData.primaryButtonText}
            secondaryButtonText={heroData.secondaryButtonText}
          />

          {/* Course Categories */}
          <section className="py-5">
            <div className="container">
              {categories.map((category, idx) => (
                <div className="row mb-5" key={idx}>
                  <div className="col-lg-6 mb-4" key={idx}>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-white p-3 rounded" style={{backgroundColor:'rgb(29, 52, 88) '}}>
                        {category.icon}
                      </div>
                      <h2 style={{ color: 'rgb(29, 52, 88)' }}>{category.title}</h2>
                    </div>
                    <div className="row" style={{flexWrap:'nowrap'}}>
                      {category.courses.map((course, courseIdx) => (
                        <div className="col-12 col-sm-6 mb-3" key={courseIdx}>
                          <Card
                            icon={course.icon}
                            title={course.title}
                            description={course.description}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="mx-auto text-center" style={{ maxWidth: '48rem', background: 'linear-gradient(to bottom right, #1D3458, #2a4a7c)', color: 'white', borderRadius: '1rem', padding: '3rem' }}>
                <h2 className="mb-4">Ready to Start Your Learning Journey?</h2>
                <p className="fs-5 mb-4">Choose the program that aligns with your career goals and get started today.</p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <a href="/contact" className="btn btn-light text-primary">Contact Us for Program Details</a>
                  <a href="/" className="btn btn-outline-light">View Our Flagship Program</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Program;