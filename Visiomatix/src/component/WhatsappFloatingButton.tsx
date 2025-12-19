import React from "react";

const WhatsappFloatingButton: React.FC = () => {
  const whatsappURL =
    "https://wa.me/918999101916?text=Hello%20Visiomatix%20Media%2C%20I%20am%20interested.%20I%20would%20like%20to%20know%20more%20details%20about%20your%20services.%20";
   


  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "120px",
        right: "25px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.4 0 .33 5.07.33 11.71c0 2.06.54 4.08 1.57 5.87L0 24l6.59-1.88a11.68 11.68 0 0 0 5.45 1.39h.01c6.63 0 11.7-5.07 11.7-11.71 0-3.13-1.22-6.07-3.23-8.32zM12.05 21.3c-1.76 0-3.49-.47-5-1.36l-.36-.21-3.91 1.12 1.17-3.82-.24-.39a9.79 9.79 0 0 1-1.47-5.21c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.03 6.96 2.89a9.74 9.74 0 0 1 2.89 6.96c0 5.43-4.42 9.86-9.89 9.86zm5.43-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.41-1.47-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.2-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.27.47 1.7.6.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.28.17-1.42-.07-.13-.27-.22-.57-.37z" />
      </svg>
    </a>
  );
};

export default WhatsappFloatingButton;
