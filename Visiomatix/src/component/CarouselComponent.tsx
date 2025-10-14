import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageSlider1 from "/carousel/ImageSlider1.webp";
import ImageSlider2 from "/carousel/ImageSlider2.webp";
import ImageSlider3 from "/carousel/ImageSlider3.webp";

const items = [
  { src: ImageSlider1, caption: "Beautiful Web Experience", key: 1 },
  { src: ImageSlider2, caption: "Modern Design & Aesthetics", key: 2 },
  { src: ImageSlider3, caption: "Responsive & Interactive UI", key: 3 },
];

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const next = () => {
    setDirection(1);
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-85 mx-auto position-relative" style={{ height: "800px" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={items[activeIndex].key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="position-absolute top-0 start-0 w-100 h-100"
        >
          <img
            src={items[activeIndex].src}
            alt={items[activeIndex].caption}
            className="w-100 h-100"
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "12px" }}
          />
          <div
            className="position-absolute bottom-3 start-50 translate-middle-x text-white text-center"
            style={{ fontSize: "1.3rem", fontWeight: "600" }}
          >
            {items[activeIndex].caption}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <button
        onClick={prev}
        className="position-absolute top-50 start-0 translate-middle-y bg-dark bg-opacity-50 rounded-circle"
        style={{ width: "40px", height: "40px", border: "none", zIndex: 10 }}
      >
        ‹
      </button>
      <button
        onClick={next}
        className="position-absolute top-50 end-0 translate-middle-y bg-dark bg-opacity-50 rounded-circle"
        style={{ width: "40px", height: "40px", border: "none", zIndex: 10 }}
      >
        ›
      </button>

      {/* Indicators */}
      <div className="position-absolute bottom-2 start-50 translate-middle-x d-flex gap-2">
        {items.map((_, index) => (
          <span
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: activeIndex === index ? "white" : "gray",
              cursor: "pointer",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
