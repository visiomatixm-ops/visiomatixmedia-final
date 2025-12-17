import React from 'react';

interface TableRow {
  component: string;
  duration: string;
  gain: string;
}

interface AdditionalCard {
  icon: string;
  text: string;
  bgClass: string;
}

interface TableSectionProps {
  badge: string;
  title: string;
  tableHeaders: string[];
  tableRows: TableRow[];
  additionalCards: AdditionalCard[];
}

const TableSection: React.FC<TableSectionProps> = ({
  badge,
  title,
  tableHeaders,
  tableRows,
  additionalCards,
}) => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <span className="badge bg-primary mb-3 px-3 py-2">{badge}</span>
              <h2 style={{ color: '#1D3458' }}>{title}</h2>
            </div>

            <div className="table-responsive mb-5">
              <table className="table table-bordered">
                <thead style={{ backgroundColor: '#1D3458', color: 'white' }}>
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="p-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'table-light' : ''}>
                      <td className="p-3">{row.component}</td>
                      <td className="p-3">{row.duration}</td>
                      <td className="p-3">{row.gain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row g-4 mb-4">
              {additionalCards.map((card, index) => (
                <div key={index} className="col-md-6">
                  <div className={`card border-0 ${card.bgClass} h-100`}>
                    <div className="card-body">
                      <p className="d-flex align-items-center mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2" style={{ color: '#1D3458' }}>
                          <path d={card.icon}></path>
                        </svg>
                        <span>{card.text}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSection;