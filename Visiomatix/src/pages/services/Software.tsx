/**
 * @file Software.tsx
 * @description Business Software Solutions Page — React + TypeScript + Bootstrap 5 + Framer Motion animations + SEO (Helmet + JSON-LD Schema)
 */

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Diagram3,
  People,
  PersonWorkspace,
  Robot,
  LightningCharge,
} from "react-bootstrap-icons";

import AIVoiceAssistant from "/services/businesssolutions/AI Voice Sales Assistant Integration-1.jpg";
import BusinessAutomation from "/services/businesssolutions/Business Automation Tools-1.jpg";
import CRMDevelopment from "/services/businesssolutions/CRM Development-1.jpg";
import ERPDevelopment from "/services/businesssolutions/ERP Development 1.jpg";
import HRMSDevelopment from "/services/businesssolutions/human resource management-1.jpg";
import Banner from "/services/Banner/Business Software Expertise-2.jpg";

/* Motion Variants */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const Software: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Business Software Solutions | ERP, CRM, HRMS & AI Automation</title>
      </Helmet>

      <motion.div id="content" initial="hidden" animate="visible" variants={fadeInUp}>
        {/* HERO */}
        <section
          className="text-light py-5 position-relative"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: "cover",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(9,23,38,0.71)" }}
          />
          <div className="container text-center position-relative">
            <motion.h1 className="display-5 fw-bold text-white">
              Business Software Solutions
            </motion.h1>

            <motion.p className="lead mt-3 text-white">
              Empower your enterprise with intelligent, automated, and data-driven software systems that redefine efficiency.
            </motion.p>

            <motion.a href="#solutions" className="btn btn-light btn-lg mt-3">
              Explore Solutions
            </motion.a>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-5 bg-light">
          <div className="container">
            <p className="lead text-dark text-center mx-auto" style={{ maxWidth: "850px" }}>
              At,we Visiomatix,we design and develop intelligent business software that integrates data, workflows, and decision-making into one seamless platform.
              From ERP systems that unify operations to CRM platforms that enhance customer relationships,
              we create technology that transforms productivity.
              Our HRMS tools streamline workforce management, while our AI Voice Sales Assistants and Automation Tools empower teams with real-time insights and task automation.
              Every solution we build is custom-engineered to improve performance, security, and scalability across industries.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="solutions" className="py-5">
          <motion.div
            className="container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-center fw-semibold mb-5">
              Our Business Software Expertise
            </h2>

            <div className="row">
              {[
                { title: "ERP Development", icon: Diagram3, text: "Centralized ERP systems for finance, HR, inventory and supply chain." },
                { title: "CRM Development", icon: People, text: "CRM platforms to manage leads, sales automation and customer insights." },
                { title: "HRMS Development", icon: PersonWorkspace, text: "Cloud-based HRMS for payroll, recruitment and performance tracking." },
                { title: "AI Voice Sales Assistant", icon: Robot, text: "AI-powered voice assistants for sales automation and lead qualification." },
                { title: "Business Automation", icon: LightningCharge, text: "Workflow automation tools to eliminate manual operations." },
              ].map((item, idx) => (
                <div key={idx} className="col-lg-4 col-md-6 mb-4">
                  <motion.div className="card h-100 shadow-sm border-0 p-4">
                    <h5 className="fw-bold">
                      <item.icon className="me-2 text-primary" />
                      {item.title}
                    </h5>
                    <p className="mt-2">{item.text}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            {[
              { title: "ERP Development", text: "We build robust Enterprise Resource Planning (ERP) systems that centralize your business processes — from inventory and finance to HR and supply chain — into one unified platform.With a focus on scalability and customization, our ERP systems adapt to your business needs, whether you’re a startup or an enterprise. We integrate advanced features like automated reporting, analytics dashboards, and workflow management to help your teams work smarter and more efficiently Our expert developers ensure seamless integration with your existing software ecosystem, providing a smooth transition with minimal disruption.", icon: Diagram3, img: ERPDevelopment, reverse: false },
              { title: "CRM Development", text: "Our Customer Relationship Management (CRM) solutions help manage customer data, automate sales processes, and optimize marketing funnels to enhance retention and drive long-term growth. We design intelligent systems that enable your team to track leads, nurture relationships, and gain actionable insights into customer behavior With seamless integration across email, social media, and communication platforms, our CRM solutions ensure a unified view of every customer interaction. From automated follow-ups and lead scoring to real-time analytics and performance tracking, we empower your business to make data-driven decisions that strengthen customer engagement Whether you’re a small business looking to boost sales efficiency or a large enterprise aiming to personalize customer experiences, our custom-built CRM platforms are scalable, secure, and designed to grow with your business.", icon: People, img: CRMDevelopment, reverse: true },
              { title: "HRMS Development", text: "Simplify recruitment, attendance tracking, payroll, and performance evaluation with a secure, cloud-based HRMS system tailored to your organization Our HRMS solutions streamline recruitment, attendance, payroll, and performance management.Built on a secure, cloud-based platform for seamless accessibility and scalability Automate repetitive HR tasks to boost efficiency and accuracy across departments Empower your HR team with real-time insights and customizable dashboards Simplify workforce management while enhancing employee engagement and productivity Simplify workforce management while enhancing employee engagement and productivity.", icon: PersonWorkspace, img: HRMSDevelopment, reverse: false },
              { title: "AI Voice Sales Assistant Integration", text: "Integrate AI-powered voice assistants into your sales ecosystem for real-time conversation analysis, lead qualification, and smarter customer engagement. Our AI voice solutions help sales teams automate routine calls, capture insights from every interaction, and respond instantly to customer queries with human-like accuracy By leveraging natural language processing (NLP) and machine learning, these assistants can identify customer intent, recommend next steps, and provide instant access to product or service information. This not only improves response times but also enhances personalization and builds stronger client relationships Our systems seamlessly connect with your existing CRM and ERP platforms, ensuring a unified sales workflow.", icon: Robot, img: AIVoiceAssistant, reverse: true },
              { title: "Business Automation Tools", text: "Automate repetitive workflows using custom-built tools that connect departments, reduce manual errors, and boost operational productivity. Our automation solutions are designed to streamline complex processes, eliminate bottlenecks, and ensure seamless collaboration across your organization By integrating AI, analytics, and intelligent workflows, we help businesses save time, cut costs, and focus on strategic growth instead of manual tasks. From automated data entry and approvals to advanced reporting and notifications, our tools provide real-time visibility and control over daily operations Whether you need to optimize internal communication, manage resources efficiently, or ensure compliance through consistent processes, our end-to-end automation systems deliver accuracy, efficiency, and measurable results across every business function.", icon: LightningCharge, img: BusinessAutomation, reverse: false },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className={`row align-items-stretch mb-5 ${service.reverse ? "flex-row-reverse" : ""}`}
              >
                <div className="col-md-6 d-flex">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-100 h-100 rounded-3 shadow"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-6 d-flex rounded-3 shadow">
                  <div className="d-flex flex-column justify-content-start h-100 w-100">
                    <h4 className="fw-bold">
                      <service.icon className="me-2 text-primary" />
                      {service.title}
                    </h4>
                    <p className="text-dark mt-2">{service.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-dark text-light text-center py-5">
          <div className="container">
            <h3 className="fw-bold mb-3">
              Transform Your Business with Smart Software
            </h3>
            <p className="lead">
              Let’s build enterprise-grade solutions that automate, scale, and empower your operations.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg mt-3">
              Get in Touch
            </a>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Software;
