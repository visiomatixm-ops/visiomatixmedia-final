// ===========================================================
// Filename: TestimonialsSection.tsx
// Description: Simple testimonials slider for Home Page
// ===========================================================

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const testimonials = [
  {
    name: "Rohan Patil",
    role: "Marketing Director, Fashionista Inc.",
    feedback:
      "Visiomatix completely transformed our brand presence. Their creativity and dedication are unmatched!",
    //image: "/services/brand-design-2.jpg",
  },
  {
    name: "Neha Sharma",
    role: "Product Manager, TechWave Solutions",
    feedback:
      "The product launch video they created boosted our engagement instantly. Highly recommended!",
    //image: "/services/motion.jpg",
  },
  {
    name: "Amit Verma",
    role: "Founder, ArtLens Photography",
    feedback:
      "Their designs and video editing quality is top-tier. My business grew 2x after working with them.",
   // image: "/services/photography.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#0a1a2b" }}>
      <Container>
        <h2 className="fw-bold text-center text-light mb-4">
          What Our Clients Say
        </h2>

        <Row className="g-4">
          {testimonials.map((t, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 shadow-lg rounded-4 border-0">
                <Card.Img
                //  src={t.image}
                  alt={t.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                <Card.Body className="text-dark">
                  <h5 className="fw-bold">{t.name}</h5>
                  <p className="fst-italic text-secondary">{t.role}</p>
                  <p>"{t.feedback}"</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
