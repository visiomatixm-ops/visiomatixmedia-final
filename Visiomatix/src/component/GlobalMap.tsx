import "../styles/GlobalMap.css"; // optional CSS file

export default function GlobalMap() {
  const pins = [
    { left: "70%", top: "60%", label: "India" },
    { left: "20%", top: "40%", label: "USA" },
    { left: "45%", top: "35%", label: "UK" },
    { left: "65%", top: "55%", label: "UAE" },
  ];

  return (
    <div className="map-container">
      <img src="/images/world-map.jpg" alt="World map" className="map-image" />
      {pins.map((p, i) => (
        <div key={i} className="pin" title={p.label} style={{ left: p.left, top: p.top }} />
      ))}
    </div>
  );
}
