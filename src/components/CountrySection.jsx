import React from "react";
import CountryCard from "./CountryCard";
import { countryData } from "../data/constants";

const CountrySection = () => {
  return (
    <div
      className="esim-cards-container"
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {countryData.map((country, index) => (
        <CountryCard
          key={index}
          countryName={country.countryName}
          countryIcon={country.countryIcon}
          price={country.price}
          link={country.link}
        />
      ))}
    </div>
  );
};

export default CountrySection;
