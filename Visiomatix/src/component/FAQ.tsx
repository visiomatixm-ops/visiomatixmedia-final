import { useState } from "react";
import "./faq.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does Visiomatix Media offer?",
      answer:
        "We provide branding, digital marketing, motion graphics, graphic design, 3D modeling, VFX, and advertising solutions tailored to business needs.",
    },
    {
      question: "How can I contact Visiomatix Media?",
      answer:
        "You can reach us via email at visiomatixmedia@gmail.com or call/WhatsApp +91 89991 01916.",
    },
    {
      question: "Does Visiomatix Media offer internships?",
      answer:
        "Yes, we offer internships in various domains including Full Stack Development, Graphic Design, Digital Marketing, and more.",
    },
    {
      question: "How long is the internship program?",
      answer:
        "The internship typically lasts 3 to 6 months, depending on the role and program selected.",
    },
    {
      question: "Is the internship paid?",
      answer:
        "Some internships offer a stipend based on performance. Details vary by role.",
    },
    {
      question: "Do interns receive a certificate?",
      answer:
        "Yes, all interns who successfully complete their program will receive a certificate.",
    },
    {
      question: "Who can apply for internships?",
      answer:
        "Students, fresh graduates, and early-career professionals with basic computer skills and a willingness to learn.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-left">
        <p className="faq-subtitle">FAQS</p>
        <h2 className="faq-heading">
          Frequently <br /> Asked Questions
        </h2>
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
              <span
                className={`icon ${openIndex === index ? "rotate" : ""}`}
              >
                +
              </span>
            </div>

            <div
              className={`faq-answer ${
                openIndex === index ? "answer-open" : ""
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
