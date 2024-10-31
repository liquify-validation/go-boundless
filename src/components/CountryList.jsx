import React from "react";

const CountryList = ({ countries: countryList, searchTerm }) => {
  if (!countryList || countryList.length === 0) {
    return <div>No countries available.</div>;
  }

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-[#b3ff4a]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <ul className="divide-y">
      {countryList.map((country) => (
        <li key={country.code} className="flex items-center space-x-4 py-4">
          {/* Display the flag */}
          {/* <img
            src={country.imageUrl}
            alt={`${country.fullName} flag`}
            className="w-6 h-4 object-contain flex-shrink-0" 
          /> */}
          {/* Display the country code with fixed width */}
          <span className="font-semibold w-16 flex-none">
            {country.code}
          </span>{" "}
          {/* Added w-16 and flex-none */}
          {/* Display the full country name with highlighted search terms */}
          <span className="text-xl flex-grow">
            {highlightText(country.fullName, searchTerm)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
