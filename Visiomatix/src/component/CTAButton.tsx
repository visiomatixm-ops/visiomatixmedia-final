import { useNavigate } from "react-router-dom";

const CTAButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/contact')}
      style={{
        backgroundColor: "#fff",
        color: "#1D3458",
        border: "2px solid #1D3458",
        padding: "12px 26px",
        borderRadius: "8px",
        fontSize: "18px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      Schedule a call
    </button>
  );
};

export default CTAButton;
