import "./ClientLogos.css";// Import all logos
import logo1 from "../assets/client_logos/Alice logo.png";
import logo2 from "../assets/client_logos/Ashirvad hotel logo.png";
import logo3 from "../assets/client_logos/Britannia logo.png";
import logo4 from "../assets/client_logos/Espotify logo.png";
import logo5 from "../assets/client_logos/Glam Amor logo.png";
import logo6 from "../assets/client_logos/IRA Buildcone logo.png";
import logo7 from "../assets/client_logos/Lena  logo.png";
import logo8 from "../assets/client_logos/Magsol.png";
import logo9 from "../assets/client_logos/Meta PCS logo.png";
import logo10 from "../assets/client_logos/Onyx logo.png";
import logo11 from "../assets/client_logos/Overhauls logo.png";
import logo12 from "../assets/client_logos/Pure Glwo logo.png";
import logo13 from "../assets/client_logos/Radisson Hotel logo.png";
import logo14 from "../assets/client_logos/Rombus logo.png";
import logo15 from "../assets/client_logos/Signature oil  logo.png";
import logo16 from "../assets/client_logos/Sika Apparel logo.png";
import logo17 from "../assets/client_logos/The Rockefeller  logo.png";const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8,
  logo9, logo10, logo11, logo12, logo13, logo14, logo15,
  logo16, logo17
];export default function ClientLogos() {
  return (
    <section className="client-section">
      <h2 className="client-heading">
        Our Clients – Trusted by 100+ Companies Worldwide
      </h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {logos.concat(logos).map((logo, index) => (
            <div key={index} className="logo-box">
              <img src={logo} alt={`Client Logo ${index + 1}`} className="logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}