import React, { useState } from "react";
import CountryCard from "./CountryCard";
import { countryData } from "../data/constants";
import SearchBar from "./SearchBar";
import CustomButton from "../ui/CustomButton";
import { WorldMapBg } from "../assets";

const CountrySection = () => {
  const [filteredCountries, setFilteredCountries] = useState(countryData);

  const handleSearch = (searchTerm) => {
    const filtered = countryData.filter((country) =>
      country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <section
      className="relative bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <h2 className="mx-auto justify-center text-center mb-6 max-w-3xl text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12 text-white">
          Get your data available in 198 countries worldwide
        </h2>
        <div className="mb-20">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search Countries..."
          />
        </div>
        <div
          className="esim-cards-container mt-8"
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <CountryCard
                key={index}
                countryName={country.countryName}
                countryIcon={country.countryIcon}
                price={country.price}
                link={country.link}
              />
            ))
          ) : (
            <p className="text-white">No countries found</p>
          )}
        </div>
        {/* Centering the Button */}
        <div className="mt-16 flex justify-center">
          <CustomButton text="View all destinations" />
        </div>
      </div>
    </section>
  );
};

export default CountrySection;
