/**
 * File: src/components/PeopleCard.tsx
 * Author: Viral Prajapati
 * Date: 2025-10-10
 * Description:
 *  Bootstrap-styled responsive testimonial carousel.
 *  Theme aligned with portfolio cards — navy background (#0b1e34),
 *  aqua highlights, soft shadows, and uniform text styling.
 */

import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  image: string;
  text: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rakesh Shah",
    role: "CEO, Acme Ventures",
    image: "/people/Person1.jpeg",
    text: `Visiomatix Media transformed our digital presence — creative, reliable and results-driven. Their campaign boosted our leads and brand trust. Highly recommended!`,
  },
  {
    id: "t2",
    name: "Priya Desai",
    role: "Head of Marketing, BrightCo",
    image: "/people/Person2.jpeg",
    text: `Working with Visiomatix was a delight. They listened, iterated fast and delivered a campaign that resonated with our audience.`,
  },
  {
    id: "t3",
    name: "Rohit Jain",
    role: "Founder, StudioNine",
    image: "/people/Person3.jpeg",
    text: `Their storytelling and visuals gave our brand the personality it needed. The team is punctual and professional — results speak for themselves.`,
  },
  {
    id: "t4",
    name: "Anjali Mehta",
    role: "Marketing Director, NovaTech",
    image: "/people/Person2.jpeg",
    text: `From start to finish, Visiomatix brought creativity and precision to every part of our media campaign.`,
  },
];

type PeopleCardProps = {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
};

const PeopleCard: React.FC<PeopleCardProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlay = true,
  interval = 4000,
  pauseOnHover = true,
}) => {
  const [index, setIndex] = useState<number>(0);
  const hoverRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay) return;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (pauseOnHover && hoverRef.current) return;
      setIndex((i) => (i + 1) % testimonials.length);
    }, interval) as unknown as number;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, pauseOnHover, testimonials.length]);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const goTo = (i: number) => setIndex(i % testimonials.length);

  return (
    <section
      className="py-5"
      style={{ backgroundColor: "#ffffffff", color:"#000" }}
      aria-label="Client testimonials"
    >
      <div
        className="container rounded-4 p-4"
        style={{
          width: "90%",
         boxShadow: "0 0 25px rgba(7, 90, 90, 0.25)", // Aqua glow shadow
          border: "1px solid rgba(0, 255, 255, 0.1)",
        }}
      >
        <div
          className="overflow-hidden position-relative"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <div
            className="d-flex transition-all"
            style={{
              width: `${testimonials.length * 100}%`,
              transform: `translateX(-${index * (100 / testimonials.length)}%)`,
              transition: "transform 0.6s ease-in-out",
            }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-100">
                <div className="row align-items-center  px-4">
                  {/* LEFT SIDE: image */}
                  <div className="col-md-4 text-center py-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      onError={(e) =>
                        (e.currentTarget.src = "/people/person1.jpg")
                      }
                      className="img-fluid rounded-circle border border-info border-3 shadow"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)",
                      }}
                    />
                  </div>

                  {/* RIGHT SIDE: text */}
                  <div className="col-md-8 py-4">
                    <h4 className="fw-bold">{t.name}</h4>
                    {t.role && (
                      <p className="text-secondary fst-italic">{t.role}</p>
                    )}
                    <p className="lead mb-0">{t.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-info rounded-circle mx-2 shadow-sm"
            onClick={prev}
          >
            ‹
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm mx-1 rounded-circle ${
                i === index ? "btn-info" : "btn-light border"
              }`}
              style={{
                width: "10px",
                height: "10px",
                padding: 0,
                boxShadow:
                  i === index
                    ? "0 0 10px rgba(0, 168, 168, 0.8)"
                    : "0 0 5px rgba(9, 83, 83, 1)",
              }}
              onClick={() => goTo(i)}
            />
          ))}
          <button
            className="btn btn-outline-info rounded-circle mx-2 shadow-sm"
            onClick={next}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default PeopleCard;
