import React from "react";

// ✅ Full Country Code List (you can extend it further if needed)
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+86", name: "China" },
  { code: "+7", name: "Russia" },
  { code: "+55", name: "Brazil" },
  { code: "+34", name: "Spain" },
  { code: "+64", name: "New Zealand" },
  { code: "+27", name: "South Africa" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+82", name: "South Korea" },
  { code: "+65", name: "Singapore" },
  { code: "+60", name: "Malaysia" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+92", name: "Pakistan" },
  { code: "+62", name: "Indonesia" },
  { code: "+66", name: "Thailand" },
  { code: "+90", name: "Turkey" },
  { code: "+234", name: "Nigeria" },
  { code: "+254", name: "Kenya" },
  { code: "+351", name: "Portugal" },
  { code: "+31", name: "Netherlands" },
  { code: "+46", name: "Sweden" },
  { code: "+41", name: "Switzerland" },
  { code: "+32", name: "Belgium" },
];

const CountryCodeSelect: React.FC = () => {
  return (
    <select className="form-select">
      <option value="">-- Select Country Code --</option>
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.code} {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelect;
