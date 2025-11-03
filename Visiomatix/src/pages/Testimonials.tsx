// ===========================================================
// Filename: testimonials.tsx
// Author: Viral Prajapati
// Created On: 08-Oct-2025
// Description:
//   Portfolio / Case Studies page for Visiomatix Media
//   showing client projects, results, and success stories.
// ===========================================================


import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PeopleCard from "../component/PeopleCard";
import { Helmet } from 'react-helmet-async';

// Visiomatix Media Projects (dummy data)
const portfolio = [
  {
    client: "Fashionista Inc.",
    role: "Marketing Director",
    project: "Social Media Branding Campaign",
    image: "/services/brand-design-2.jpg",
    description:
      "Developed a cohesive brand identity and social media strategy, resulting in 50% increase in engagement and brand recognition.",
  },
  {
    client: "TechWave Solutions",
    role: "Product Manager",
    project: "Product Launch Video & Motion Graphics",
    image: "/services/motion.jpg",
    description:
      "Produced an engaging product launch video with motion graphics, boosting online demo requests by 35%.",
  },
  {
    client: "ArtLens Photography",
    role: "Founder",
    project: "Professional Photography & Portfolio Development",
    image: "/services/photography.jpg",
    description:
      "Captured high-quality photography and developed a visually compelling portfolio for client's marketing campaigns.",
  },
  {
    client: "FilmStudioX",
    role: "Creative Head",
    project: "Video Editing & Post-Production",
    image: "/services/videoediting-1.jpg",
    description:
      "Provided seamless video editing and post-production for multiple short films and advertisements, enhancing visual appeal and storytelling.",
  },
  {
    client: "StartUp MediaHub",
    role: "CEO",
    project: "2D/3D Animation Series",
    image: "/services/animation-1.jpg",
    description:
      "Designed a series of creative 2D/3D animations for advertising campaigns, increasing audience retention by 40%.",
  },
  {
    client: "Webify Co.",
    role: "CTO",
    project: "Responsive Web Design & Development",
    image: "/services/web-design-1.jpg",
    description:
      "Built modern and responsive websites for multiple clients, improving user experience and increasing session duration.",
  },
  {
    client: "AdPro Marketing",
    role: "Campaign Manager",
    project: "Videography for Commercials",
    image: "/services/videography.png",
    description:
      "End-to-end videography for commercials, delivering high-quality content that boosted campaign ROI significantly.",
  },
  {
    client: "GraphicWorld",
    role: "Design Lead",
    project: "Graphic Design Campaigns",
    image: "/services/graphic.jpg",
    description:
      "Created visually stunning graphics for online campaigns, posters, and social media content, elevating brand aesthetics.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Our Portfolio & Success Stories | Visiomatix Media</title>
        <meta
          name="description"
          content="Explore Visiomatix Media's portfolio showcasing diverse projects in software, web, and mobile solutions. Discover our success stories and client testimonials."
        />
        <link rel="canonical" href="https://visiomatixmedia.com/testimonials" />
      </Helmet>
      {/* Hero Banner */}
      <section
        className="jumbotron text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/about/testimonials.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <div style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(0, 40, 80, 0.45)",
          borderRadius: "12px",
          width:"90%",
          padding:"1em",
          backdropFilter: "blur(5px)",
        }}>
           <h1 className="display-5 fw-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Our Portfolio & Success Stories</h1>
           <p className="lead text-sm sm:text-base md:text-lg">
             At Visiomatix, every project is a story of transformation — where
             ideas evolve into impactful digital products. Our portfolio showcases a diverse
             range of software, web, and mobile solutions developed for clients across the globe.
             We take pride in crafting high-performance systems that empower businesses, enhance
             customer engagement, and accelerate growth
           </p>
         </div>
      </section>

      {/* Portfolio Grid */}
      <Container className="mb-5">
        <Row className="g-4">
          {portfolio.map((p, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="shadow-lg rounded-4 border-0 h-100 portfolio-card">
                <div className="card-image-wrapper">
                  <Card.Img
                    variant="top"
                    src={p.image}
                    alt={p.project}
                    className="rounded-top-4"
                  />
                </div>
                <Card.Body className="d-flex flex-column text-light">
                  <h5 className="fw-bold mb-2 text-sm sm:text-base md:text-lg">{p.project}</h5>
                  <p className="text-light fst-italic mb-3 text-sm sm:text-base">
                    {p.client} - {p.role}
                  </p>
                  <p className="flex-grow-1 text-sm sm:text-base">{p.description}</p>
                  <div className="text-center mt-auto">
                    <Button variant="outline-info">View Case Study</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <PeopleCard />
      </Container>

      {/* Inline Styles */}
    </>
  );
};

export default Testimonials;