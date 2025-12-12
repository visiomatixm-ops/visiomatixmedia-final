import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Visiomatix offer?",
      answer: "Visiomatix offers a comprehensive range of digital marketing services including web design, development, branding, video production, and more."
    },
    {
      question: "How can I get started with Visiomatix?",
      answer: "You can get started by contacting us through our website or scheduling a call. We'll discuss your requirements and provide a customized solution."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we provide ongoing support and maintenance for all our projects to ensure your digital presence remains effective."
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
            >
              <div className="accordion-body">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
