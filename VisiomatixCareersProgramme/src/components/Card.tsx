import React from 'react';
import type { FC, ReactNode } from 'react';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ icon, title, description }) => {
  const textColor = { color: 'rgb(29, 52, 88)' };
  const buttonStyle = { backgroundColor: 'rgb(29, 52, 88)', color: 'white', border: 'none' };
  const cardStyle = { boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' };
  const hoverStyle = { border: '3px solid rgb(29, 52, 88)' };

  return (
    <div
      className="card h-100 border-0"
      style={cardStyle}
    >
      <div className="card-body d-flex flex-column p-4">
        <div className="bg-light d-flex align-items-center justify-content-center mb-3" style={{ ...textColor, width: '48px', height: '48px', borderRadius: '8px' }}>
          {icon}
        </div>
        <h5 className="card-title mb-2" style={textColor}>{title}</h5>
        <p className="card-text small mb-3" style={textColor}>{description}</p>
        <button className="btn mt-auto" style={buttonStyle}>Learn More</button>
      </div>
    </div>
  );
};

export default Card;