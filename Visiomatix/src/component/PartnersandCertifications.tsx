import React from 'react';
import { Carousel } from 'react-bootstrap';

const PartnersandCertifications: React.FC = () => {
  const images = [
    '/partners-and-certifications/Bing PartnerLogo.png',
    '/partners-and-certifications/Google AdsLogo.png',
    '/partners-and-certifications/Google Partner.png',
    '/partners-and-certifications/HTMl Logo.png',
    '/partners-and-certifications/Linkedin Marketing Partner Logo.png',
    '/partners-and-certifications/Meta Partner.png',
    '/partners-and-certifications/Wordpress Logo.png',
  ];

  // Group images into slides of 3
  const slides = [];
  for (let i = 0; i < images.length; i += 3) {
    slides.push(images.slice(i, i + 3));
  }

  return (
    <div
      className="container-fluid"
      style={{
        background: '#F7F7F7',
        padding: '50px 20px 25px', // reduced bottom space only
        textAlign: 'center',
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2
            style={{
              fontSize: '3rem',
              paddingBottom: '0.3em',
              fontWeight: 600,
              color: '#003866',
              marginBottom: '10px',
            }}
          >
            Partners and Certifications
          </h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-10">
          <Carousel interval={3000} controls={false} indicators={false} wrap={true}>
            {slides.map((slideImages, slideIndex) => (
              <Carousel.Item key={slideIndex}>
                <div className="d-flex justify-content-around align-items-center flex-wrap gap-3">
                  {slideImages.map((src, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={src}
                      alt={`Partner ${(slideIndex * 3) + imgIndex + 1}`}
                      style={{
                        width: '200px',
                        height: '150px',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                      className="partner-logo"
                    />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PartnersandCertifications;
