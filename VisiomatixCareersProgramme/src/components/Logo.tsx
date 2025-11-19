import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="d-flex align-items-center"
      style={{ marginRight:'2em'
       }}>
      <img
        src="/logo/Logo2PNG.png"
        alt="Visiomatix Media Logo"
        className="me-2"
        style={{ height: '40px', width: 'auto' }}
      />
      <div style={{ color: '#1D3458' }}>
        <span className="d-block fw-bold">Visiomatix Media</span>
        <span className="d-block small text-muted">Pvt Ltd</span>
      </div>
    </div>
  );
};

export default Logo;