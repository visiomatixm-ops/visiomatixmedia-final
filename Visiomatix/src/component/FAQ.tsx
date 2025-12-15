import { useState } from "react";
import "./faq.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What services does Visiomatix Media offer?", answer: "We provide branding, digital marketing, motion graphics, graphic design, 3D modeling, VFX, and advertising solutions tailored to business needs." },
    { question: "How can I contact Visiomatix Media?", answer: "You can reach us via email at visiomatixmedia@gmail.com or call/WhatsApp +91 89991 01916." },
    { question: "What does Visiomatix Media specialize in?", answer: "Visiomatix Media is a full-service digital growth agency specializing in brand strategy, creative design, website development, digital marketing, SEO, performance marketing, and AI-powered visual solutions." },
    { question: "How does Visiomatix Media approach client projects?", answer: "We follow a structured, strategy-first approach that begins with research and planning, followed by execution and continuous performance optimization." },
    { question: "What makes Visiomatix Media different from other agencies?", answer: "Our strength lies in combining strategic thinking, creative excellence, data-driven execution, and AI-powered solutions to deliver consistent results." },
    { question: "Do you offer customized solutions or fixed packages?", answer: "We primarily offer customized solutions aligned with business goals, industry requirements, and budgets to ensure maximum ROI" },
    { question: "How do you ensure quality and consistency across deliverables?", answer: "All deliverables go through a defined quality-control process, including internal reviews and brand guideline checks" },
    { question: "How is project progress communicated to clients?", answer: "Clients receive structured reports, milestone updates, and performance insights through regular communication" },
    { question: "How is project progress communicated to clients?", answer: "Businesses can get started by submitting a service request through our website or scheduling aconsultation with our team." },
   // { question: "How do I apply for an internship?", answer: "Send your application to visiomatixmedia@gmail.com or fill out the registration form on our website." },
    //{ question: "Are there full-time job opportunities after the internship?", answer: "Yes, high-performing interns may be offered full-time employment based on performance and company requirements." },
   // { question: "What is the training program duration?", answer: "Training programs typically last 4 months, followed by internships of varying lengths." },
    //{ question: "Can I join the training program online?", answer: "Yes, we offer both online and offline training modes." },
    //{ question: "Are there course fees for the training program?", answer: "Yes, fees vary depending on the program. Discounts may be available from time to time." },
    //{ question: "What technologies are taught in Full Stack Development training?", answer: "Technologies include HTML, CSS, JavaScript, React, Node.js, Databases, and more." },
   // { question: "Will I get hands-on projects during the training?", answer: "Yes, all training programs include real-world projects for practical experience." },
    //{ question: "Are there deadlines for registration?", answer: "Yes, registration deadlines are mentioned for each batch on our website." },
     //{ question: "Do you provide placement support?", answer: "Yes, we assist eligible candidates with job placement and guidance after the internship." }, 
    // { question: "How can I pay the course fees?", answer: "Payments can be made via bank transfer, UPI, or other secure online payment methods." },
    // { question: "Can I choose multiple courses at the same time?", answer: "Yes, you can enroll in multiple courses based on availability and schedule." }, 
     //{ question: "Who will guide me during the internship?", answer: "Each intern is assigned a mentor or team lead to guide them throughout the program." },
    // { question: "How can I get more information about Visiomatix Media?", answer: "Visit our website or contact us at visiomatixmedia@gmail.com or +91 89991 01916 for further inquiries." }, 
     //{ question: "What is the mode of communication during online training?", answer: "We use platforms like Zoom, Google Meet, and Slack for live sessions, updates, and collaboration." }, 
     //{ question: "Are the training sessions recorded?", answer: "Yes, all sessions are recorded and shared with participants for revision and reference." }, 
     //{ question: "How many hours per week is the training?", answer: "Training sessions typically run 15–20 hours per week, depending on the course." }, 
     //{ question: "Can I switch batches if the current schedule doesn’t work for me?", answer: "Yes, batch transfers are allowed based on availability and training coordinator approval." },
    // { question: "Do I need prior experience to join a course?", answer: "No prior experience is required for beginner programs. Advanced courses may have prerequisites." },
     //{ question: "Are there assessments during the training?", answer: "Yes, assessments, quizzes, and project evaluations are conducted to track learning progress." },
    // { question: "Will I get mentorship during my internship?", answer: "Yes, each intern is assigned a dedicated mentor to guide them through projects and tasks." },
    // { question: "Is there a feedback system for trainees and interns?", answer: "Yes, regular feedback is provided, and trainees are encouraged to give feedback to improve the program." },
     //{ question: "Can I apply for multiple internships simultaneously?", answer: "Yes, you may apply for multiple programs, but can participate in only one internship at a time." },
    //  { question: "How can I stay updated on upcoming courses and batches?", answer: "Subscribe to our newsletter or follow us on social media platforms for updates." },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      
      <div className="faq-left">
        <p className="faq-subtitle">FAQS</p>
        <h2 className="faq-heading">Frequently <br /> Asked Questions</h2>
      </div>

      <div className="faq-right">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-card ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {item.question}
              <span className={`icon ${openIndex === index ? "rotate" : ""}`}>+</span>
            </div>

            <div className={`faq-answer ${openIndex === index ? "answer-open" : ""}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
