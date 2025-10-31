import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { motion, AnimatePresence } from 'framer-motion'

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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] // ease-in-out cubic-bezier
          }}
          style={{ width:"100%"}}
        >
          <Slide pageIndex={currentSlide} />
        </motion.div>
      </AnimatePresence>

      <div className="carousel-controls">
        <button onClick={prevSlide} className="carousel-prev">←</button>
        <button onClick={nextSlide} className="carousel-next">→</button>
      </div>
      <div className="carousel-indicators">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>

    </div>
  )
}

export default CarouselComponent