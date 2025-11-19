import React from 'react';

interface SVGElement {
  type: 'path' | 'circle';
  d?: string;
  cx?: string;
  cy?: string;
  r?: string;
}

interface Card {
  icon: string | SVGElement[] | React.ReactNode;
  title: string;
  description: string;
  additionalDescription?: string;
}

interface CardSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  cards: Card[];
  backgroundStyle?: React.CSSProperties;
  buttonText?: string;
  buttonAction?: () => void;
  buttonIcon?: string;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  subtitle,
  description,
  cards,
  backgroundStyle,
  buttonText,
  buttonAction,
  buttonIcon,
}) => {
  return (
    <section className="py-5" style={backgroundStyle}>
      <div className="container">
        {title && (
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <h2 className="mb-3" style={{ color: '#1D3458' }}>{title}</h2>
              {subtitle && <p className="h5 mb-2">{subtitle}</p>}
              {description && <p className="text-muted">{description}</p>}
            </div>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm" style={{ transition: 'box-shadow 0.3s' }}>
                <div className="card-body">
                  <div className="mb-3" style={{ color: '#1D3458' }}>
                    {React.isValidElement(card.icon) ? (
                      card.icon
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {Array.isArray(card.icon) ? (
                          card.icon.map((element, index) => {
                            if (element.type === 'circle') {
                              return <circle key={index} cx={element.cx} cy={element.cy} r={element.r} />;
                            } else {
                              return <path key={index} d={element.d} />;
                            }
                          })
                        ) : (
                          <path d={card.icon as string} />
                        )}
                      </svg>
                    )}
                  </div>
                  <h5 className="card-title mb-3" style={{ color: '#1D3458' }}>{card.title}</h5>
                  <p className="card-text text-muted small mb-3">
                    {card.description}
                  </p>
                  {card.additionalDescription && (
                    <p className="card-text text-muted small">
                      {card.additionalDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {buttonText && (
          <div className="text-center mt-4">
            <button className="btn text-white" style={{ backgroundColor: '#1D3458' }} onClick={buttonAction}>
              {buttonIcon && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                  <path d={buttonIcon}></path>
                </svg>
              )}
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardSection;