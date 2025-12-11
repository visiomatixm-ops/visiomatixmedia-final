import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import './views/slides.css'
import Slide from './views/Slide.tsx'
import { pages } from './views/pages.tsx'

const CarouselComponent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pages.length)
    }, 60000) // Change slide every 60 seconds

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pages.length) % pages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="carousel-container">
      <Helmet>
        <title>Visiomatix</title>
      </Helmet>

      <Slide pageIndex={currentSlide} />

      <div className="carousel-controls">
        <button onClick={prevSlide} className="carousel-prev">←</button>
        <button onClick={nextSlide} className="carousel-next">→</button>
      </div>

      {/* ❌ Removed INDICATORS */}
      {/* <div className="carousel-indicators">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default CarouselComponent
